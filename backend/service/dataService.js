var dataRepository = require('../repository/dataRepository.js')
var bundleRepository = require('../repository/bundleRepository.js')
var datasetService = require('./datasetService.js')
var configService = require('./configService.js')
const { publishData } = require('../utils/iotaUtils')
const { convertToFrontFormat } = require('../utils/dataDTO')

var q = require('q')
var _ = require('underscore-node')

var DataService = function () {
  this.getData = async function (id, interval, limit) {
    var deferred = q.defer()

    dataRepository
      .getData(id, interval, limit)
      .then(async function (data) {
        var dataList = []
        for (let i = 0; i < data.length; i++) {
          const info = data[i]
          let sensorData = await convertToFrontFormat(info)
          let root = null
          if (info.on_tangle === 1 && info.bundle_id != null) root = await bundleRepository.getRoot(info.bundle_id)

          dataList.push({ ...sensorData, root })
        }
        deferred.resolve(dataList)
      })
      .catch(function (err) {
        deferred.reject({ errorMessage: err })
      })
    return deferred.promise
  }

  this.getLast = function (last) {
    var deferred = q.defer()

    dataRepository
      .getLast(last)
      .then(function (data) {
        deferred.resolve(data)
      })
      .catch(function (err) {
        deferred.reject({ errorMessage: err })
        console.log('Error in dataService:', err)
      })
    return deferred.promise
  }

  this.putData = function (dataSensors) {
    var deferred = q.defer()
    dataRepository
      .putData(dataSensors)
      .then(function (data) {
        deferred.resolve(data)
        console.log('Inputting Data: ', data)
      })
      .catch(function (err) {
        deferred.reject({ errorMessage: err })
        console.log('Inputting Data error: ', err)
      })
    return deferred.promise
  }

  this.publish = async function () {
    var deferred = q.defer()

    const datasets = await datasetService.getAll()
    const { fullnode } = await configService.get()
    let dataset = null
    datasets.map(dt => {
      if (dt.status == 1) dataset = dt
    })[0]
    if (dataset !== null) {
      let limit = 1
      if (dataset.dataset_interval <= 1000) limit = 10
      else if (dataset.dataset_interval <= 5000) limit = 5
      else if (dataset.dataset_interval <= 10000) limit = 2
      dataRepository
        .getData(dataset.id, -1, limit)
        .then(async data => {
          if (data.length > 0) {
            let ids = []

            var dataList = []
            for (let i = 0; i < data.length; i++) {
              const info = data[i]
              let sensorData = await convertToFrontFormat(info)
              dataList.push(sensorData)
              ids.push(info.id)
            }

            publishData(dataList, fullnode).then(async root => {
              console.log("Root:", root)
              await dataRepository.updateFlag(dataset.dataset_name_table, ids)
              dataRepository
                .createBundle(root)
                .then(data => {
                  dataRepository
                    .updateStatus(dataset.dataset_name_table, ids, data.idBundle)
                    .then(data => {
                      deferred.resolve({ dataList, updated: true, root })
                    })
                    .catch(function (msg) {
                      console.log(msg)
                      deferred.resolve({ msg })
                    })
                })
                .catch(function (err) {
                  console.log(err)
                  deferred.resolve({ msg })
                })
            })
              .catch(function (msg) {
                console.log("IOTA NODE:", msg)
                deferred.resolve({ msg })
              })


          } else {
            console.log(err)
            deferred.resolve({ msg: 'There is no data to publish.' })
          }
        })
        .catch(function (err) {
          console.log(err)
          deferred.resolve({ msg: 'No data was found.' })
        })
    } else {
      const err = { msg: 'No active dataset was found.' }
      console.log(err)
      deferred.resolve(err)
    }

    return deferred.promise
  }
}

module.exports = new DataService()
