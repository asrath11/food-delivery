from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    db_url: str = Field(..., alias="DATABASE_URL")
    jwt_access_secret: str = Field(..., alias="JWT_SECRET_KEY")
    secret_key: str = Field(..., alias="SECRET_KEY")

    class Config:
        env_file = ".env"

    # extra = "ignore"  # Avoid "extra not permitted" errors


setting = Settings()

