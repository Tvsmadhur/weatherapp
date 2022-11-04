
const express = require('express')
const path = require('path');
const hbs = require('hbs');
const app = express()
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
const pubilcdir = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath);

hbs.registerPartials(partialsPath)
app.use(express.static(pubilcdir))


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather-App',
    name: 'madhur'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'madhur'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'madhur'
  })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(lat, long, (error, forecastdata) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastdata,
        location,
        address: req.query.address
      })
    })
  })
  // else {
  //   return res.send({
  //     location: 'India',
  //     address: req.query.address
  //   })
  // }


})
// comment lines
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  else {
    return res.send({
      products: []
    })
  }


})
app.get('help/*', (req, res) => {
  res.send('Help article not found')
})
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Madhur',
    errorMessage: 'Page Not Found'
  })
})



app.listen(3000)
