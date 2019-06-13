var express = require('express');
var router = express.Router({ mergeParams: true });
var dataController = require('../controller/dataController');

router.get('/', function (req, res) {
    dataController.startPublish(req, res);
});

module.exports = router;
