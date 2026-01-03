use dotenvy::dotenv;
use sqlx::postgres::PgPoolOptions;
use std::net::SocketAddr;

mod config;
mod db;
mod handlers;
mod middleware;
mod models;
mod routes;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load local .env (ignored in deploy)
    dotenv().ok();

    // Initialize logging
    tracing_subscriber::fmt::init();

    // Get DATABASE_URL from env (Railway Variables or local .env)
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // Create database connection pool
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await?;

    // Build Axum app with routes
    let app = routes::create_router(pool);

    // Get PORT from env (Railway injects it) or fallback to 8080 for local
    let port: u16 = std::env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse()
        .expect("PORT must be a number");

    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    println!("Server running on http://{}", addr);

    // Start server
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;

    Ok(())
}
