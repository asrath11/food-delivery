from app.models.db import db
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
import uuid

class Wishlist(db.Model):
    __tablename__ = 'wishlist'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(100), ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    item_id = Column(String(100), ForeignKey('items.id', ondelete="CASCADE"), nullable=False)

    user = relationship("User", backref="wishlist_items", lazy=True, passive_deletes=True)
    item = relationship("Item", backref="in_wishlist", lazy=True, passive_deletes=True)
