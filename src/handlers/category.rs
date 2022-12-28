use std::{collections::HashMap, sync::Arc};

use axum::{
    extract::{Path, State},
    response::IntoResponse,
    Json,
};

use crate::{errors::AppError, services::get_categories_metas_sorted_by_name, AppState};

pub async fn get_categories_handler(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<impl IntoResponse, AppError> {
    let category_name = params.get("category");

    let redis_con = state.databases.redis.new_connection().await?;

    match category_name {
        Some(category_name) => {
            let post = get_categories_metas_sorted_by_name(redis_con, category_name).await?;

            Ok(Json(post))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}
