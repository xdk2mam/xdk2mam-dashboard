var eventRepository = require('../repository/eventRepository.js')
var q = require('q')

var EventService = function () {

  this.putEvent = function (info) {
    var deferred = q.defer()
    const data = { id_dataset: info.id_dataset, value: info.value, operator: info.operator }
    eventRepository
      .put(data, info.type_sensor)
      .then(function (data) {
        deferred.resolve(data)
        console.log('Inputting Data: ', data)
      })
      .catch(function (err) {
        deferred.reject({ errorMessage: err })
        console.log('Inputting Data: ', err)
      })
    return deferred.promise
  }
}

module.exports = new EventService()
