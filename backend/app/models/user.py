from app.models.db import db
from sqlalchemy import Column, String,Enum
import uuid


class User(db.Model):
    # Optional: name of the table in the DB
    __tablename__ : str = "users"

    id = Column(String(100), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(80), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    role = Column(Enum("user", "admin", name="user_roles"), nullable=False, default="user")

    def __repr__(self):
        return f"<User {self.id}>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            'role': self.role,
        }
