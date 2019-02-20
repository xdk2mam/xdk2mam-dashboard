
var level = require('level')
var xdk2mamDB = level('xdk2mam-db')
const delay = require('delay');
var moment = require('moment')



var ConnectionService = function () {

    this.getDataOfLevelDb = function (key, callback) {
        xdk2mamDB.get(key, function (err, value) {
            if (err) return callback({ error: "key does not exist" });
            var info = value;          
            return callback(err, { key, info });
        })
    }

    this.getLast = function (last, callback) {

        var date = moment().utc().format('MM/DD/YYYY')
        var info = []

        xdk2mamDB.get(date, async function (err, value) {            

            if (err) return callback({ error: "key does not exist" });

            var list = JSON.parse(value)            
            
            for(var i=0;i<list.timestamps.length;i++){
                
                await xdk2mamDB.get(list.timestamps[i].toString(), function (err, read) {
                    if (err) return callback({ error: "key does not exist" });                    
                    info.push(read)
                    
                })

            }
            await delay(1)
            return callback(err, { info })
        })
    }


    this.putDataIntoLevelDb = function (key, data, callback) {
        var date = moment.unix(key).utc().format('MM/DD/YYYY');
        var existingValues;

        console.log(date)

        xdk2mamDB.get(date, function (err, value) {
            if (err){
                var list = {timestamps: [key]}
                xdk2mamDB.put(date, JSON.stringify(list), function (err) {
                    if (err) console.log('Ooops!', err)
                    console.log(list)  

                })                
            }else{
                var list = JSON.parse(value)                
                if(list.timestamps.indexOf(key)==-1)
                    list.timestamps.push(key)  


                xdk2mamDB.put(date, JSON.stringify(list), function (err) {
                    if (err) console.log('Ooops!', err)                     
                    console.log(list)
                })          
            }            
            
        })

        data.inTangle = false;
        xdk2mamDB.put(key.toString(), JSON.stringify(data), function (err) {
            if (err) console.log('Ooops!', err)
            return callback(err, { key });
        })
    }

};

module.exports = new ConnectionService();
