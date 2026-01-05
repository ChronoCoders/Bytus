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
    pub bus_lock_required: f64,
}

async fn calculate_and_update_bus_lock(
    pool: &PgPool,
    user_id: Uuid,
    payment_amount: f64,
) -> Result<f64, StatusCode> {
    let lock_amount = payment_amount * 0.01;

    let existing = sqlx::query!(
        r#"SELECT locked_amount FROM bus_locks WHERE user_id = $1"#,
        user_id
    )
    .fetch_optional(pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    if let Some(lock) = existing {
        let current_locked = lock.locked_amount.to_string().parse::<f64>().unwrap_or(0.0);
        let new_locked = current_locked + lock_amount;
        let new_locked_decimal =
            BigDecimal::from_f64(new_locked).ok_or(StatusCode::INTERNAL_SERVER_ERROR)?;

        sqlx::query!(
            r#"
            UPDATE bus_locks 
            SET locked_amount = $1, required_amount = $1, last_calculated_at = NOW(), updated_at = NOW()
            WHERE user_id = $2
            "#,
            new_locked_decimal,
            user_id
        )
        .execute(pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    } else {
        let lock_decimal =
            BigDecimal::from_f64(lock_amount).ok_or(StatusCode::INTERNAL_SERVER_ERROR)?;

        sqlx::query!(
            r#"
            INSERT INTO bus_locks (id, user_id, locked_amount, required_amount, last_calculated_at, created_at, updated_at)
            VALUES ($1, $2, $3, $3, NOW(), NOW(), NOW())
            "#,
            Uuid::new_v4(),
            user_id,
            lock_decimal
        )
        .execute(pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    }

    Ok(lock_amount)
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

    let user_id = Uuid::nil();
    let bus_lock = calculate_and_update_bus_lock(&pool, user_id, payload.amount).await?;

    Ok(Json(PaymentResponse {
        id: result.id,
        amount: payload.amount,
        currency: result.currency,
        status: result.status,
        customer_email: result.customer_email.unwrap_or_default(),
        created_at: result.created_at.unwrap().to_string(),
        bus_lock_required: bus_lock,
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
        bus_lock_required: amount * 0.01,
    }))
}
