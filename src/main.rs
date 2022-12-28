use axum::{
    handler::Handler,
    middleware,
    routing::{delete, get, get_service, post, put},
    Router,
};
use dotenvy::dotenv;
use http::StatusCode;
use std::sync::Arc;
use tower_cookies::CookieManagerLayer;
use tower_http::services::{ServeDir, ServeFile};

use database::{initialize_connections, DatabaseState};
use errors::AppError;
use handlers::{
    admin::{
        admin_get_post_handler, admin_get_posts_handler, admin_login_handler,
        admin_login_me_handler, admin_logout_me_handler, admin_update_post_handler,
    },
    category::get_categories_handler,
    meta::get_metas_handler,
    post::get_post_handler,
    series::{get_series_handler, get_series_metas_handler},
};
use middlewares::admin::admin_auth;

mod database;
mod errors;
mod handlers;
mod middlewares;
mod models;
mod services;
mod utilities;

pub struct AppState {
    pub databases: DatabaseState,
}

#[tokio::main]
async fn main() -> Result<(), AppError> {
    dotenv().expect(".env file not found");

    let database_state = initialize_connections().await?;

    database_state.startup_cache().await?;

    let shared_state = Arc::new(AppState {
        databases: database_state,
    });

    let api_router = Router::new()
        .route("/meta", get(get_metas_handler))
        .route("/post/:post", get(get_post_handler))
        .route("/series", get(get_series_handler))
        .route("/series/:series", get(get_series_metas_handler))
        .route("/category/:category", get(get_categories_handler));

    let admin_api_router = Router::new()
        .route("/posts", get(admin_get_posts_handler))
        .route("/posts/:id", get(admin_get_post_handler))
        // .route("/posts/", post())
        .route("/posts/:id", put(admin_update_post_handler))
        // .route("/posts/:id", delete())
        .route_layer(middleware::from_fn(admin_auth));

    let admin_router = Router::new()
        .nest("/", admin_api_router)
        .route("/login", post(admin_login_handler))
        .route(
            "/login/me",
            post(admin_login_me_handler.layer(middleware::from_fn(admin_auth))),
        )
        .route(
            "/logout",
            post(admin_logout_me_handler.layer(middleware::from_fn(admin_auth))),
        );

    let app = Router::new()
        .nest("/api/v1", api_router)
        .nest("/api/admin", admin_router)
        .nest_service(
            "/assets",
            get_service(ServeDir::new("./frontend/dist/assets")).handle_error(
                |error: std::io::Error| async move {
                    (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        format!("Unhandled internal error: {}", error),
                    )
                },
            ),
        )
        .fallback_service(
            get_service(ServeFile::new("./frontend/dist/index.html")).handle_error(
                |_| async move { (StatusCode::INTERNAL_SERVER_ERROR, "internal server error") },
            ),
        )
        .layer(CookieManagerLayer::new())
        .with_state(shared_state);

    axum::Server::bind(&"0.0.0.0:8040".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();

    Ok(())
}
