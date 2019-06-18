"""
Defines the blueprint for the users
"""
from flask import Blueprint
from flask_restful import Api

from resources import NotationAverageFilmResource

AVR_FILM_NOTATION_BLUEPRINT = Blueprint("notationAverageFilm", __name__)
Api(AVR_FILM_NOTATION_BLUEPRINT).add_resource(
    NotationAverageFilmResource, "/notationAverageFilm/<string:movie_title>"
)
