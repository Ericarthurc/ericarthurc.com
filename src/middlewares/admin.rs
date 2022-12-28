use axum::{
    http::{Request, StatusCode},
    middleware::Next,
    response::Response,
};
use tower_cookies::Cookies;

use crate::utilities::jwt::validate_auth_jwt;

pub async fn admin_auth<B>(
    cookies: Cookies,
    req: Request<B>,
    next: Next<B>,
) -> Result<Response, StatusCode> {
    let auth_cookie = cookies.get("auth");

    match auth_cookie {
        Some(auth_c) => match validate_auth_jwt(auth_c.value()) {
            Ok(_) => Ok(next.run(req).await),
            Err(_) => Err(StatusCode::UNAUTHORIZED),
        },
        None => Err(StatusCode::UNAUTHORIZED),
    }
}
