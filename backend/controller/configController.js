var configService = require('../service/configService.js')
var _ = require('underscore-node')

var ConfigController = function() {
  this.updateFullNode = function(req, res) {

    const { fullNode } = req.body

    console.log(fullNode)

    configService
      .updateFullNode(fullNode)
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }

  this.updateEmail = function(req, res) {

    const { email } = req.body
    
    configService
      .updateEmail(email)
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }


  this.updateExplorer = function(req, res) {

    const { explorer } = req.body
    
    configService
      .updateExplorer(explorer)
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }


  this.getConfig = function(req, res) {
    configService
      .get()
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }

}

module.exports = new ConfigController()
