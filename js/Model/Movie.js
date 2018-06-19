class Movie
{
    constructor(slots){
        this.id = slots.id;
        this.title = slots.title;
        this.genres = slots.genres;
        this.year = slots.year;
        this.director = slots.director;
        this.description = slots.description;
        this.img = slots.img;
        this.isFavorite = slots.isFavorite;
    }
    
    static CreateTestData(callback)
    {
        let xhttpRequest = new XMLHttpRequest();
        xhttpRequest.overrideMimeType("application/json");

        xhttpRequest.open('GET', 'movies.json', true);

        xhttpRequest.onreadystatechange = function(){
            if(xhttpRequest.readyState == 4){
                if(xhttpRequest.status == "200"){
                    Movie.Instances = JSON.parse(xhttpRequest.responseText);
                    Movie.SaveAll();
                    callback();
                }
            }
        }

        xhttpRequest.send(null);
    }

    static SaveAll()
    {
        this._SetMovieDB(JSON.stringify(Movie.Instances));
    }

    static LoadAll(onLoaded)
    {
        if(this._GetMovieDB())
        {
            Movie.Instances = JSON.parse(this._GetMovieDB());
            onLoaded();
            console.log("Loaded.");
        }
        else
        {
            this.CreateTestData(function(){
                onLoaded();
                console.log("Test data created.");
            });
        }
    }

    /**
     * Returns the movie db local storage.
     */
    static _GetMovieDB(){
        return localStorage['MovieDB'];
    }

    /**
     * Sets the value of movie local storage.
     * @param {string} value The data to save in the movie local storage.
     */
    static _SetMovieDB(value){
        localStorage['MovieDB'] = value;
    }
}

Movie.Instances = {};