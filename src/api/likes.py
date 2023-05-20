from flask_sqlalchemy import SQLAlchemy
from .db import db
from .recipe import Recipe
from .user import User


class Like(db.Model):
    __tablename__="likes"
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, nullable=False)

    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    def __repr__(self):
        return f"<Like {self.id}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "number": self.number,
            "recipe_id": self.recipe_id,
            "user_id": self.user_id
        }



# from flask_sqlalchemy import SQLAlchemy
# from .db import db
# from .recipe import Recipe
# from .user import User


# class Like(db.Model):
#     __tablename__="likes"
#     id = db.Column(db.Integer, primary_key=True)
#     number = db.Column(db.Integer, nullable=False)
#     id_recipe = db.relationship('Recipe', backref='likes', lazy=True)

#     # id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False)

#     # id_recipe = db.Column(db.Integer, db.ForeignKey('recipe.id_recipe'), nullable=False)
#     def serialize(self):
#         return {
#             "id": self.id,
#             "id_recipe": self.id_recipe,
#             "number": self.number
#         }

    