use crate::handlers::auth::Claims;
use axum::{extract::State, http::StatusCode, Extension, Json};
use serde::Serialize;
use sqlx::PgPool;
use uuid::Uuid;

#[derive(Serialize)]
pub struct TreasuryPosition {
    pub name: String,
    pub protocol: String,
    pub balance: String,
    pub value: f64,
    pub apy: String,
}

#[derive(Serialize)]
pub struct TreasuryPortfolio {
    pub total_value: f64,
    pub assets: Vec<TreasuryPosition>,
}

pub async fn get_positions(
    State(pool): State<PgPool>,
    Extension(claims): Extension<Claims>,
) -> Result<Json<Vec<TreasuryPosition>>, StatusCode> {
    let user_id = Uuid::parse_str(&claims.sub).map_err(|_| StatusCode::UNAUTHORIZED)?;

    let rows = sqlx::query!(
        r#"
        SELECT asset, protocol, balance, apy, usd_value
        FROM treasury_positions
        WHERE user_id = $1
        ORDER BY usd_value DESC NULLS LAST
        "#,
        user_id
    )
    .fetch_all(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let positions: Vec<TreasuryPosition> = rows
        .into_iter()
        .map(|row| TreasuryPosition {
            name: row.asset.clone(),
            protocol: row.protocol.unwrap_or_else(|| "Unknown".to_string()),
            balance: row.balance.to_string(),
            value: row
                .usd_value
                .map(|v| v.to_string().parse::<f64>().unwrap_or(0.0))
                .unwrap_or(0.0),
            apy: row
                .apy
                .map(|a| format!("{}%", a))
                .unwrap_or_else(|| "0.0%".to_string()),
        })
        .collect();

    Ok(Json(positions))
}

pub async fn get_portfolio(
    State(pool): State<PgPool>,
    Extension(claims): Extension<Claims>,
) -> Result<Json<TreasuryPortfolio>, StatusCode> {
    let user_id = Uuid::parse_str(&claims.sub).map_err(|_| StatusCode::UNAUTHORIZED)?;

    let rows = sqlx::query!(
        r#"
        SELECT asset, protocol, balance, apy, usd_value
        FROM treasury_positions
        WHERE user_id = $1
        ORDER BY usd_value DESC NULLS LAST
        "#,
        user_id
    )
    .fetch_all(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let assets: Vec<TreasuryPosition> = rows
        .iter()
        .map(|row| TreasuryPosition {
            name: row.asset.clone(),
            protocol: row
                .protocol
                .clone()
                .unwrap_or_else(|| "Unknown".to_string()),
            balance: row.balance.to_string(),
            value: row
                .usd_value
                .as_ref()
                .map(|v| v.to_string().parse::<f64>().unwrap_or(0.0))
                .unwrap_or(0.0),
            apy: row
                .apy
                .as_ref()
                .map(|a| format!("{}%", a))
                .unwrap_or_else(|| "0.0%".to_string()),
        })
        .collect();

    let total_value: f64 = rows
        .iter()
        .map(|row| {
            row.usd_value
                .as_ref()
                .map(|v| v.to_string().parse::<f64>().unwrap_or(0.0))
                .unwrap_or(0.0)
        })
        .sum();

    Ok(Json(TreasuryPortfolio {
        total_value,
        assets,
    }))
}
