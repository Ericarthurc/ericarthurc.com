use std::{collections::HashMap, sync::Arc};

use axum::{
    extract::{Path, State},
    response::IntoResponse,
    Json,
};

use crate::{errors::AppError, services::get_post_by_name, AppState};

pub async fn get_post_handler(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<impl IntoResponse, AppError> {
    let post_name = params.get("post");

    let redis_con = state.databases.redis.new_connection().await?;

    match post_name {
        Some(post_name) => {
            let post = get_post_by_name(redis_con, post_name).await?;

            Ok(Json(post))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}
