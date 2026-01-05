use crate::handlers::auth::Claims;
use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    Extension, Json,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use uuid::Uuid;

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
    pub amount: String,
    pub currency: String,
    pub status: String,
    pub created_at: String,
    pub customer_email: Option<String>,
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
    pub amount: String,
    pub currency: String,
    pub status: String,
    pub created_at: String,
    pub customer_email: Option<String>,
    pub metadata: Option<serde_json::Value>,
}

pub async fn list_transactions(
    State(pool): State<PgPool>,
    Extension(claims): Extension<Claims>,
    Query(params): Query<TransactionQuery>,
) -> Result<Json<TransactionListResponse>, StatusCode> {
    let user_id = Uuid::parse_str(&claims.sub).map_err(|_| StatusCode::UNAUTHORIZED)?;
    
    let page = params.page.unwrap_or(1).max(1);
    let limit = params.limit.unwrap_or(10).clamp(1, 100);
    let offset = (page - 1) * limit;

    // Build search pattern (wraps with % for ILIKE)
    let search_pattern = params.search.as_ref().map(|s| format!("%{}%", s));
    
    // Status whitelist (prevent invalid status injection)
    let status_filter = params.filter.as_ref().and_then(|f| {
        match f.as_str() {
            "pending" | "settled" | "failed" => Some(f.as_str()),
            _ => None
        }
    });

    // Query based on filter combinations (all use bind parameters)
    type RowType = (Uuid, String, bigdecimal::BigDecimal, String, String, Option<String>, chrono::NaiveDateTime);
    
    let rows: Vec<RowType> = match (search_pattern.as_ref(), status_filter) {
        (Some(pattern), Some(status)) => {
            sqlx::query_as(
                "SELECT id, tx_type, amount, currency, status, customer_email, created_at 
                 FROM transactions 
                 WHERE user_id = $1 
                   AND (customer_email ILIKE $2 OR status ILIKE $2)
                   AND status = $3
                 ORDER BY created_at DESC 
                 LIMIT $4 OFFSET $5"
            )
            .bind(user_id)
            .bind(pattern)
            .bind(status)
            .bind(limit)
            .bind(offset)
            .fetch_all(&pool)
            .await
        },
        (Some(pattern), None) => {
            sqlx::query_as(
                "SELECT id, tx_type, amount, currency, status, customer_email, created_at 
                 FROM transactions 
                 WHERE user_id = $1 
                   AND (customer_email ILIKE $2 OR status ILIKE $2)
                 ORDER BY created_at DESC 
                 LIMIT $3 OFFSET $4"
            )
            .bind(user_id)
            .bind(pattern)
            .bind(limit)
            .bind(offset)
            .fetch_all(&pool)
            .await
        },
        (None, Some(status)) => {
            sqlx::query_as(
                "SELECT id, tx_type, amount, currency, status, customer_email, created_at 
                 FROM transactions 
                 WHERE user_id = $1 
                   AND status = $2
                 ORDER BY created_at DESC 
                 LIMIT $3 OFFSET $4"
            )
            .bind(user_id)
            .bind(status)
            .bind(limit)
            .bind(offset)
            .fetch_all(&pool)
            .await
        },
        (None, None) => {
            sqlx::query_as(
                "SELECT id, tx_type, amount, currency, status, customer_email, created_at 
                 FROM transactions 
                 WHERE user_id = $1 
                 ORDER BY created_at DESC 
                 LIMIT $2 OFFSET $3"
            )
            .bind(user_id)
            .bind(limit)
            .bind(offset)
            .fetch_all(&pool)
            .await
        }
    }
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let transactions: Vec<Transaction> = rows
        .into_iter()
        .map(|(id, tx_type, amount, currency, status, customer_email, created_at)| Transaction {
            id: id.to_string(),
            tx_type,
            amount: amount.to_string(),
            currency,
            status,
            created_at: created_at.to_string(),
            customer_email,
        })
        .collect();

    // Count total (also filtered by user_id)
    let total: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM transactions WHERE user_id = $1"
    )
    .bind(user_id)
    .fetch_one(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(TransactionListResponse {
        transactions,
        total: total as i32,
        page,
    }))
}

pub async fn get_transaction(
    State(pool): State<PgPool>,
    Extension(claims): Extension<Claims>,
    Path(id): Path<Uuid>,
) -> Result<Json<TransactionDetail>, StatusCode> {
    let user_id = Uuid::parse_str(&claims.sub).map_err(|_| StatusCode::UNAUTHORIZED)?;

    let result = sqlx::query!(
        r#"
        SELECT id, tx_type, amount, currency, status, customer_email, metadata, created_at
        FROM transactions
        WHERE id = $1 AND user_id = $2
        "#,
        id,
        user_id
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| StatusCode::NOT_FOUND)?;

    Ok(Json(TransactionDetail {
        id: result.id.to_string(),
        tx_type: result.tx_type,
        amount: result.amount.to_string(),
        currency: result.currency,
        status: result.status,
        created_at: result.created_at.unwrap().to_string(),
        customer_email: result.customer_email,
        metadata: result.metadata,
    }))
}