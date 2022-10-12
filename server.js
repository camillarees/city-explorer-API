'use strict';

// requires are similar to imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weatherData = require('/weather');
const movieData = require('/movies')

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
app.get('/weather', (request, response, next) => {
    try {
//grab the searchQuery from the request object
// notice that query parameter is named type
// type is the name of query parameter we must send along with Axios from React in order to ask for data from our server 
// baseURL, endpoint, query, queryParameters
const weatherURL = `https://api.weatherbit.io/v2.0/current?key=21634fd4e5154fb5a84ae23da4570a59&lat=38.123&lon=-78.543`
const weatherResponse = await axios.get(weatherUrl);
const weatherArray = weatherResponse.data.map(forecast => new Forecast(forecast));
const cityName = weather.getWeather();

response.status(200).send(cityName);
} catch(error) {
    next(error.message);
}
});

app.get('/movies', (request, response, next) => {
    try {
        const moviesURL = `https://api.themoviedb.org/3/movie/76341?api_key=c0954586125a696f1e442215a8fb87dc&query=seattle`
        const movieResponse = await axios.get(moviesURL);
        const movieArray = movieResponse.data.map(movie => new Movie (movie));
    } catch (error) {
        next(error.message);
    }}
);


class Forecast {
    constructor (forecast) {
        // find method to find the type of list we want to return
        let { lat, lon, city_name, data } = weatherResponse.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
        this.cityName = forecast.city_name; 
        this.lat = forecast.data.lat;
        this.lon = forecast.data.lon;
    };


// method that gets just the name and desc properties from our item objects
getWeather() {
    return this.forecast.map(day => ({
        forecast: day.weather.description,
        date: day.datetime
    }));
}
}

class Movies {
    constructor (movie) {
        this.movie = [{}]
    }
};

getMovies() {
    return this.movies.data.map(movie => ({
        movies: this.movies.data
    }))
}

app.get('/fakeError', (request, response, next) => {
    try {
        const nonexistentData = require('./nonexistentData/js');
        response.send(nonexistentData);
    } catch(error) {
        next(error.message);
    
        }
    }

    // error handling middleware must be the last app.use() defined in the server file
    app.use((error, request, response, next) => {
        console.log(error);
        response.status(500).send(error);
    });
)


// this line of code needs to be the last line in the file
// listen tells our app which port to listen on
// which port ot serve our server on
app.listen(PORT, console.log(`listening on PORT ${PORT}`));


