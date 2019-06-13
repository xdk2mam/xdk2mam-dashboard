var dataService = require('./../service/dataService.js')
var _ = require('underscore-node')

var DataController = function() {
  this.getData = function(req, res) {

    const { id, interval } = req.params
    const limit = req.query.limit
    dataService
      .getData(id,interval,limit)
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

  this.startPublish = function(req, res) {

    dataService
      .publish()
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }

}

module.exports = new DataController()
