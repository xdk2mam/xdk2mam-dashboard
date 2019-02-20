var express = require('express');
var router = express.Router({ mergeParams: true });
var dataController = require('../controller/dataController');

router.post('/', function (req, res) {
    dataController.putData(req, res);
});

module.exports = router;
