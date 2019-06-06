import generateRandomData from '../helpers/randomData.js'
import axios from 'axios'
import moment from 'moment'
import { meanBy } from 'lodash'

const API_BASE_PATH = 'http://localhost:8081/api'

export const getLast = number => {
  return new Promise(async (res, rej) => {
    try {
      const respDB = await axios.get(`${API_BASE_PATH}/getLast/${number}`)
      const data = respDB.data

      res({ data })
    } catch (e) {
      rej(e)
    }
  })
}

export const putRandomData = () => {
  const randomData = generateRandomData()
  return new Promise(async (res, rej) => {
    try {
      const respDB = await axios.post(`${API_BASE_PATH}/putData/`, randomData)
      const data = respDB.data

      res({ data })
    } catch (e) {
      rej(e)
    }
  })
}

export const formatDataForCharts = data => {
  let formattedData = [
    {
      sensorName: 'Weather',
      series: [
        {
          seriesName: 'Pressure',
          data: [],
        },
        {
          seriesName: 'Temperature',
          data: [],
        },
        {
          seriesName: 'Humidity',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Accelerometer',
      series: [
        {
          seriesName: 'AccelerometerX',
          data: [],
        },
        {
          seriesName: 'AccelerometerY',
          data: [],
        },
        {
          seriesName: 'AccelerometerZ',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Gyroscope',
      series: [
        {
          seriesName: 'GyroscopeX',
          data: [],
        },
        {
          seriesName: 'GyroscopeY',
          data: [],
        },
        {
          seriesName: 'GyroscopeZ',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Inertial',
      series: [
        {
          seriesName: 'InertialX',
          data: [],
        },
        {
          seriesName: 'InertialY',
          data: [],
        },
        {
          seriesName: 'InertialZ',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Light',
      series: [
        {
          seriesName: 'Millilux',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Magnetometer',
      series: [
        {
          seriesName: 'MagnetometerX',
          data: [],
        },
        {
          seriesName: 'MagnetometerY',
          data: [],
        },
        {
          seriesName: 'MagnetometerZ',
          data: [],
        },
      ],
    },
  ]

  data.map(item => {
    return item.xdk2mam.map((sensor, j) => {
      if (j === 0 || j === 4) {
        // Weather or Ambient Light sensors
        sensor.data.map((datum, i) => {
          let dataEntry = {
            x: 0,
            y: 0,
          }
          dataEntry.x = item.timestamp
          dataEntry.y = parseInt(datum.value)
          return formattedData[j].series[i].data.push(dataEntry)
        })
      } else {
        // Rest of the available sensors
        sensor.data.map((datum, i) => {
          let dataEntry = {
            x: 0,
            y: 0,
          }

          dataEntry.x = parseInt(item.timestamp)
          dataEntry.y = parseInt(datum.value)
          return formattedData[j].series[i].data.push(dataEntry)
        })
      }
    })
  })

  return formattedData
}

export const formatDataForTable = data => {
  let formattedData = []

  data.map(item => {
    let itemData = []
    const date = moment(item.timestamp).format('hh:mm:ss')
    itemData.push(date)
    item.xdk2mam.map(sensor => {
      return sensor.data.map(item => {
        return itemData.push(item.value)
      })
    })
    return formattedData.unshift(itemData)
  })

  return formattedData
}

export const getMaxYValue = data => Math.max.apply(Math, data.map(item => item.y))

export const getMinYValue = data => Math.min.apply(Math, data.map(item => item.y))

export const getAvgYValue = data => meanBy(data, 'y').toFixed(1)
