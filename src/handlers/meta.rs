use axum::{extract::State, response::IntoResponse, Json};
use std::sync::Arc;

use crate::{errors::AppError, services::get_metas_sorted, AppState};

pub async fn get_metas_handler(
    State(state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, AppError> {
    let redis_con = state.databases.redis.new_connection().await?;

    let meta = get_metas_sorted(redis_con).await?;

    Ok(Json(meta))
}
