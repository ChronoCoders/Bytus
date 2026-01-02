use crate::handlers::auth::Claims;
use axum::{http::StatusCode, Extension, Json};
use serde::Serialize;

#[derive(Serialize)]
pub struct DashboardOverview {
    pub monthly_volume: f64,
    pub transaction_count: i32,
    pub pending_settlement: f64,
    pub bus_locked: f64,
    pub bus_required: f64,
}

pub async fn get_overview(
    Extension(claims): Extension<Claims>,
) -> Result<Json<DashboardOverview>, StatusCode> {
    // Mock data - gerçek implementasyon database'den gelecek
    let overview = DashboardOverview {
        monthly_volume: 1245000.00,
        transaction_count: 1452,
        pending_settlement: 45230.50,
        bus_locked: 15000.0,
        bus_required: 12500.0,
    };

    Ok(Json(overview))
}
