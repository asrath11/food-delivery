from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    port : int = Field(...,alias='PORT')
    db_url: str = Field(..., alias="DATABASE_URL")
    jwt_access_secret: str = Field(..., alias="JWT_SECRET_KEY")
    secret_key: str = Field(..., alias="SECRET_KEY")
    razorpay_key_id: str = Field(..., alias="RAZORPAY_KEY_ID")
    razorpay_key_secret: str = Field(..., alias="RAZORPAY_KEY_SECRET")


    class Config:
        env_file = ".env"

    # extra = "ignore"  # Avoid "extra not permitted" errors


setting = Settings()
print(setting.razorpay_key_id)
print(setting.razorpay_key_secret)
