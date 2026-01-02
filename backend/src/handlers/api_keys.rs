use crate::handlers::auth::Claims;
use axum::{extract::Path, http::StatusCode, Extension, Json};
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct ApiKey {
    pub id: String,
    pub name: String,
    pub prefix: String,
    pub created_at: String,
    pub last_used: String,
    pub permissions: Vec<String>,
    pub status: String,
}

#[derive(Deserialize)]
pub struct CreateApiKeyRequest {
    pub name: String,
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

pub async fn list_keys(
    Extension(_claims): Extension<Claims>,
) -> Result<Json<Vec<ApiKey>>, StatusCode> {
    let keys = vec![
        ApiKey {
            id: "key_1".to_string(),
            name: "Production Server".to_string(),
            prefix: "pk_live_".to_string(),
            created_at: "Oct 12, 2024".to_string(),
            last_used: "Just now".to_string(),
            permissions: vec![
                "read".to_string(),
                "write".to_string(),
                "payments".to_string(),
            ],
            status: "active".to_string(),
        },
        ApiKey {
            id: "key_2".to_string(),
            name: "Staging Environment".to_string(),
            prefix: "pk_test_".to_string(),
            created_at: "Sep 28, 2024".to_string(),
            last_used: "2 hours ago".to_string(),
            permissions: vec!["read".to_string(), "write".to_string()],
            status: "active".to_string(),
        },
    ];

    Ok(Json(keys))
}

pub async fn create_key(
    Extension(_claims): Extension<Claims>,
    Json(payload): Json<CreateApiKeyRequest>,
) -> Result<Json<CreateApiKeyResponse>, StatusCode> {
    Ok(Json(CreateApiKeyResponse {
        id: "key_new".to_string(),
        secret_key: "sk_live_1234567890abcdef".to_string(),
        name: payload.name,
        created_at: "Just now".to_string(),
    }))
}

pub async fn delete_key(
    Extension(_claims): Extension<Claims>,
    Path(id): Path<String>,
) -> Result<Json<DeleteApiKeyResponse>, StatusCode> {
    Ok(Json(DeleteApiKeyResponse {
        message: format!("API key {} deleted successfully", id),
    }))
}
