const request = require('request')

const forecast = (latitude, longitude, callback) => {

    // WeatherStack API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=38b4c532f4a6a31040d743c1aeaf9265&units=imperial`

    request(
        {
            url,
            json: true
        },

        (error, {body}) => {
            if (error) {
                callback('Unable to connect to WeatherStack API!', undefined)
            }
            else if (body.error) {
                callback('Unable to get weather for given location. Try another search.', undefined)
            }
            else {
                callback(undefined, `The current temperature is ${body.main.temp} ${'\u2109'} but feels like ${body.main.feels_like} ${'\u2109'}. The weather is ${body.weather[0].main} with ${body.weather[0].description}.`)
            }
        })
}

module.exports = forecast