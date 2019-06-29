var mysql = require('mysql')
var config = require('../config.json')

var con = mysql.createConnection(config)

var ConnectionService = function() {
  this.getConnectionRequest = async function(query, callback) {
    con.query(query, function(err, data) {
      callback(err, data)
    })
  }
}

module.exports = new ConnectionService()
