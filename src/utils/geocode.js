
const request = require('request')
const geocode = (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidHZzbWFkaHVyIiwiYSI6ImNrd2M5eTgzYjBpbHYydm4yb2ExMzE3bG4ifQ.OvcPGCLuqm05Bhh55Q7Qyw'
    request({ url: url, json: true }, (error, response) =>
    {
        if (error) {
            callback('unable to connect to location service', undefined)
        }
        else if (response.body.features.length == 0) {
            callback('unable to find location', undefined)
        }
        else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
            console.log(response.body.features[0])
        }
    })

}
module.exports = geocode