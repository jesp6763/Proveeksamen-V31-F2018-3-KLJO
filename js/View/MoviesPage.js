class MoviesPage
{
    static SetupUI()
    {
        this.favoriteSection = document.getElementById('favorite-movies');
        Movie.LoadAll();
    }

    static _PopulateWithMovies()
    {

    }
}