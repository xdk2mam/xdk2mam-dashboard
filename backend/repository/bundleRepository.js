var connectionService = require('./../service/connectionService.js')
var q = require('q')


var BundleRepository = function () {

    this.getRoot = function (id_bundle) {
        var query
        var deferred = q.defer()

        query = "SELECT root FROM bundles WHERE id = " + id_bundle      

        connectionService.getConnectionRequest(query, function (err, data) {
            if (err) {
                deferred.reject(err)
            } else {
                deferred.resolve(data[0].root)
            }
        })

        return deferred.promise
    }
}

module.exports = new BundleRepository()
