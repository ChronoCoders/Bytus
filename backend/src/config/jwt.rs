use std::env;

pub struct JwtConfig {
    pub secret: String,
    pub expiration_hours: i64,
}

impl JwtConfig {
    pub fn from_env() -> Self {
        Self {
            secret: env::var("JWT_SECRET")
                .unwrap_or_else(|_| "dev_secret_key_change_in_production".to_string()),
            expiration_hours: 24,
        }
    }
}
