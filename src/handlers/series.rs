use std::{collections::HashMap, sync::Arc};

use axum::{
    extract::{Path, State},
    response::IntoResponse,
    Json,
};

use crate::{
    errors::AppError,
    services::{get_series_metas_sorted_by_name, get_series_sorted},
    AppState,
};

pub async fn get_series_handler(
    State(state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, AppError> {
    let redis_con = state.databases.redis.new_connection().await?;

    let series = get_series_sorted(redis_con).await?;

    Ok(Json(series))
}

pub async fn get_series_metas_handler(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<impl IntoResponse, AppError> {
    let series_name = params.get("series");

    let redis_con = state.databases.redis.new_connection().await?;

    match series_name {
        Some(series_name) => {
            let post = get_series_metas_sorted_by_name(redis_con, series_name).await?;

            Ok(Json(post))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}
