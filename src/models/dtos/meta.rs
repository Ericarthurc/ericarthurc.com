use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{database::redis::RedisConnection, errors::AppError};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Meta {
    pub id: Uuid,
    pub title: String,
    pub series: String,
    pub categories: Vec<String>,
    pub date: DateTime<Utc>,
}

impl Meta {
    pub async fn get_metas_redis(mut redis_con: RedisConnection) -> Result<Vec<Meta>, AppError> {
        let metas: Vec<Meta> = redis_con.get_cache_redis().await?;

        Ok(metas)
    }
}
