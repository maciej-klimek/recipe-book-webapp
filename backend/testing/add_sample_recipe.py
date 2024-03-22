from config import app, db
from models import Recipe

with app.app_context():

    sample_recipe = Recipe(
        title="Sample Recipe",
        prep_time=30,
        recipe_type="Dinner",
        ingredient_list="Ingredient 1, Ingredient 2, Ingredient 3",
        instructions="Step 1: Do this. Step 2: Do that."
    )

    db.session.add(sample_recipe)
    db.session.commit()
