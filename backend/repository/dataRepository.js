
var connectionService = require('./../service/connectionService.js');
var q = require('q');

var DataRepository = function () {


    this.putData = function (dataSensors) {
        var query;
        var deferred = q.defer();

        query = "INSERT INTO information "+
                "(data, tangle)" +
                " VALUES ('"+JSON.stringify(dataSensors)+"', "+ 0 +")";

        connectionService.getConnectionRequest(query, function(err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    };

    
    this.getLast = function (last) {
        var query;
        var deferred = q.defer();

        query = "SELECT * FROM information "+
                "WHERE tangle = 0 "+
                "ORDER BY id DESC LIMIT "+last+"";

        connectionService.getConnectionRequest(query, function(err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    };

};

module.exports = new DataRepository();
