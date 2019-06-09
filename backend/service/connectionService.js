var mysql = require('mysql')
var dbConfig = require('../dbConfig.json')

var con = mysql.createConnection(dbConfig)

var ConnectionService = function() {
  this.getConnectionRequest = async function(query, callback) {
    con.query(query, function(err, data) {
      callback(err, data)
    })
  }
}

module.exports = new ConnectionService()
