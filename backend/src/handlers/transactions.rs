use crate::handlers::auth::Claims;
use axum::{
    extract::{Path, Query},
    http::StatusCode,
    Extension, Json,
};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct TransactionQuery {
    pub search: Option<String>,
    pub filter: Option<String>,
    pub page: Option<i32>,
    pub limit: Option<i32>,
}

#[derive(Serialize)]
pub struct Transaction {
    pub id: String,
    pub tx_type: String,
    pub method: String,
    pub amount: String,
    pub status: String,
    pub date: String,
    pub fee: String,
}

#[derive(Serialize)]
pub struct TransactionListResponse {
    pub transactions: Vec<Transaction>,
    pub total: i32,
    pub page: i32,
}

#[derive(Serialize)]
pub struct TransactionDetail {
    pub id: String,
    pub tx_type: String,
    pub method: String,
    pub amount: String,
    pub status: String,
    pub date: String,
    pub fee: String,
    pub details: String,
}

pub async fn list_transactions(
    Extension(_claims): Extension<Claims>,
    Query(_params): Query<TransactionQuery>,
) -> Result<Json<TransactionListResponse>, StatusCode> {
    let transactions = vec![
        Transaction {
            id: "TX-1001".to_string(),
            tx_type: "Gateway Payment".to_string(),
            method: "Customer Transfer".to_string(),
            amount: "+$2,000.00".to_string(),
            status: "Settled".to_string(),
            date: "Oct 24, 2024".to_string(),
            fee: "12.5 BUS".to_string(),
        },
        Transaction {
            id: "TX-1002".to_string(),
            tx_type: "API Charge".to_string(),
            method: "Credit Card".to_string(),
            amount: "+$145.50".to_string(),
            status: "Settled".to_string(),
            date: "Oct 24, 2024".to_string(),
            fee: "1.2 BUS".to_string(),
        },
    ];

    Ok(Json(TransactionListResponse {
        transactions,
        total: 2,
        page: 1,
    }))
}

pub async fn get_transaction(
    Extension(_claims): Extension<Claims>,
    Path(id): Path<String>,
) -> Result<Json<TransactionDetail>, StatusCode> {
    Ok(Json(TransactionDetail {
        id: id.clone(),
        tx_type: "Gateway Payment".to_string(),
        method: "Customer Transfer".to_string(),
        amount: "+$2,000.00".to_string(),
        status: "Settled".to_string(),
        date: "Oct 24, 2024".to_string(),
        fee: "12.5 BUS".to_string(),
        details: "Transaction completed successfully".to_string(),
    }))
}
