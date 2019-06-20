"""
Defines the blueprint for the users
"""
from flask import Blueprint
from flask_restful import Api

from resources import RechercheResource

RECHERCHE_BLUEPRINT = Blueprint("recherche", __name__)
Api(RECHERCHE_BLUEPRINT).add_resource(
    RechercheResource, "/recherche/<string:research>"
)
