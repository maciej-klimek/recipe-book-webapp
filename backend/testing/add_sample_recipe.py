from config import app, db
from models import Recipe

with app.app_context():

    sample_recipe = Recipe(
        title="60",
        prep_time=60,
        recipe_type="60",
        ingredient_list="Ingredient 60, Ingredient 60, Ingredient 60",
        instructions="Step 1: 60. Step 2: 60."
    )

    db.session.add(sample_recipe)
    db.session.commit()
