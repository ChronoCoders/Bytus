use crate::handlers::auth::Claims;
use axum::{extract::State, http::StatusCode, Extension, Json};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(Serialize)]
pub struct UserSettings {
    pub company_name: String,
    pub email: String,
    pub website: String,
    pub registration_number: String,
    pub kyc_status: String,
}

#[derive(Deserialize)]
pub struct UpdateSettingsRequest {
    pub company_name: String,
    pub email: String,
    pub website: String,
}

#[derive(Serialize)]
pub struct UpdateSettingsResponse {
    pub message: String,
    pub updated_fields: Vec<String>,
}

pub async fn get_settings(
    State(pool): State<PgPool>,
    Extension(claims): Extension<Claims>,
) -> Result<Json<UserSettings>, StatusCode> {
    let user_id = Uuid::parse_str(&claims.sub).map_err(|_| StatusCode::UNAUTHORIZED)?;

    let user = sqlx::query!(
        r#"
        SELECT email, company_name, website, registration_number, kyc_status
        FROM users
        WHERE id = $1
        "#,
        user_id
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(UserSettings {
        company_name: user.company_name.unwrap_or_default(),
        email: user.email,
        website: user.website.unwrap_or_default(),
        registration_number: user.registration_number.unwrap_or_default(),
        kyc_status: user.kyc_status.unwrap_or_else(|| "pending".to_string()),
    }))
}

pub async fn update_settings(
    State(pool): State<PgPool>,
    Extension(claims): Extension<Claims>,
    Json(payload): Json<UpdateSettingsRequest>,
) -> Result<Json<UpdateSettingsResponse>, StatusCode> {
    let user_id = Uuid::parse_str(&claims.sub).map_err(|_| StatusCode::UNAUTHORIZED)?;

    sqlx::query!(
        r#"
        UPDATE users
        SET company_name = $1, email = $2, website = $3, updated_at = NOW()
        WHERE id = $4
        "#,
        payload.company_name,
        payload.email,
        payload.website,
        user_id
    )
    .execute(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(UpdateSettingsResponse {
        message: "Settings updated successfully".to_string(),
        updated_fields: vec![
            "company_name".to_string(),
            "email".to_string(),
            "website".to_string(),
        ],
    }))
}
