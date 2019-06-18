""" Defines the Film repository """

from models import Film


class FilmRepository:
    """ The repository for the film model """

    @staticmethod
    def get(title):
        """ Query a film by title """
        return Film.query.filter_by(title=title).one()

    def update(self, title, date):
        """ Update a film's date """
        film = self.get(title)
        film.date = date

        return film.save()

    @staticmethod
    def create(title, date):
        """ Create a new film """
        film = Film(title=title, date=date)

        return film.save()
