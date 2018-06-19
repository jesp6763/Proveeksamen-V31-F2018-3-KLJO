class MoviesPage
{
    static SetupUI()
    {
        MoviesPage.favoriteSection = document.getElementById('favorite-movies').querySelector('.row');
        MoviesPage.allMoviesSection = document.getElementById('all-movies').querySelector('.row');
        Movie.LoadAll(function(){
            MoviesPage._PopulateWithMovies();
        });


        window.addEventListener('unload', function(){
            Movie.SaveAll();
        });
    }

    static _PopulateWithMovies()
    {
        let movieInstanceKeys = Object.keys(Movie.Instances);

        for (let i = 0; i < movieInstanceKeys.length; i++) {
            const movie = Movie.Instances[movieInstanceKeys[i]];

            if(movie.isFavorite)
            {
                new MovieCard(MoviesPage.favoriteSection, movie);
            }
            else
            {
                new MovieCard(MoviesPage.allMoviesSection, movie);
            }
        }
    }
}

MoviesPage.favoriteSection;
MoviesPage.allMoviesSection;