
from config import app, db
from models import Recipe

with app.app_context():
    sample_recipe = db.session.get(Recipe, 1)

    if sample_recipe:
        try:
            db.session.delete(sample_recipe)
            db.session.commit()
            print("Recipe deleted successfully.")

        except Exception as e:
            db.session.rollback()
            print("Error deleting recipe:", str(e))
    else:
        print("Recipe not found.")
