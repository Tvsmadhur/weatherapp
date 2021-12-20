
const request = require('request')



const forecast = (lat, long, callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=249681ff13f985895e23a7361f311e97&query=' + lat + ',' + long

    request({ url: url }, (error, response) =>
    {
        // console.log(response)
        if (error) {

            callback('unable to connect weather service', undefined)
        }
        else if (response.body.error) {
            callback('unable to find location', undefined)
        }
        else {
            const data = JSON.parse(response.body)
            //console.log('It is Currently' + " " + data.current.temperature + " " + 'degrees')
            callback(undefined, {
                temperature: data.current.temperature
            })
        }


    })
}

module.exports = forecast