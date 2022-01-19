const request = require('request')

const forecast = (latitude, longitude, callback) => {

    // WeatherStack API URL
    const url = `http://api.weatherstack.com/current?access_key=f046cbeda4189860c61564b61b51973a&query=${latitude},${longitude}&units=f`

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
                callback(undefined, `The current temperature is ${body.current.temperature} ${'\u2109'} but feels like ${body.current.feelslike} ${'\u2109'}. The weather is ${body.current.weather_descriptions[0]}. There is ${body.current.precip}% of rain!`)
            }
        })
}

module.exports = forecast