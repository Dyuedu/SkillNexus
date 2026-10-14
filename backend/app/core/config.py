from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "SkillNexus"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"

    # Local AI (Ollama)
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "qwen2.5-coder:7b"
    OLLAMA_EMBEDDING_MODEL: str = "nomic-embed-text"

    # PostgreSQL
    POSTGRES_USER: str = "skillnexus"
    POSTGRES_PASSWORD: str = "skillnexus_secret"
    POSTGRES_DB: str = "skillnexus_db"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    DATABASE_URL: Optional[str] = None

    # Neo4j
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "skillnexus_secret"

    # Redis
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379

    # MinIO
    MINIO_ENDPOINT: str = "localhost:9000"
    MINIO_ROOT_USER: str = "skillnexus_admin"
    MINIO_ROOT_PASSWORD: str = "skillnexus_minio_secret"
    MINIO_BUCKET_RESUMES: str = "skillnexus-resumes"
    MINIO_SECURE: bool = False

    # Security
    SECRET_KEY: str = "skillnexus_super_secret_development_key_change_in_production_123456789"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    def get_database_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
