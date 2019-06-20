"""
Defines the blueprint for the users
"""
from flask import Blueprint
from flask_restful import Api

from resources import FilmNotesResource

FILMNOTES_BLUEPRINT = Blueprint("FilmNotes", __name__)
Api(FILMNOTES_BLUEPRINT).add_resource(
    FilmNotesResource, "/FilmNotes/<string:user_first_name>/<string:user_last_name>"
)
