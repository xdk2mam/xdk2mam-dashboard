var dataService = require('./../service/dataService.js')
var _ = require('underscore-node')

var DataController = function() {
  this.getData = function(req, res) {
    dataService
      .getData(req.query.timestamp)
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }

  this.getLast = function(req, res) {
    dataService
      .getLast(req.params.number)
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }

  this.putData = function(req, res) {
    var dataSensors = req.body
    dataService
      .putData(dataSensors)
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }
}

module.exports = new DataController()
