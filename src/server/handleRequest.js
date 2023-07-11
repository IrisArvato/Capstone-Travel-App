const axios = require('axios');

// Setup empty JS object to act as endpoint for all routes
exports.projectData = [];

exports.searchLocation = async (req, res) => {
    const data = {};
    console.log(req.body);
    const location = req.body.location;
    const travelDate = req.body.travelDate;

    try {
        
        const geoname = await getGeonames(location);
        let locImage = await getPhotoFromPixabay(location);

        data.travelDate = travelDate;
        
        if (geoname != null) {
            data.lat = geoname.lat;
            data.lng = geoname.lng;
            data.name = geoname.name;
            data.countryCode = geoname.countryCode;
            data.countryName = geoname.countryName;
 
            let weatherData = await getWeatherbitData(data.lat, data.lng, travelDate);
            data.weather = weatherData;

            if (locImage != null) {
                data.imgURL = locImage.webformatURL;
                data.previewURL = locImage.previewURL;
            }

            if (locImage != null) {
                data.imgURL = locImage.webformatURL;
                data.previewURL = locImage.previewURL;
            }
            else {
                // Use some random travel photo if no photo available
                locImage = await getPhotoFromPixabay('travel');
                data.imgURL = locImage.webformatURL;
                data.previewURL = locImage.previewURL;
            }

            if (this.projectData.length >= 3) {
                this.projectData.pop();
            }

            this.projectData.unshift(data);

            res.status(200).send(data);

            return;
        }

        res.status(204).send('No content');
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

// API to get sample of image for the location
const getPhotoFromPixabay = async (location) => {

    const baseUrl = 'https://pixabay.com/api/?lang=en&image_type=photo&category=places';
    const key = '&key=' + process.env.PIXABY_KEY;
    const loc = '&q=' + location;

    try {
        
        const respond = await axios(baseUrl + key + loc);
        const data = respond.data;

        return data.hits[0];
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

    return null;
}

// API to get lattitute and longitute by location name
const getGeonames = async (location) => {
    const baseUrl = `http://api.geonames.org/searchJSON?&maxRows=1`;
    const key = '&username=' + process.env.GEONAMES_USERNAME;
    const loc = '&q=' + location;

    try {
        
        const respond = await axios(baseUrl + key + loc);
        const data = respond.data;

        if (data.totalResultsCount >= 1) {
            return data.geonames[0];
        }

    } catch (e) {
        console.log(e);
    }

    return null;
}

// API to get weather current & forecast
getWeatherbitData = async (latitude, longitude, date) => {
    let weatherData = {};
    let today = new Date();   
    today.setHours(0,0,0,0);
    
    let travelDate = new Date(date);   
    travelDate.setHours(0,0,0,0);

    let validTravelDate = `${travelDate.getFullYear()}-${(travelDate.getMonth() + 1).toString().padStart(2, '0')}-${travelDate.getDate()}`;

    const milliseconds = travelDate - today;
    var days = Math.floor( milliseconds / (1000 * 60 * 60 * 24));

    if (days < 17) {
        
        console.log('Get forecast weather');

        const url = `https://api.weatherbit.io/v2.0/forecast/daily?days=16&units=M`
        const loc = `&lat=${latitude}&lon=${longitude}`
        const key = `&key=${process.env.WEATHERBIT_KEY}`

        const response = await axios(url + loc + key)
        try {
            const data = await response.data;

            data.data.forEach( function(each) {
                if (each.valid_date == validTravelDate) {
                    weatherData =  {
                        date: each.valid_date,
                        max_temp: each.max_temp,
                        min_temp: each.min_temp,
                        description: each.weather.description,
                     }
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    // Get current weather
    if (days == 0) {
        console.log('Get today weather');
        
        try {

            const url = `https://api.weatherbit.io/v2.0/current?units=M`
            const loc = `&lat=${latitude}&lon=${longitude}`
            const key = `&key=${process.env.WEATHERBIT_KEY}`

            const response = await axios(url + loc + key);
            const data = await response.data;
            
            const todayWeather = data.data[0];
            weatherData.current_temp = todayWeather.temp;
            weatherData.current_description = todayWeather.weather.description;

        } catch (error) {
            console.log(error)
        }
    }


    return weatherData;
}