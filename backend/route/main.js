
var putData = require('./putData.js');
var getData = require('./getData.js');
var getLast = require('./getLast.js');
var express = require('express');
var router = express.Router({ mergeParams: true });

router.use('/putData', putData);
router.use('/getData', getData);
router.use('/getLast/:number', getLast);

module.exports = router;
