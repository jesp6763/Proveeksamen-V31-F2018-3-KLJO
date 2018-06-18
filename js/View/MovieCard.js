/**
 * Represents a movie card component.
 */
class MovieCard {
    constructor() {


        this.elements = {
            title: document.querySelector('.card-title'),
            year: document.querySelector('.card-body > p.card-text'),
            genre: document.querySelector('.card-body > p:nth-of-type(2)'),
            addToFavoritesBtn: this.mainElement.querySelector('.card-body > a'),
            removeFromFavoritesBtn: this.mainElement.getElementsByClassName('a')[1]
        }
    }

    /**
     * Replaces the original text with the movie's information.
     * @param {Movie} movie The movie.
     */
    SetupUI(movie) {

    }

    AddToFavorites() {
        Movie.Instances[this.elements.title.textContent].isFavorite = true;
    }

    RemoveFromFavorites() {
        Movie.Instances[this.elements.title.textContent].isFavorite = false;
    }

    /**
     * Creates a movie card element based on the information from the specified movie.
     * @param {Movie} movie The movie.
     */
    static CreateMovieCard(movie)
    {
        // Create a copy of the movie card.

        // Return the element
    }

    static _GetHTMLTemplate() {
        return
        `
        <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
            <article class="card movie-item mx-auto">
                <div class="card-img-top"></div>
                <div class="card-body">
                    <h4 class="card-title font-weight-light">A Sunday in Hell</h4>
                    <p class="card-text">Year: 1922</p>
                    <p class="card-text">Genre: Sci-fi</p>
                    <a href="#">Add to favorites</a>
                    <a href="#" class="d-none">Remove from favorites</a>
                </div>

                <div class="movie-hover-description p-2">
                    <h1 class="font-weight-bold">Description</h1>
                    <p class="mt-2">Some crazy movie about some fake sci-fi. It is not even sci-fi.</p>
                </div>
            </article>
        </div>
        `;
    }
}