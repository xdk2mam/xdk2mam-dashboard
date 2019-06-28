var eventService = require('../service/eventService.js')
var _ = require('underscore-node')

var EventController = function() {
  this.putEvent = function(req, res) {

    //id_dataset,value,type_sensor

    eventService
      .putEvent(req.body)
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(400).send(err)
      })
  }

}

module.exports = new EventController()
