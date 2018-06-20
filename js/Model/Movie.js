/**
 * Represents a movie.
 */
class Movie {
    constructor(slots, isFavorite) {
        this.title = slots.Title;
        this.genres = slots.Genre;
        this.year = slots.Year;
        this.director = slots.Director;
        this.description = slots.Plot;
        this.img = slots.Poster;
        this.isFavorite = isFavorite;
    }

    static CreateTestData(doneCallback) {
        /* Request json text from local movies.json file */
        HTTPRequestUtil.RequestAsync('GET', 'movies.json', function (localMoviesJson) {
            // Parse the stored JSON to an object.
            let localMoviesObj = JSON.parse(localMoviesJson);

            // Loop through movies
            let localMovieKeys = Object.keys(localMoviesObj);
            let amountOfMoviesProcessed = 0;
            localMovieKeys.forEach(movieKey => {
                let movieTitle = localMoviesObj[movieKey].title;
                let movieYear = localMoviesObj[movieKey].year;

                /* OMDB API JSON request */
                HTTPRequestUtil.RequestAsync('GET', 'http://www.omdbapi.com/?apikey=8029a24&t=' + movieTitle.replace(' ', '-').toLowerCase() + '&y=' + movieYear, function (responseText) {
                    let parsedMovieResponse = JSON.parse(responseText);

                    // Increment the amount of movies processed.
                    amountOfMoviesProcessed++;

                    // Create a new movie instance with the data received from the api.
                    Movie.Instances[movieTitle] = new Movie(parsedMovieResponse, false);

                    // Save all movies and call the callback function if this is the last movie.
                    if (amountOfMoviesProcessed === localMovieKeys.length) {
                        Movie.SaveAll();
                        doneCallback();
                    }
                });
            });
        });
    }

    static SaveAll() {
        this._SetMovieDB(JSON.stringify(Movie.Instances));
    }

    static LoadAll(onLoaded) {
        if (this._GetMovieDB()) {
            Movie.Instances = JSON.parse(this._GetMovieDB());
            onLoaded();
            console.log("Loaded.");
        }
        else {
            this.CreateTestData(function () {
                onLoaded();
                console.log("Test data created.");
            });
        }
    }

    /**
     * Returns the movie db local storage.
     */
    static _GetMovieDB() {
        return localStorage['MovieDB'];
    }

    /**
     * Sets the value of movie local storage.
     * @param {string} value The data to save in the movie local storage.
     */
    static _SetMovieDB(value) {
        localStorage['MovieDB'] = value;
    }
}

Movie.Instances = {};