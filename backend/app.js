var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var main = require('./route/main.js')
var headers = require('./middleware/headers.js')
var compression = require('compression')
var dataService = require('./service/dataService')
var port = 8081

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

var app = express()

app.use(morgan('dev'))
app.use(headers)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())
app.use('/api', main)

setInterval(() => dataService.publish(), 5000)

app.listen(port, function() {
  console.log('xdk2mam API on: http://localhost:' + port)
})
