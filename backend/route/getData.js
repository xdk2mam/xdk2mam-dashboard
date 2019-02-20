var express = require('express');
var router = express.Router({ mergeParams: true });
var dataController = require('../controller/dataController');

router.get('/', function (req, res) {
    dataController.getData(req, res);
});

module.exports = router;
