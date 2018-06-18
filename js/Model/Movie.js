class Movie
{
    constructor(title, genre, year, author, description, imageUrl, isFavorite){
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.author = author;
        this.description = description;
        this.imageUrl = imageUrl;
        this.isFavorite = isFavorite;
    }
    
    static CreateTestData()
    {
        Movie.Instances['Sunday Drive'] = {
            title: 'Sunday Drive',
            genre: 'Horror',
            year: 2018,
            author: 'Jesper',
            description: 'A crazy sunday night, peacefully driving at night on a sunday. But something lurks in the shadows...',
            imageUrl: 'img/a_sunday_in_hell.bmp',
            isFavorite: false
        };

        Movie.Instances['Classy Gore'] = {
            title: 'Classy Gore',
            genre: 'Action',
            year: 2017,
            author: 'Jesper',
            description: 'Gory but classy.',
            imageUrl: 'img/they_live.bmp',
            isFavorite: false
        };

        this.SaveAll();
    }

    static SaveAll()
    {
        this.SetMovieDB(JSON.stringify(Movie.Instances));
    }

    static LoadAll()
    {
        if(GetMovieDB())
        {
            Movie.Instances = JSON.parse(GetMovieDB());
        }
        else
        {
            this.CreateTestData();
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