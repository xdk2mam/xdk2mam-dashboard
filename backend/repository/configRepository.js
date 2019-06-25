var connectionService = require('./../service/connectionService.js')
var q = require('q')

var ConfigRepository = function () {


    this.update = function (info, prop) {
        var query
        var deferred = q.defer()

        query =
            'UPDATE `config` SET ' + prop + '=' + '"'+info+'"';

        connectionService.getConnectionRequest(query, function (err, data) {
            if (err) {
                deferred.reject(err)
            } else {
                deferred.resolve({ status: 200 })
            }
        })

        return deferred.promise
    }

    this.get = function () {
        var query
        var deferred = q.defer()

        query = 'SELECT * FROM `config` LIMIT 1'

        connectionService.getConnectionRequest(query, function (err, data) {
            if (err) {
                deferred.reject(err)
            } else {
                deferred.resolve(data)
            }
        })

        return deferred.promise
    }
}

module.exports = new ConfigRepository()
