var express = require('express');
var router = express.Router({ mergeParams: true });
var configController = require('../controller/configController');

router.post('/fullnode', function (req, res) {
    configController.updateFullNode(req, res);
});

router.post('/email', function (req, res) {
    configController.updateEmail(req, res);
});

router.post('/explorer', function (req, res) {
    configController.updateExplorer(req, res);
});

router.get('/', function (req, res) {
    configController.getConfig(req, res);
});

module.exports = router;
