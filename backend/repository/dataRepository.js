
var connectionService = require('./../service/connectionService.js');
var q = require('q');

var DataRepository = function () {

    this.getData = function (timestamp) {
        var deferred = q.defer();
        const key = timestamp
        connectionService.getDataOfLevelDb(key, function (err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    };

    this.getLast = function (last) {
        var deferred = q.defer();
        connectionService.getLast(last, function (err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    };



    this.putData = function (dataSensors) {
        var deferred = q.defer();
        const key = dataSensors.timestamp
        const info = dataSensors
        connectionService.putDataIntoLevelDb(key, info, function (err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve({ key });
            }
        });
        return deferred.promise;
    };


};

module.exports = new DataRepository();
