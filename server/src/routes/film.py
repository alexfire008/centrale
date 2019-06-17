"""
Defines the blueprint for the films
"""
from flask import Blueprint
from flask_restful import Api

from resources import FilmResource

FILM_BLUEPRINT = Blueprint("film", __title__)
Api(FILM_BLUEPRINT).add_resource(
    FilmResource, "/film/<string:title>"
)
