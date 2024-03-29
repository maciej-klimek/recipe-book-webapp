import json
from flask import request, jsonify
from config import app, db
from models import Recipe
from flask_cors import CORS, cross_origin
import os
from werkzeug.utils import secure_filename


@app.route("/recipies", methods=["GET"])
def get_all_recipies():
    recipies_data = Recipe.query.all()
    recipies_json = list(map(lambda x: x.to_json(), recipies_data))
    return jsonify({"recipies": recipies_json})


@app.route("/add_recipe", methods=["POST"])
def add_new_recipe():
    recipe_data_json = request.form.get("recipe_data")
    if not recipe_data_json:
        return jsonify({"message": "Recipe data is missing"}), 400

    recipe_data = json.loads(recipe_data_json)
    title = recipe_data.get("title")
    prep_time = recipe_data.get("prepTime")
    recipe_type = recipe_data.get("recipeType")
    ingredient_list = recipe_data.get("ingredientList")
    instructions = recipe_data.get("instructions")

    image_file = request.files.get("image")
    if not image_file:
        return jsonify({"message": "Image file is missing"}), 400

    # Save the image file to your desired location
    filename = secure_filename(image_file.filename)
    image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    image_file.save(image_path)

    if not title or not ingredient_list:
        return jsonify({"message": "You must include a title and an ingredients list to add a recipe."}), 400

    new_recipe = Recipe(title=title, prep_time=prep_time, recipe_type=recipe_type,
                        ingredient_list=ingredient_list, instructions=instructions, image_path=image_path)

    try:
        db.session.add(new_recipe)
        db.session.commit()
    except Exception as ex:
        return jsonify({"message": str(ex)}), 400

    return jsonify({"message": "New recipe added."}), 201


@app.route("/update_recipe/<int:recipe_id>", methods=["PATCH"])
def update_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)

    if not recipe:
        return jsonify({"message": "Recipe not found."}), 404

    request_data = request.json
    recipe.title = request_data.get("title", recipe.title)
    recipe.prep_time = request_data.get("prepTime", recipe.prep_time)
    recipe.recipe_type = request_data.get("recipeType", recipe.recipe_type)
    recipe.ingredient_list = request_data.get(
        "ingredientList", recipe.ingredient_list)
    recipe.instructions = request_data.get("instructions", recipe.instructions)

    db.session.commit()

    return jsonify({"message": "Recipe updated"}), 200


@app.route("/delete_recipe/<recipe_id>", methods=["DELETE"])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)

    if not recipe:
        jsonify({"message": "Recipe not found"}), 404

    db.session.delete(recipe)
    db.session.commit()

    return jsonify({"message": "Recipe deleted"}), 200
