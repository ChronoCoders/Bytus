use crate::handlers::auth::Claims;
use axum::{extract::State, Extension, Json};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

#[derive(Serialize, Deserialize)]
pub struct DashboardOverview {
    pub monthly_volume: f64,
    pub transaction_count: i64,
    pub pending_settlement: f64,
    pub bus_locked: f64,
    pub bus_required: f64,
}

pub async fn get_dashboard_overview(
    State(pool): State<PgPool>,
    Extension(claims): Extension<Claims>,
) -> Result<Json<DashboardOverview>, (axum::http::StatusCode, String)> {
    let user_id = uuid::Uuid::parse_str(&claims.sub)
        .map_err(|e| (axum::http::StatusCode::BAD_REQUEST, e.to_string()))?;

    // Calculate monthly volume (current month, settled transactions)
    let monthly_volume: Option<f64> = sqlx::query_scalar(
        "SELECT CAST(COALESCE(SUM(amount), 0) AS DOUBLE PRECISION)
         FROM transactions 
         WHERE user_id = $1 
         AND status = 'settled' 
         AND created_at >= date_trunc('month', CURRENT_DATE)",
    )
    .bind(user_id)
    .fetch_one(&pool)
    .await
    .map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Count transactions this month
    let transaction_count: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) 
         FROM transactions 
         WHERE user_id = $1 
         AND created_at >= date_trunc('month', CURRENT_DATE)",
    )
    .bind(user_id)
    .fetch_one(&pool)
    .await
    .map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Calculate pending settlement
    let pending_settlement: Option<f64> = sqlx::query_scalar(
        "SELECT CAST(COALESCE(SUM(amount), 0) AS DOUBLE PRECISION)
         FROM transactions 
         WHERE user_id = $1 
         AND status = 'pending'",
    )
    .bind(user_id)
    .fetch_one(&pool)
    .await
    .map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Get BUS lock amounts
    let bus_lock: Option<(f64, f64)> = sqlx::query_as(
        "SELECT CAST(locked_amount AS DOUBLE PRECISION), CAST(required_amount AS DOUBLE PRECISION)
         FROM bus_locks 
         WHERE user_id = $1",
    )
    .bind(user_id)
    .fetch_optional(&pool)
    .await
    .map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let (bus_locked, bus_required) = bus_lock.unwrap_or((0.0, 0.0));

    Ok(Json(DashboardOverview {
        monthly_volume: monthly_volume.unwrap_or(0.0),
        transaction_count,
        pending_settlement: pending_settlement.unwrap_or(0.0),
        bus_locked,
        bus_required,
    }))
}
