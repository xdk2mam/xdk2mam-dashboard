var express = require('express');
var router = express.Router({ mergeParams: true });
var eventController = require('../controller/eventController');

router.post('/', function (req, res) {
    eventController.putEvent(req, res);
});



module.exports = router;
