var express = require('express');
var router = express.Router({ mergeParams: true });
var dataController = require('../controller/dataController');

router.get('/', function (req, res) {
	console.log(req.params.number)
    dataController.getLast(req, res);
});

module.exports = router;
