use crate::handlers::auth::Claims;
use axum::{
    extract::{Path, State},
    http::StatusCode,
    Extension, Json,
};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(Serialize)]
pub struct ApiKey {
    pub id: String,
    pub name: String,
    pub key_prefix: String,
    pub created_at: String,
    pub last_used: Option<String>,
    pub permissions: Vec<String>,
    pub revoked: bool,
}

#[derive(Deserialize)]
pub struct CreateApiKeyRequest {
    pub name: String,
    pub permissions: Option<Vec<String>>,
}

#[derive(Serialize)]
pub struct CreateApiKeyResponse {
    pub id: String,
    pub secret_key: String,
    pub name: String,
    pub created_at: String,
}

#[derive(Serialize)]
pub struct DeleteApiKeyResponse {
    pub message: String,
}

fn generate_api_key() -> (String, String) {
    let random_part: String = (0..32)
        .map(|_| format!("{:x}", rand::random::<u8>()))
        .collect();
    let key = format!("sk_live_{}", random_part);

    let mut hasher = Sha256::new();
    hasher.update(&key);
    let hash = format!("{:x}", hasher.finalize());

    (key, hash)
}

pub async fn list_keys(
    State(pool): State<PgPool>,
    Extension(claims): Extension<Claims>,
) -> Result<Json<Vec<ApiKey>>, StatusCode> {
    let user_id = Uuid::parse_str(&claims.sub).map_err(|_| StatusCode::UNAUTHORIZED)?;

    let rows = sqlx::query!(
        r#"
        SELECT id, name, key_hash, permissions, last_used_at, created_at, revoked_at
        FROM api_keys
        WHERE user_id = $1 AND revoked_at IS NULL
        ORDER BY created_at DESC
        "#,
        user_id
    )
    .fetch_all(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let keys: Vec<ApiKey> = rows
        .into_iter()
        .map(|row| {
            let key_prefix = row.key_hash.chars().take(12).collect::<String>();
            ApiKey {
                id: row.id.to_string(),
                name: row.name,
                key_prefix: format!("sk_live_{}...", key_prefix),
                created_at: row.created_at.unwrap().to_string(),
                last_used: row.last_used_at.map(|t| t.to_string()),
                permissions: row.permissions.unwrap_or_default(),
                revoked: row.revoked_at.is_some(),
            }
        })
        .collect();

    Ok(Json(keys))
}

pub async fn create_key(
    State(pool): State<PgPool>,
    Extension(claims): Extension<Claims>,
    Json(payload): Json<CreateApiKeyRequest>,
) -> Result<Json<CreateApiKeyResponse>, StatusCode> {
    let user_id = Uuid::parse_str(&claims.sub).map_err(|_| StatusCode::UNAUTHORIZED)?;
    let (secret_key, key_hash) = generate_api_key();
    let id = Uuid::new_v4();
    let permissions = payload
        .permissions
        .unwrap_or_else(|| vec!["read".to_string()]);

    sqlx::query!(
        r#"
        INSERT INTO api_keys (id, user_id, key_hash, name, permissions, created_at)
        VALUES ($1, $2, $3, $4, $5, NOW())
        "#,
        id,
        user_id,
        key_hash,
        payload.name,
        &permissions
    )
    .execute(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(CreateApiKeyResponse {
        id: id.to_string(),
        secret_key,
        name: payload.name,
        created_at: chrono::Utc::now().to_string(),
    }))
}

pub async fn delete_key(
    State(pool): State<PgPool>,
    Extension(claims): Extension<Claims>,
    Path(key_id): Path<Uuid>,
) -> Result<Json<DeleteApiKeyResponse>, StatusCode> {
    let user_id = Uuid::parse_str(&claims.sub).map_err(|_| StatusCode::UNAUTHORIZED)?;

    let result = sqlx::query!(
        r#"
        UPDATE api_keys
        SET revoked_at = NOW()
        WHERE id = $1 AND user_id = $2
        "#,
        key_id,
        user_id
    )
    .execute(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    if result.rows_affected() == 0 {
        return Err(StatusCode::NOT_FOUND);
    }

    Ok(Json(DeleteApiKeyResponse {
        message: format!("API key {} revoked successfully", key_id),
    }))
}

pub async fn validate_api_key(pool: &PgPool, api_key: &str) -> Result<Uuid, StatusCode> {
    let mut hasher = Sha256::new();
    hasher.update(api_key);
    let key_hash = format!("{:x}", hasher.finalize());

    let result = sqlx::query!(
        r#"
        SELECT user_id FROM api_keys
        WHERE key_hash = $1 AND revoked_at IS NULL
        "#,
        key_hash
    )
    .fetch_one(pool)
    .await
    .map_err(|_| StatusCode::UNAUTHORIZED)?;

    sqlx::query!(
        r#"
        UPDATE api_keys SET last_used_at = NOW() WHERE key_hash = $1
        "#,
        key_hash
    )
    .execute(pool)
    .await
    .ok();

    Ok(result.user_id.ok_or(StatusCode::UNAUTHORIZED)?)
}
