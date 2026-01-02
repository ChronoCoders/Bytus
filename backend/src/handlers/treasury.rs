use crate::handlers::auth::Claims;
use axum::{http::StatusCode, Extension, Json};
use serde::Serialize;

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
    Extension(_claims): Extension<Claims>,
) -> Result<Json<Vec<TreasuryPosition>>, StatusCode> {
    let positions = vec![
        TreasuryPosition {
            name: "USDC Treasury".to_string(),
            protocol: "Compound V3".to_string(),
            balance: "250,000".to_string(),
            value: 250000.00,
            apy: "4.8%".to_string(),
        },
        TreasuryPosition {
            name: "Ethereum Liquidity".to_string(),
            protocol: "Uniswap V3".to_string(),
            balance: "45.2 ETH".to_string(),
            value: 125400.00,
            apy: "12.5%".to_string(),
        },
    ];

    Ok(Json(positions))
}

pub async fn get_portfolio(
    Extension(_claims): Extension<Claims>,
) -> Result<Json<TreasuryPortfolio>, StatusCode> {
    let positions = vec![
        TreasuryPosition {
            name: "USDC Treasury".to_string(),
            protocol: "Compound V3".to_string(),
            balance: "250,000".to_string(),
            value: 250000.00,
            apy: "4.8%".to_string(),
        },
        TreasuryPosition {
            name: "Ethereum Liquidity".to_string(),
            protocol: "Uniswap V3".to_string(),
            balance: "45.2 ETH".to_string(),
            value: 125400.00,
            apy: "12.5%".to_string(),
        },
    ];

    let total_value: f64 = positions.iter().map(|p| p.value).sum();

    Ok(Json(TreasuryPortfolio {
        total_value,
        assets: positions,
    }))
}
