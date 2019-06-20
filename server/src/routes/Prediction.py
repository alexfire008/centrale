"""
Defines the blueprint for the users
"""
from flask import Blueprint
from flask_restful import Api

from resources import PredictionResource

PREDICTION_BLUEPRINT = Blueprint("Prediction", __name__)
Api(PREDICTION_BLUEPRINT).add_resource(
    PredictionResource, "/prediction/<string:user_first_name>/<string:user_last_name>"
)
