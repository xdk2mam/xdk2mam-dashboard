var connectionService = require('./../service/connectionService.js')
var q = require('q')

var DataRepository = function () {
  this.putData = function (dataSensors) {
    var query
    var deferred = q.defer()

    query = "SELECT dataset_name_table FROM datasets WHERE status = 1 LIMIT 1"

    connectionService.getConnectionRequest(query, function (err, data) {
      if (err) {
        deferred.reject(err)
      } else {

        var queryInsert = "INSERT INTO " + data[0].dataset_name_table +
          " (timestamp,device,device_name,"

        var queryAux = ''

        dataSensors.xdk2mam.map(info => {

          switch (info.sensor) {

            case 'Environmental':
              queryInsert += " pressure,temperature,humidity,"
              queryAux += info.data[0].Pressure + "," + info.data[1].Temp + "," + info.data[2].Humidity
              break;
            case 'Accel':
              queryInsert += " accelerometer_x,accelerometer_y,accelerometer_z, "
              queryAux += info.data[0].x + "," + info.data[1].y + "," + info.data[2].z
              break;
            case 'Gyroscope':
              queryInsert += " gyroscope_x,gyroscope_y,gyroscope_z, "
              queryAux += info.data[0].x + "," + info.data[1].y + "," + info.data[2].z
              break;
            case 'Inertial':
              queryInsert += " inertial_x,inertial_y,inertial_z, "
              queryAux += info.data[0].x + "," + info.data[1].y + "," + info.data[2].z
              break;
            case 'Magnetometer':
              queryInsert += " magnetometer_x,magnetometer_y,magnetometer_z, "
              queryAux += info.data[0].x + "," + info.data[1].y + "," + info.data[2].z
              break;
            case 'Light':
              queryInsert += " light,"
              queryAux += info.data[0].milliLux
              break;
            case 'Acoustic':
              queryInsert += " acoustic,"
              queryAux += info.data[0].mp
              break;

          }
          queryAux += ','
        })

        const timestampNOW = parseInt(new Date().getTime() / 1000)
        
        var finalQuery = queryInsert + "on_tangle) VALUES (" + timestampNOW + ', 1, "' + dataSensors.device + '" , ' + queryAux + 0 + ")"

        connectionService.getConnectionRequest(finalQuery, function (err, dt) {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve({ id: dt.insertId, dataset_name_table: data[0].dataset_name_table })
          }
        })

      }
    })


    return deferred.promise
  }

  this.getLast = function (last) {
    var query
    var deferred = q.defer()

    query = 'SELECT * FROM information ' + 'WHERE tangle = 0 ' + 'ORDER BY id DESC LIMIT ' + last + ''

    connectionService.getConnectionRequest(query, function (err, data) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve(data)
      }
    })

    return deferred.promise
  }

  this.getData = function (id, interval, limit) {
    var query
    var deferred = q.defer()

    limit = limit === undefined || limit == '' ? 20 : limit

    query = "SELECT dataset_name_table FROM datasets WHERE id = " + id

    connectionService.getConnectionRequest(query, function (err, data) {
      if (err) {
        deferred.reject(err)
      } else {
        if (data.length > 0) {          
          const timestampNOW = parseInt(new Date().getTime() / 1000)
          //Receive interval in minutes, so...
          const intervalSec = interval * 60

          let queryInterval = ''

          if (intervalSec > 0)
            queryInterval = ' AND timestamp BETWEEN ' + (timestampNOW - intervalSec) + ' AND ' + timestampNOW
          else if (intervalSec === 0)
            queryInterval = ' '
          else
            queryInterval = ' AND on_tangle = 0'

          var querySelect = "SELECT * FROM " + data[0].dataset_name_table + " WHERE  1=1 " + queryInterval + ' LIMIT ' + limit          

          console.log(querySelect)
          connectionService.getConnectionRequest(querySelect, function (err, dt) {
            if (err) {
              deferred.reject(err)
            } else {     
              if(dt.length>0)        
                deferred.resolve(dt)
              else
                deferred.reject({ errorMessage: "No data was found." })
            }
            
          })
        } else
          deferred.reject({ errorMessage: "No data was found." })


      }
    })

    return deferred.promise
  }

  this.updateStatus = function (table, ids, idBundle) {
    var query
    var deferred = q.defer()

    query = "UPDATE " + table + " SET on_tangle = 1, bundle_id = " + idBundle + " WHERE id  IN  ( "

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      query += id
      if (i < ids.length - 1)
        query += ','
      else
        query += ')'
    }

    connectionService.getConnectionRequest(query, function (err, data) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve(data)
      }
    })

    return deferred.promise
  }

  this.updateFlag = function (table, ids) {
    var query
    var deferred = q.defer()

    query = "UPDATE " + table + " SET on_tangle = 1  WHERE id  IN  ( "

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      query += id
      if (i < ids.length - 1)
        query += ','
      else
        query += ')'
    }
    console.log(query)

    connectionService.getConnectionRequest(query, function (err, data) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve(data)
      }
    })

    return deferred.promise
  }


  this.createBundle = function (root) {
    var query
    var deferred = q.defer()

    const timestampNOW = parseInt(new Date().getTime() / 1000)

    query = "INSERT INTO bundles (timestamp,id_bundle,root) VALUES (" + timestampNOW + ',' + null + ',"' + root + '")'


    connectionService.getConnectionRequest(query, function (err, data) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve({ idBundle: data.insertId, timestamp: timestampNOW })
      }
    })

    return deferred.promise
  }

}

module.exports = new DataRepository()
