var connectionService = require('./../service/connectionService.js')
var q = require('q')

var EventRepository = function () {


    this.put = function (data, prop) {
        var query
        var deferred = q.defer()
        query = 'INSERT INTO `events` (id_dataset,value,type_sensor,operator) '
        query += 'VALUES(' + data.id_dataset + ',' + data.value + ', ' + prop + ', "'+ data.operator+ '")';

        connectionService.getConnectionRequest(query, function (err, data) {
            if (err) {
                deferred.reject(err)
            } else {
                deferred.resolve({ status: 200 })
            }
        })

        return deferred.promise
    }

}

module.exports = new EventRepository()
