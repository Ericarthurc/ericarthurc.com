use bb8::PooledConnection;
use bb8_postgres::PostgresConnectionManager;
use chrono::{DateTime, Utc};
use comrak::{
    markdown_to_html_with_plugins,
    plugins::syntect::{SyntectAdapter, SyntectAdapterBuilder},
    ComrakOptions, ComrakPlugins,
};
use once_cell::sync::Lazy;
use postgres_openssl::MakeTlsConnector;
use serde::{Deserialize, Serialize};
use syntect::highlighting::ThemeSet;
use uuid::Uuid;

use crate::{database::redis::RedisConnection, errors::AppError};

static SYNTECT_ADAPTER: Lazy<SyntectAdapter> = {
    Lazy::new(|| {
        let themes = ThemeSet::load_from_folder("./themes").unwrap();
        SyntectAdapterBuilder::new()
            .theme_set(themes)
            .theme("halcyon")
            .build()
    })
};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Post {
    pub id: Option<Uuid>,
    pub title: String,
    pub series: String,
    pub categories: Vec<String>,
    pub markdown: String,
    pub date: DateTime<Utc>,
}

impl TryFrom<tokio_postgres::Row> for Post {
    type Error = &'static str;

    fn try_from(value: tokio_postgres::Row) -> Result<Self, Self::Error> {
        Ok(Self {
            id: value.get(0),
            title: value.get(1),
            series: value.get(2),
            categories: value.get(3),
            markdown: value.get(4),
            date: value.get(5),
        })
    }
}

impl Post {
    pub fn convert_markdown_to_html(&mut self) {
        let mut options = ComrakOptions::default();
        options.extension.autolink = true;
        options.extension.header_ids = Some(String::from(""));
        let mut plugins = ComrakPlugins::default();

        plugins.render.codefence_syntax_highlighter = Some(&*SYNTECT_ADAPTER);

        let converted = markdown_to_html_with_plugins(&self.markdown, &options, &plugins);
        self.markdown = converted;
    }
}

impl Post {
    pub async fn get_posts_redis(mut redis_con: RedisConnection) -> Result<Vec<Self>, AppError> {
        let posts: Vec<Post> = redis_con.get_cache_redis().await?;

        Ok(posts)
    }
}

impl Post {
    pub async fn get_posts_postgres<'a>(
        postgres_con: PooledConnection<'a, PostgresConnectionManager<MakeTlsConnector>>,
    ) -> Result<Vec<Self>, AppError> {
        let row = postgres_con.query("SELECT * FROM post", &[]).await?;

        Ok(row
            .into_iter()
            .map(|row| Post::try_from(row).unwrap())
            .collect())
    }

    // pub async fn get_post_postgres<'a>(
    //     postgres_con: PooledConnection<'a, PostgresConnectionManager<MakeTlsConnector>>,
    //     post_name: &str,
    // ) -> Result<Self, AppError> {
    //     let row = postgres_con
    //         .query_one("SELECT * FROM post WHERE title = $1 ", &[&post_name])
    //         .await?;

    //     Ok(Post::try_from(row).unwrap())
    // }

    pub async fn create_post_postgres<'a>(
        postgres_con: PooledConnection<'a, PostgresConnectionManager<MakeTlsConnector>>,
        new_post: Post,
    ) -> Result<Self, AppError> {
        let row = postgres_con.query_one("INSERT INTO post (title, series, categories, markdown, date) VALUES ($1, $2, $3, $4, $5) RETURNING *", &[&new_post.title, &new_post.series, &new_post.categories, &new_post.markdown, &new_post.date]).await?;

        Ok(Post::try_from(row).unwrap())
    }

    pub async fn update_post_postgres<'a>(
        postgres_con: PooledConnection<'a, PostgresConnectionManager<MakeTlsConnector>>,
        post_id: &str,
        updated_post: Post,
    ) -> Result<Self, AppError> {
        let id = uuid::Uuid::parse_str(&post_id).unwrap();

        let row = postgres_con.query_one("UPDATE post SET title = $2, series = $3, categories = $4, markdown = $5, date = $6 WHERE id = $1 RETURNING *", &[&id, &updated_post.title, &updated_post.series, &updated_post.categories, &updated_post.markdown, &updated_post.date]).await?;

        Ok(Post::try_from(row).unwrap())
    }

    // DELETE
    // DELETE FROM items WHERE id = $1
    pub async fn delete_post_postgres<'a>(
        postgres_con: PooledConnection<'a, PostgresConnectionManager<MakeTlsConnector>>,
        post_id: &str,
    ) -> Result<(), AppError> {
        let id = uuid::Uuid::parse_str(&post_id).unwrap();

        let _ = postgres_con
            .query_one("DELETE FROM post WHERE id = $1", &[&id])
            .await;

        Ok(())
    }
}
