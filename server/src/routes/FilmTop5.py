"""
Defines the blueprint for the users
"""
from flask import Blueprint
from flask_restful import Api

from resources import FilmTop5Resource

FILM_TOP_NOTATION_BLUEPRINT = Blueprint("FilmTop5", __name__)
Api(FILM_TOP_NOTATION_BLUEPRINT).add_resource(
    FilmTop5Resource, "/FilmTop5/"
)
