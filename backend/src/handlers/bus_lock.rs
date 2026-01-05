use crate::handlers::auth::Claims;
use axum::{extract::State, http::StatusCode, Extension, Json};
use serde::Serialize;
use sqlx::PgPool;
use uuid::Uuid;

#[derive(Serialize)]
pub struct BusLockBalance {
    pub user_id: String,
    pub locked_amount: f64,
    pub required_amount: f64,
    pub deficit: f64,
    pub last_calculated_at: String,
}

pub async fn get_bus_lock_balance(
    State(pool): State<PgPool>,
    Extension(claims): Extension<Claims>,
) -> Result<Json<BusLockBalance>, StatusCode> {
    let user_id = Uuid::parse_str(&claims.sub).map_err(|_| StatusCode::UNAUTHORIZED)?;

    let lock = sqlx::query!(
        r#"
        SELECT locked_amount, required_amount, last_calculated_at FROM bus_locks WHERE user_id = $1
        "#,
        user_id
    )
    .fetch_optional(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    if let Some(lock_data) = lock {
        let locked = lock_data
            .locked_amount
            .to_string()
            .parse::<f64>()
            .unwrap_or(0.0);
        let required = lock_data
            .required_amount
            .to_string()
            .parse::<f64>()
            .unwrap_or(0.0);
        let deficit = (required - locked).max(0.0);

        Ok(Json(BusLockBalance {
            user_id: user_id.to_string(),
            locked_amount: locked,
            required_amount: required,
            deficit,
            last_calculated_at: lock_data.last_calculated_at.unwrap().to_string(),
        }))
    } else {
        Ok(Json(BusLockBalance {
            user_id: user_id.to_string(),
            locked_amount: 0.0,
            required_amount: 0.0,
            deficit: 0.0,
            last_calculated_at: chrono::Utc::now().to_string(),
        }))
    }
}
