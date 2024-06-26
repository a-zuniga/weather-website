const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alejandro Zuniga'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: 'Alejandro Zuniga',
        occupation: 'Software Engineer'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {

        if (error) {
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            
            return res.send({
                location, 
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Alejandro Zuniga",
        message: "Run into any issues using the application?",
        admin_email: "azunigas [at] gmu [dot] edu"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        name: "Alejandro Zuniga",
        error_message: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        name: "Alejandro Zuniga",
        error_message: "Page not found."
    })
})

app.listen(port, () => {
    console.log("Starting server on port 3000")
})