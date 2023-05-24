from flask_sqlalchemy import SQLAlchemy
from .db import db
from .user import User

class RecipeChat(db.Model):
    __tablename__="recipe_chat"
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(120), unique=False, nullable=True)
    description=db.Column(db.String(6144), unique=False, nullable=False)
    user_query=db.Column(db.String(280), unique=False, nullable=False)
    image_of_recipe=db.Column(db.String(512), unique=False, nullable=True)
    share=db.Column(db.Boolean(), unique=False, nullable=False)
    generated_by_ia=db.Column(db.Boolean(), unique=False, nullable=False)

    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    
    coments=db.relationship('Coment', backref='recipe_chat', lazy=True)
    def __repr__(self):
        return f'<RecipeChat {self.description}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "user_id": self.user_id,
             "user_name": self.user.name if self.user else None,
            "user_query": self.user_query,
            "image_of_recipe": self.image_of_recipe,
            "share": self.share,
            "generated_by_ia": self.generated_by_ia,
            "coments": [coment.serialize() for coment in self.coments]

        }



#CODIGO DE ISRAEL

# from flask_sqlalchemy import SQLAlchemy
# from .db import db
# from .user import User

# class RecipeChat(db.Model):
#     __tablename__="recipe_chat"
#     id=db.Column(db.Integer, primary_key=True)
#     name=db.Column(db.String(120), unique=False, nullable=True)
#     description=db.Column(db.String(6144), unique=False, nullable=False)
#     id_user=db.Column(db.Integer, db.ForeignKey('users.id'))
#     user_query=db.Column(db.String(280), unique=False, nullable=False)
#     image_of_recipe=db.Column(db.String(512), unique=False, nullable=True)
#     share=db.Column(db.Boolean(), unique=False, nullable=False)
#     user_id=db.Column(db.Integer, db.ForeignKey('users.id'))    
#     coments=db.relationship('Coment', backref='recipe_chat', lazy=True)
#     def __repr__(self):
#         return f'<RecipeChat {self.description}>'
    
#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "description": self.description,
#             "id_user": self.id_user,
#             "user_query": self.user_query,
#             "image_of_recipe": self.image_of_recipe,
#             "share": self.share,
#             "coments": [coment.serialize() for coment in self.coments]
#         }
        