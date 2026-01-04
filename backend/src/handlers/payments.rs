use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use bigdecimal::{BigDecimal, FromPrimitive};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(Debug, Deserialize)]
pub struct CreatePaymentRequest {
    pub amount: f64,
    pub currency: String,
    pub customer_email: String,
    pub metadata: Option<serde_json::Value>,
}

#[derive(Debug, Serialize)]
pub struct PaymentResponse {
    pub id: Uuid,
    pub amount: f64,
    pub currency: String,
    pub status: String,
    pub customer_email: String,
    pub created_at: String,
}

pub async fn create_payment(
    State(pool): State<PgPool>,
    Json(payload): Json<CreatePaymentRequest>,
) -> Result<Json<PaymentResponse>, StatusCode> {
    let id = Uuid::new_v4();
    let amount_decimal = BigDecimal::from_f64(payload.amount).ok_or(StatusCode::BAD_REQUEST)?;

    let result = sqlx::query!(
        r#"
        INSERT INTO transactions (id, user_id, tx_type, amount, currency, status, customer_email, metadata, created_at)
        VALUES ($1, NULL, 'payment', $2, $3, 'pending', $4, $5, NOW())
        RETURNING id, amount, currency, status, customer_email, created_at
        "#,
        id,
        amount_decimal,
        payload.currency,
        payload.customer_email,
        payload.metadata
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(PaymentResponse {
        id: result.id,
        amount: payload.amount,
        currency: result.currency,
        status: result.status,
        customer_email: result.customer_email.unwrap_or_default(),
        created_at: result.created_at.unwrap().to_string(),
    }))
}

pub async fn get_payment(
    State(pool): State<PgPool>,
    Path(payment_id): Path<Uuid>,
) -> Result<Json<PaymentResponse>, StatusCode> {
    let result = sqlx::query!(
        r#"
        SELECT id, amount, currency, status, customer_email, created_at
        FROM transactions
        WHERE id = $1
        "#,
        payment_id
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| StatusCode::NOT_FOUND)?;

    let amount: f64 = result.amount.to_string().parse().unwrap_or(0.0);

    Ok(Json(PaymentResponse {
        id: result.id,
        amount,
        currency: result.currency,
        status: result.status,
        customer_email: result.customer_email.unwrap_or_default(),
        created_at: result.created_at.unwrap().to_string(),
    }))
}