var connectionService = require('./../service/connectionService.js')
var q = require('q')

var DatasetRepository = function() {
  this.create = function(dataset) {
    var query
    var deferred = q.defer()

    const timestamp = parseInt(new Date().getTime() / 1000)

    query =
      'CREATE TABLE IF NOT EXISTS `' +
      dataset.name +
      '` (' +
      '`id` int(11) AUTO_INCREMENT NOT NULL,' +
      '`timestamp` int(11) NOT NULL,' +
      '`device` tinyint(2) NOT NULL,' +
      '`device_name` varchar(50) NOT NULL,' +
      '`pressure` int(11)  NULL,' +
      '`temperature` int(11)  NULL,' +
      '`humidity` int(11)  NULL,' +
      '`accelerometer_x` int(11)  NULL,' +
      '`accelerometer_y` int(11)  NULL,' +
      '`accelerometer_z` int(11)  NULL,' +
      '`gyroscope_x` int(11)  NULL,' +
      '`gyroscope_y` int(11)  NULL,' +
      '`gyroscope_z` int(11)  NULL,' +
      '`inertial_x` int(11)  NULL,' +
      '`inertial_y` int(11)  NULL,' +
      '`inertial_z` int(11)  NULL,' +
      '`magnetometer_x` int(11)  NULL,' +
      '`magnetometer_y` int(11)  NULL,' +
      '`magnetometer_z` int(11)  NULL,' +
      '`light` int(11)  NULL,' +
      '`acoustic` int(11)  NULL,' +
      '`latitude` decimal(10,8)  NULL,' +
      '`longitude` decimal(11,8)  NULL,' +
      '`bundle_id` int(11)  NULL,' +
      '`on_tangle` tinyint(1) NOT NULL,' +
      'PRIMARY KEY (`id`),' +
      'FOREIGN KEY (`bundle_id`) REFERENCES bundles(`id`)' +
      ')DEFAULT CHARSET=utf8mb4;'

    connectionService.getConnectionRequest(query, function(err, data) {
      if (err) {
        deferred.reject(err)
      } else {
        const queryInsert =
          'INSERT INTO `datasets`' +
          '(`dataset_name_table`, `dataset_desc`, `status`, `dataset_start`, `dataset_end`, `dataset_interval`) VALUES' +
          "('" +
          dataset.name +
          "', '" +
          dataset.description +
          "', 1, " +
          timestamp +
          ',' +
          dataset.datasetEnd +
          ', ' +
          dataset.datasetInterval +
          ');'

        connectionService.getConnectionRequest(queryInsert, function(err, dt) {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve({ id: dt.insertId, ...dataset, timestamp })
          }
        })
      }
    })

    return deferred.promise
  }

  this.terminate = function(dataset) {
    var query
    var deferred = q.defer()
    const timestamp = parseInt(new Date().getTime() / 1000)

    query =
      'UPDATE `datasets` SET ' + '`status` = 0 , `dataset_end` = ' + timestamp + ' WHERE `id` = ' + dataset.id + ';'

    connectionService.getConnectionRequest(query, function(err, data) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve({ ...dataset, status: 0, end: timestamp })
      }
    })

    return deferred.promise
  }

  this.getAll = function() {
    var query
    var deferred = q.defer()

    query = 'SELECT * FROM `datasets`'

    connectionService.getConnectionRequest(query, function(err, data) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve(data)
      }
    })

    return deferred.promise
  }
}

module.exports = new DatasetRepository()
