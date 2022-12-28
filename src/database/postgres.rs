use bb8::{Pool, PooledConnection};
use bb8_postgres::PostgresConnectionManager;
use openssl::ssl::{SslConnector, SslMethod};
use postgres_openssl::MakeTlsConnector;
use std::env;

use crate::errors::AppError;

pub struct PostgresDatabase {
    pub postgres_pool: Pool<PostgresConnectionManager<MakeTlsConnector>>,
}

impl PostgresDatabase {
    pub async fn connect_to_postgres() -> Result<PostgresDatabase, AppError> {
        let postgres_url = env::var("POSTGRES_URL").unwrap();
        let connector =
            MakeTlsConnector::new(SslConnector::builder(SslMethod::tls()).unwrap().build());

        let manager =
            PostgresConnectionManager::new_from_stringlike(postgres_url, connector).unwrap();

        let postgres_pool = Pool::builder().build(manager).await?;

        Ok(PostgresDatabase { postgres_pool })
    }

    pub async fn new_connection(
        &self,
    ) -> Result<PooledConnection<PostgresConnectionManager<MakeTlsConnector>>, AppError> {
        let pool_connection = self.postgres_pool.get().await?;

        Ok(pool_connection)
    }
}
