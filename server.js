'use strict';

// requires are similar to imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

// const weatherData = require('/weather');
// const movieData = require('/movies')

// create an instance of an Express server
const app = express();

// middleware - tells our express app to use cors
app.use(cors());

// set out PORT variable to tell our Express app where to serve our server
const PORT = process.env.PORT || 3002;

// define the "home" route (endpoint)
app.get('/', (request, response) => {
    response.send('test');

});

// define an endpoint that gets the weather data and returns it to React
app.get('/weather', async (request, response, next) => {
    const lat = request.query.lat;
    const lon = request.query.lon;
    // console.log(lat, lon);
    try {
        //grab the searchQuery from the request object 
        // baseURL, endpoint, query, queryParameters
        const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=5&key=21634fd4e5154fb5a84ae23da4570a59`
        const weatherResponse = await axios.get(weatherURL);
        console.log(weatherResponse.data.data[0]);
        const weatherArray = weatherResponse.data.data.map(forecast => new Forecast(forecast));

        response.status(200).send(weatherArray);
    } catch (error) {
        next(error.message);
    }
});

class Forecast {
    constructor(forecast) {
        // find method to find the type of list we want to return
        this.date = forecast.datetime;
        this.description = forecast.weather.description;
    };

}

app.get('/movies', async (request, response, next) => {
    const movie = request.query.city;
    console.log(movie);
    try {
        const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=c0954586125a696f1e442215a8fb87dc&query=seattle`
        const movieResponse = await axios.get(moviesURL);
        const movieArray = movieResponse.data.results.map(movie => new Movie(movie));
        console.log(movieResponse.data);
        response.status(200).send(movieArray);
    } catch (error) {
        next(error.message);
    }
}
);

class Movie {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.averageVotes = movie.vote_average;
        this.totalVotes = movie.vote_count;
        this.imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        this.popularity = movie.popularity;
        this.releasedDate = movie.release_date;
    }
}

app.get('/fakeError', (request, response, next) => {
    try {
        const nonexistentData = require('./nonexistentData/js');
        response.send(nonexistentData);
    } catch (error) {
        next(error.message);

    }
}
)

// error handling middleware must be the last app.use() defined in the server file
app.use((error, request, response, next) => {
    console.log(error);
    response.status(500).send(error);
});


// this line of code needs to be the last line in the file
// listen tells our app which port to listen on
// which port ot serve our server on
app.listen(PORT, console.log(`listening on PORT ${PORT}`));


