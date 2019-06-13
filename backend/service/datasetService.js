var datasetRepository = require('../repository/datasetRepository.js')
var q = require('q')
var _ = require('underscore-node')

var DatasetService = function() {

  this.create = function(datasetInfo) {
    var deferred = q.defer()
    datasetRepository
      .create(datasetInfo)
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

  this.terminate = function(datasetInfo) {
    var deferred = q.defer()
    datasetRepository
      .terminate(datasetInfo)
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

  this.getAll = function() {
    var deferred = q.defer()
    datasetRepository
      .getAll()
      .then(function(data) {
        deferred.resolve(data)
      })
      .catch(function(err) {
        deferred.reject({ errorMessage: err })
      })
    return deferred.promise
  }

}

module.exports = new DatasetService()
