const request = require('request')

const geocode = (address, callback) => {

    // MapboxAPI URL for geocoding
    // handles special character encoding
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXp1bmlnYXMiLCJhIjoiY2t5ZG9xNGRhMDJvdjJ2cXBnMzRpMHdobiJ9.0-AREiAaKwanNCENmuehuw&limit=1`

    request(
        // Request options configuration
        {
            url,
            json: true
        },
        // Sends request off to Mapbox API
        (error, {body}) => {
            if (error) {
                callback('Unable to connect to Mapbox API!', undefined)
            }
            else if (body.features.length === 0) {
                callback('Unable to find location. Try another search.', undefined)
            }
            else {
                callback(undefined, {
                    location: body.features[0].place_name,
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0]
                })
            }
        })
}

module.exports = geocode
