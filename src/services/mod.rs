use crate::{
    database::redis::RedisConnection,
    errors::AppError,
    models::{
        dtos::{meta::Meta, series::Series},
        post::Post,
    },
};

pub async fn get_post_by_name(
    redis_con: RedisConnection,
    post_name: &str,
) -> Result<Post, AppError> {
    let posts = Post::get_posts_redis(redis_con).await?;

    match posts.into_iter().find(|p| p.title == post_name) {
        Some(mut p) => {
            p.convert_markdown_to_html();
            Ok(p)
        }
        None => Err(AppError::Custom(format!("{} not found", post_name))),
    }
}

pub async fn get_post_by_id(redis_con: RedisConnection, post_id: &str) -> Result<Post, AppError> {
    let posts = Post::get_posts_redis(redis_con).await?;

    match posts
        .into_iter()
        .find(|p| p.id.unwrap().to_string() == post_id)
    {
        Some(p) => Ok(p),
        None => Err(AppError::Custom(format!("{} not found", post_id))),
    }
}

pub async fn get_metas_sorted(redis_con: RedisConnection) -> Result<Vec<Meta>, AppError> {
    let mut meta = Meta::get_metas_redis(redis_con).await?;

    meta.sort_by(|a, b| b.date.cmp(&a.date).then(a.title.cmp(&b.title)));

    Ok(meta)
}

pub async fn get_series_sorted(redis_con: RedisConnection) -> Result<Vec<Series>, AppError> {
    let mut series = Series::get_series_redis(redis_con).await?;

    series.sort_by(|a, b| a.series.cmp(&b.series));
    series.dedup_by(|a, b| a.series == b.series);

    Ok(series)
}

pub async fn get_series_metas_sorted_by_name(
    redis_con: RedisConnection,
    series_name: &str,
) -> Result<Vec<Meta>, AppError> {
    let meta = Meta::get_metas_redis(redis_con).await?;

    let mut series = meta
        .into_iter()
        .filter(|m| m.series == series_name)
        .collect::<Vec<Meta>>();

    series.sort_by(|a, b| b.date.cmp(&a.date).then(a.title.cmp(&b.title)));

    Ok(series)
}

pub async fn get_categories_metas_sorted_by_name(
    redis_con: RedisConnection,
    category_name: &str,
) -> Result<Vec<Meta>, AppError> {
    let meta = Meta::get_metas_redis(redis_con).await?;

    let mut meta = meta
        .into_iter()
        .filter(|m| m.categories.contains(&category_name.to_string()))
        .collect::<Vec<Meta>>();

    meta.sort_by(|a, b| b.date.cmp(&a.date).then(a.title.cmp(&b.title)));

    Ok(meta)
}
