from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS     #Cross-origin Recourse Sharing - wspołdzielenie zasobów

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///recipe_database.db"
app.config["SQLALCHEMY_DATABASE_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
