"""
Defines the blueprint for the users
"""
from flask import Blueprint
from flask_restful import Api

from resources import SimilaritiesResource

SIMILARITIES_BLUEPRINT = Blueprint("Similarities", __name__)
Api(SIMILARITIES_BLUEPRINT).add_resource(
    SimilaritiesResource, "/Similarities/<string:user_first_name>/<string:user_last_name>"
)
