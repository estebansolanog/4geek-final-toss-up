from flask_sqlalchemy import SQLAlchemy
from .db import db

class TokenBlokedList(db.Model):
    __tablename__ = 'token_bloked_lists'
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(250), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=False, nullable=False)  # Se recomienda el uso del ID en lugar del email, se hace aquí como práctica. Igual, podría ser un ForengnKey
    create_at = db.Column(db.DateTime, nullable=False)
    is_blocked = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f"<TokenBlokedList {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "token": self.token,
            "email": self.email,
            "create_at": self.create_at,
            "is_blocked": self.is_blocked,
        }