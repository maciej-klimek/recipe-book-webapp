from config import db


class Recipe(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), unique=True, nullable=False)
    prep_time = db.Column(db.Integer, unique=False, nullable=True)
    recipe_type = db.Column(db.String(50), unique=False, nullable=True)
    ingredient_list = db.Column(db.String(2000), unique=False, nullable=False)
    instructions = db.Column(db.String(5000), unique=False, nullable=True)
    image_path = db.Column(db.String(200), unique=False, nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "recipeType": self.recipe_type,
            "prepTime": self.prep_time,
            "ingredientList": self.ingredient_list,
            "instructions": self.instructions,
            "image_path": self.image_path
        }
