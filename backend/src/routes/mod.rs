use crate::handlers;
use crate::middleware as mw;
use axum::{
    middleware,
    routing::{delete, get, post, put},
    Router,
};
use sqlx::PgPool;

async fn health_check() -> &'static str {
    "OK"
}

pub fn create_router(pool: PgPool) -> Router {
    let rate_limiter = mw::rate_limit::RateLimiter::new(100, 60);

    let protected_routes = Router::new()
        .route(
            "/api/dashboard/overview",
            get(handlers::dashboard::get_dashboard_overview),
        )
        .route(
            "/api/transactions",
            get(handlers::transactions::list_transactions),
        )
        .route(
            "/api/transactions/:id",
            get(handlers::transactions::get_transaction),
        )
        .route(
            "/api/treasury/positions",
            get(handlers::treasury::get_positions),
        )
        .route(
            "/api/treasury/portfolio",
            get(handlers::treasury::get_portfolio),
        )
        .route("/api/keys", get(handlers::api_keys::list_keys))
        .route("/api/keys", post(handlers::api_keys::create_key))
        .route("/api/keys/:id", delete(handlers::api_keys::delete_key))
        .route("/api/user/settings", get(handlers::settings::get_settings))
        .route(
            "/api/user/settings",
            put(handlers::settings::update_settings),
        )
        .route("/api/payments", post(handlers::payments::create_payment))
        .route("/api/payments/:id", get(handlers::payments::get_payment))
        .route("/api/bus-lock/balance", get(handlers::bus_lock::get_bus_lock_balance))
        .route_layer(middleware::from_fn_with_state(
            pool.clone(),
            mw::auth::auth_middleware,
        ))
        .layer(middleware::from_fn_with_state(
            rate_limiter.clone(),
            mw::rate_limit::rate_limit_middleware,
        ));

    Router::new()
        .route("/health", get(health_check))
        .route("/api/auth/signup", post(handlers::auth::signup))
        .route("/api/auth/login", post(handlers::auth::login))
        .merge(protected_routes)
        .layer(mw::cors())
        .with_state(pool)
}