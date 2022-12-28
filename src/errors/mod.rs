use axum::{response::IntoResponse, Json};
use bb8::RunError;
use http::StatusCode;
use redis::RedisError;
use serde_json::json;

#[derive(Debug)]
pub enum AppError {
    Redis(RedisError),
    Postgres(tokio_postgres::Error),
    SerdeJson(serde_json::Error),
    RunError(RunError<tokio_postgres::Error>),
    Custom(String),
}

impl From<RunError<tokio_postgres::Error>> for AppError {
    fn from(inner: RunError<tokio_postgres::Error>) -> Self {
        AppError::RunError(inner)
    }
}

impl From<tokio_postgres::Error> for AppError {
    fn from(inner: tokio_postgres::Error) -> Self {
        AppError::Postgres(inner)
    }
}

impl From<RedisError> for AppError {
    fn from(inner: RedisError) -> Self {
        AppError::Redis(inner)
    }
}

impl From<serde_json::Error> for AppError {
    fn from(inner: serde_json::Error) -> Self {
        AppError::SerdeJson(inner)
    }
}

impl IntoResponse for AppError {
    fn into_response(self) -> axum::response::Response {
        let (status, error_message) = match self {
            AppError::Redis(error) => (StatusCode::UNPROCESSABLE_ENTITY, error.to_string()),
            AppError::SerdeJson(error) => (StatusCode::UNPROCESSABLE_ENTITY, error.to_string()),
            AppError::Postgres(error) => (StatusCode::UNPROCESSABLE_ENTITY, error.to_string()),
            AppError::RunError(error) => (StatusCode::UNPROCESSABLE_ENTITY, error.to_string()),
            AppError::Custom(error) => (StatusCode::UNPROCESSABLE_ENTITY, error),
        };

        let body = Json(json!({ "error": error_message }));

        (status, body).into_response()
    }
}
