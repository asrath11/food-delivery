from app.models.db import db
from sqlalchemy import Column, String, Integer,Boolean
import uuid


class Item(db.Model):
    __tablename__ = "items"

    id = Column(String(100), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)
    desc = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    image = Column(String(100), nullable=False)
    is_spicy = Column(Boolean, nullable=False,default=False)
    is_vegetarian = Column(Boolean, nullable=False,default=False)
    is_popular = Column(Boolean, nullable=False,default=False)

    def __repr__(self):
        return f"<Item id={self.id}, name='{self.name}'>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "desc": self.desc,
            "category": self.category,
            "price": self.price,
            "image": self.image,
            "is_spicy": self.is_spicy,
            "is_popular": self.is_popular,
            "is_vegetarian": self.is_vegetarian,
        }
