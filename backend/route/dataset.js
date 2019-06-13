var express = require('express');
var router = express.Router({ mergeParams: true });
var datasetController = require('../controller/datasetController');

router.post('/create', function (req, res) {
    datasetController.createDataset(req, res);
});

router.post('/terminate', function (req, res) {
    datasetController.terminateDataset(req, res);
});

router.get('/get', function (req, res) {
    datasetController.getDatasets(req, res);
});

module.exports = router;
