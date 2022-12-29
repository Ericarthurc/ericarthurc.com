use axum::{
    extract, extract::Path, extract::State, response::IntoResponse, response::Response, Json,
};
use http::StatusCode;
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, env, sync::Arc};
use tower_cookies::{Cookie, Cookies};

use crate::models::post::Post;
use crate::services::{get_metas_sorted, get_post_by_id, get_post_by_name};
use crate::AppState;
use crate::{errors::AppError, utilities::jwt::generate_auth_jwt};

#[derive(Serialize, Deserialize, Debug)]
#[allow(dead_code)]
pub struct LoginInput {
    password: String,
    pin: String,
}

pub async fn admin_login_handler(
    cookies: Cookies,
    extract::Json(login_payload): extract::Json<LoginInput>,
) -> Result<Response, AppError> {
    if login_payload.password == env::var("ADMIN_PASSWORD").unwrap()
        && login_payload.pin == env::var("ADMIN_PIN").unwrap()
    {
        let token = generate_auth_jwt(login_payload.password, login_payload.pin).unwrap();

        let cookie = Cookie::build("auth", token)
            .max_age(cookie::time::Duration::days(3))
            .secure(true)
            .http_only(true)
            .path("/")
            .finish();

        cookies.add(cookie);
        return Ok((StatusCode::OK).into_response());
    }
    Ok((StatusCode::UNAUTHORIZED).into_response())
}

pub async fn admin_login_me_handler() -> Result<StatusCode, AppError> {
    return Ok(StatusCode::OK);
}

pub async fn admin_logout_me_handler(cookies: Cookies) -> Result<impl IntoResponse, AppError> {
    let cookie = Cookie::build("auth", "")
        .max_age(cookie::time::Duration::days(3))
        .secure(true)
        .http_only(true)
        .path("/")
        .finish();

    cookies.remove(cookie);
    return Ok(StatusCode::OK);
}

pub async fn admin_get_posts_handler(
    State(state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, AppError> {
    let redis_con = state.databases.redis.new_connection().await?;

    let meta = get_metas_sorted(redis_con).await?;

    Ok(Json(meta))
}

pub async fn admin_get_post_handler(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<impl IntoResponse, AppError> {
    let post_id = params.get("id");

    let redis_con = state.databases.redis.new_connection().await?;

    match post_id {
        Some(post_id) => {
            let post = get_post_by_id(redis_con, post_id).await?;

            Ok(Json(post))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}

pub async fn admin_create_post_handler(
    State(state): State<Arc<AppState>>,
    extract::Json(post_payload): extract::Json<Post>,
) -> Result<impl IntoResponse, AppError> {
    let postgres_con = state.databases.postgres.new_connection().await?;

    let created_post = Post::create_post_postgres(postgres_con, post_payload).await?;
    state.databases.update_cache().await?;
    Ok(Json(created_post))
}

pub async fn admin_update_post_handler(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
    extract::Json(post_payload): extract::Json<Post>,
) -> Result<impl IntoResponse, AppError> {
    let post_id = params.get("id");

    let postgres_con = state.databases.postgres.new_connection().await?;

    match post_id {
        Some(post_id) => {
            let updated_post =
                Post::update_post_postgres(postgres_con, post_id, post_payload).await?;
            state.databases.update_cache().await?;
            Ok(Json(updated_post))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}

pub async fn admin_delete_post_handler(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<impl IntoResponse, AppError> {
    let post_id = params.get("id");

    let postgres_con = state.databases.postgres.new_connection().await?;
    match post_id {
        Some(post_id) => {
            Post::delete_post_postgres(postgres_con, post_id).await?;
            state.databases.update_cache().await?;
            Ok((StatusCode::OK).into_response())
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}
