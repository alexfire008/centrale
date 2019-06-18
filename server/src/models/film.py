"""
Define the Film model
"""

from . import db
from .abc import BaseModel, MetaBaseModel

class Film(db.Model, BaseModel, metaclass=MetaBaseModel):
    """ The Film model """

    __tablename__ = "film"

    title = db.Column(db.String(300), primary_key=True)
    date = db.Column(db.Integer, nullable=True)

    notations = db.relationship("notation", backref="parent")

    def __init__(self, title, date=None):
        """ Create a new film """
        self.title = title
        self.date = date