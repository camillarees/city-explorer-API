'use strict';

// requires are similar to imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weatherData = require('./data/weather.json');
const { response } = require('express');

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
const lat = request.query.lat;
const lon = request.query.lon;
const searchQuery = request.query.searchQuery;
console.log('query parameter: ', request.query);
console.log('searchQuery: ', searchQuery);
const weather = new Forecast(searchQuery);
const cityName = weather.getWeather();
// response.send('testing weather endpoint') // this is going to change
response.status(200).send(cityName);
} catch(error) {
   
    next(error)
}
});

class Forecast {
    constructor (searchQuery) {
        // find method to find the type of list we want to return
        let { city_name, data } = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
        this.cityName = city_name; 
        this.weather = data;
    };

// method that gets just the name and desc properties from our item objects
getWeather() {
    return this.weather.map(day => ({
        forecast: day.weather.description,
        date: day.datetime
    }));
}
}

app.get('/fakeError', (request, response, next) => {
    try {
        const nonexistentData = require('./nonexistentData/js');
        response.send(nonexistentData);
    } catch(error) {
        next(error.message);
    }
    // error handling middleware must be the last app.use() defined in the server file
    app.use((error, request, response, next) => {
        console.log(error);
        response.status(500).send(error);
    });
})


// this line of code needs to be the last line in the file
// listen tells our app which port to listen on
// which port ot serve our server on
app.listen(PORT, console.log(`listening on PORT ${PORT}`));


