var datasetService = require('./../service/datasetService.js')
var _ = require('underscore-node')

var DatasetController = function() {

  this.createDataset = function(req, res) {
    var datasetInfo = req.body
    datasetService
      .create(datasetInfo)
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }

  this.terminateDataset = function(req, res) {
    var datasetInfo = req.body
    datasetService
      .terminate(datasetInfo)
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }

  this.getDatasets = function(req, res) {
    datasetService
      .getAll()
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }
}

module.exports = new DatasetController()
