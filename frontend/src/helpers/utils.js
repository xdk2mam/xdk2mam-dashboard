import axios from 'axios'
import moment from 'moment'
import { find, meanBy, isNil } from 'lodash'

import generateRandomData from './randomData'

const API_BASE_PATH = 'http://localhost:8081/api'

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
  const formattedData = [
    {
      sensorName: 'Weather',
      series: [
        {
          seriesName: 'Pressure',
          data: [],
        },
        {
          seriesName: 'Temp',
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
          seriesName: 'x',
          data: [],
        },
        {
          seriesName: 'y',
          data: [],
        },
        {
          seriesName: 'z',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Gyroscope',
      series: [
        {
          seriesName: 'x',
          data: [],
        },
        {
          seriesName: 'y',
          data: [],
        },
        {
          seriesName: 'z',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Inertial',
      series: [
        {
          seriesName: 'x',
          data: [],
        },
        {
          seriesName: 'y',
          data: [],
        },
        {
          seriesName: 'z',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Light',
      series: [
        {
          seriesName: 'milliLux',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Magnetometer',
      series: [
        {
          seriesName: 'x',
          data: [],
        },
        {
          seriesName: 'y',
          data: [],
        },
        {
          seriesName: 'z',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Acoustic',
      series: [
        {
          seriesName: 'mp',
          data: [],
        },
      ],
    },
  ]

  data.map(item => {
    if (isNil(item)) {
      return false
    }

    return item.xdk2mam.map((sensor, j) => {
      return j === 0 || j === 4 || j === 6
        ? // Weather or Ambient Light sensors
          sensor.data.map((datum, i) => {
            const dataEntry = {
              x: 0,
              y: 0,
            }
            dataEntry.x = item.timestamp
            dataEntry.y = parseInt(datum[formattedData[j].series[i].seriesName], 10)

            return formattedData[j].series[i].data.push(dataEntry)
          })
        : // Rest of the available sensors
          sensor.data.map((datum, i) => {
            const dataEntry = {
              x: 0,
              y: 0,
            }
            dataEntry.x = item.timestamp
            dataEntry.y = parseInt(datum[formattedData[j].series[i].seriesName], 10)

            return formattedData[j].series[i].data.push(dataEntry)
          })
    })
  })

  return formattedData
}

export const formatDataForTable = data => {
  const formattedData = []
  const dataShape = [
    {
      sensorName: 'Weather',
      series: [
        {
          seriesName: 'Pressure',
          data: [],
        },
        {
          seriesName: 'Temp',
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
          seriesName: 'x',
          data: [],
        },
        {
          seriesName: 'y',
          data: [],
        },
        {
          seriesName: 'z',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Gyroscope',
      series: [
        {
          seriesName: 'x',
          data: [],
        },
        {
          seriesName: 'y',
          data: [],
        },
        {
          seriesName: 'z',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Inertial',
      series: [
        {
          seriesName: 'x',
          data: [],
        },
        {
          seriesName: 'y',
          data: [],
        },
        {
          seriesName: 'z',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Light',
      series: [
        {
          seriesName: 'milliLux',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Magnetometer',
      series: [
        {
          seriesName: 'x',
          data: [],
        },
        {
          seriesName: 'y',
          data: [],
        },
        {
          seriesName: 'z',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Acoustic',
      series: [
        {
          seriesName: 'mp',
          data: [],
        },
      ],
    },
  ]

  data.map(item => {
    if (isNil(item)) {
      return false
    }

    const date = moment.unix(item.timestamp).format('hh:mm:ss')
    const itemData = []

    itemData.push(date)
    item.xdk2mam.map((sensor, j) => {
      return sensor.data.map((dataItem, i) => {
        return itemData.push(parseInt(dataItem[dataShape[j].series[i].seriesName], 10))
      })
    })
    itemData.push(item.root)

    return formattedData.unshift(itemData)
  })

  return formattedData
}

export const getMaxYValue = data => Math.max(...data.map(item => item.y))

export const getMinYValue = data => Math.min(...data.map(item => item.y))

export const getAvgYValue = data => parseFloat(meanBy(data, 'y')).toFixed(1)

export const getYDomain = title => {
  const HUMIDITY_Y_DOMAIN = [0, 100]

  if (title === 'Humidity') {
    return HUMIDITY_Y_DOMAIN
  }

  return undefined
}

export const getSeriesLegendItems = (items, title) => find(items, ['sensor', title]).legends
