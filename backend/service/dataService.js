
var dataRepository = require('../repository/dataRepository.js');
var q = require('q');
var _ = require('underscore-node');



var DataService = function () {

    this.getData = function (timestamp) {
        var deferred = q.defer();
        dataRepository.getData(timestamp)
            .then(function (data) {
                deferred.resolve(data);
            })
            .catch(function (err) {
                deferred.reject({ errorMessage: err });
            });
        return deferred.promise;
    };

     this.getLast= function (last) {
        var deferred = q.defer();
        dataRepository.getLast(last)
            .then(function (data) {
                deferred.resolve(data);
            })
            .catch(function (err) {
                deferred.reject({ errorMessage: err });
            });
        return deferred.promise;
    };

    this.putData = function (dataSensors) {
        var deferred = q.defer();
        dataRepository.putData(dataSensors)
            .then(function (data) {
                deferred.resolve(data);
            })
            .catch(function (err) {
                deferred.reject({ errorMessage: err });
            });
        return deferred.promise;
    };


};

module.exports = new DataService();

