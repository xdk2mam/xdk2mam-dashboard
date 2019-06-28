var putData = require('./putData.js')
var getData = require('./getData.js')
var getLast = require('./getLast.js')
var dataset = require('./dataset.js')
var config = require('./config.js')
var event = require('./event.js')
var express = require('express')
var router = express.Router({ mergeParams: true })

router.use('/putData', putData)
router.use('/getData', getData)
router.use('/dataset', dataset)
router.use('/userConfig', config)
router.use('/event', event)
// router.use('/publish', publish)

//OLD
router.use('/getLast/:number', getLast)


module.exports = router
