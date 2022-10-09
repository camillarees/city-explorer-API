'use strict';

// requires are similar to imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const data = require('./data/weather.json');
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
app.get('/weather', (request, response) => {
//grab the searchQuery from the request object
// notice that query parameter is named type
// type is the name of query parameter we must send along with Axios from React in order to ask for data from our server 
const type = request.query.seattle;
console.log('query parameter: ', request.query);
console.lof('type: ', type);
response.send('testing weather endpoint') // this is going to change
const weather = new Data(type);
const cityName = weather.getItems();
response.status(200).send(cityName);
} catch(error) {
    //next can be used to pass...
    next(error)
});

class Data {
    constructor {type}{
        // find method to find the type of list we want to return
        let {cityName, lon, lat } = data.data.find(data => data.city_name === type);
        this.type = cityName 
        this.lon = lon;
        this.lat = lat;
    }
};

// method that gets just the name and desc properties from our item objects
getItems() {
    return this.itemValues.map(item => {{
        lon: this.cityName.lon
        lat: this.cityName.lat
    }});
}

app.get('/fakeError')
try {
    const nonexistentData = require('./nonexistentData/js');
    response.send(nonexistentData);
} catch(error) {
    next(error.message);
}

// error handling middleware must be the last app.use() defined in the server file
app.use(error, request, response, next) => {
    console.log(error);
    response.status(500).send(error);
}

// this line of code needs to be the last line in the file
// listen tells our app which port to listen on
// which port ot serve our server on
app.listen(PORT, console.log(`listening on PORT ${PORT}`));


