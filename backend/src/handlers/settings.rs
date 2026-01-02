use crate::handlers::auth::Claims;
use axum::{http::StatusCode, Extension, Json};
use serde::{Deserialize, Serialize};

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
    Extension(_claims): Extension<Claims>,
) -> Result<Json<UserSettings>, StatusCode> {
    Ok(Json(UserSettings {
        company_name: "Acme Corp Inc.".to_string(),
        email: "finance@acmecorp.com".to_string(),
        website: "https://acmecorp.com".to_string(),
        registration_number: "US-DE-882910".to_string(),
        kyc_status: "Level 3 - Verified".to_string(),
    }))
}

pub async fn update_settings(
    Extension(_claims): Extension<Claims>,
    Json(payload): Json<UpdateSettingsRequest>,
) -> Result<Json<UpdateSettingsResponse>, StatusCode> {
    Ok(Json(UpdateSettingsResponse {
        message: "Settings updated successfully".to_string(),
        updated_fields: vec![
            "company_name".to_string(),
            "email".to_string(),
            "website".to_string(),
        ],
    }))
}
