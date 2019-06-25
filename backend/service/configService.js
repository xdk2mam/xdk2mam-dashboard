var configRepository = require('../repository/configRepository.js')
var q = require('q')

var ConfigService = function() {

  this.updateFullNode = function(fullnode) {
    var deferred = q.defer()
    configRepository
      .update(fullnode,"fullnode")
      .then(function(data) {
        deferred.resolve(data)
        console.log('Inputting Data: ', data)
      })
      .catch(function(err) {
        deferred.reject({ errorMessage: err })
        console.log('Inputting Data: ', err)
      })
    return deferred.promise
  }

  this.updateEmail = function(email) {
    var deferred = q.defer()
    configRepository
      .update(email,"email")
      .then(function(data) {
        deferred.resolve(data)
        console.log('Inputting Data: ', data)
      })
      .catch(function(err) {
        deferred.reject({ errorMessage: err })
        console.log('Inputting Data: ', err)
      })
    return deferred.promise
  }

  this.updateExplorer = function(explorer) {
    var deferred = q.defer()
    configRepository
      .update(explorer,"explorer")
      .then(function(data) {
        deferred.resolve(data)
        console.log('Inputting Data: ', data)
      })
      .catch(function(err) {
        deferred.reject({ errorMessage: err })
        console.log('Inputting Data: ', err)
      })
    return deferred.promise
  }

  this.get = function() {
    var deferred = q.defer()
    configRepository
      .get()
      .then(function(data) {
        deferred.resolve(data)
      })
      .catch(function(err) {
        deferred.reject({ errorMessage: err })
      })
    return deferred.promise
  }
}

module.exports = new ConfigService()
