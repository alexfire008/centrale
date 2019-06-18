"""
Defines the blueprint for the users
"""
from flask import Blueprint
from flask_restful import Api

from resources import NotationAverage

AVR_NOTATION_BLUEPRINT = Blueprint("Average", __name__)
Api(AVR_NOTATION_BLUEPRINT).add_resource(
    NotationAverage, "/Average/<string:movie_title>"
)
