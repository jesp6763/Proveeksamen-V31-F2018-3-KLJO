/**
 * Represents a movie card component.
 */
class MovieCard {
    /**
     * Initializes a new instance of the MovieCard class.
     * Appends a movie card element to specified parent, and subscribes the both button's onclick event.
     * @param {HTMLElement} parent The element to append this movie card to.
     * @param {Movie} movie The movie.
     */
    constructor(parent, movie) {
        parent.insertAdjacentHTML('afterbegin', MovieCard._GenerateHTMLString(movie));
        
        let movies = parent.getElementsByClassName('movie-item');

        this.mainElement = movies.item(0).parentElement;
        this.mainElement.querySelector('.card-img-top').style.backgroundImage = 'url(\'' + movie.img + '\')';
        this.buttons = {
            addToFavorites: this.mainElement.querySelector('.card-body > a'),
            removeFromFavorites: this.mainElement.getElementsByTagName('a')[1]
        }

        let _self = this;
        this.mainElement.querySelector('.card-body > a').addEventListener('click', function(){
            _self.AddToFavorites(_self, movie.title);
        });

        this.mainElement.getElementsByTagName('a')[1].addEventListener('click', function(){
            _self.RemoveFromFavorites(_self, movie.title);
        });

        if(movie.isFavorite)
        {
            this.buttons.addToFavorites.classList.add('d-none');
            this.buttons.removeFromFavorites.classList.remove('d-none');
        }
    }

    AddToFavorites(self, movieID) {
        Movie.Instances[movieID].isFavorite = true;
        MoviesPage.favoriteSection.appendChild(self.mainElement);

        self.buttons.addToFavorites.classList.add('d-none');
        self.buttons.removeFromFavorites.classList.remove('d-none');
        console.log("Added to favorites");
    }

    RemoveFromFavorites(self, movieID) {
        Movie.Instances[movieID].isFavorite = false;
        MoviesPage.allMoviesSection.appendChild(self.mainElement);

        self.buttons.addToFavorites.classList.remove('d-none');
        self.buttons.removeFromFavorites.classList.add('d-none');
        console.log("Removed from favorites");
    }

    /**
     * Creates a movie card element based on the information from the specified movie.
     * @param {Movie} movie The movie.
     */
    static _GenerateHTMLString(movie)
    {
        return `
        <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
            <article class="card movie-item mx-auto">
                <div class="card-img-top"></div>
                <div class="card-body">
                    <h1 class="card-title font-weight-light">${movie.title}</h1>

                    <ul class="list-unstyled">
                        <li><p class="card-text">Year: ${movie.year}</p></li>
                        <li><p class="card-text">Genre: ${movie.genres}</p></li>
                        <li><p class="card-text">Director: ${movie.director}</p></li>
                    </ul>

                    <a href="#" onclick>Add to favorites</a>
                    <a href="#" class="d-none">Remove from favorites</a>
                </div>

                <div class="movie-hover-description p-2">
                    <h1 class="font-weight-bold">Description</h1>
                    <hr class="m-0">
                    <p class="mt-2">${movie.description}</p>
                </div>
            </article>
        </div>
        `;
    }
}