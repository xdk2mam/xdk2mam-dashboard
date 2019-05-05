import generateRandomData from '../helpers/randomData.js'
import axios from 'axios'

export function getLast(number) {
  return new Promise(async (res, rej) => {
    try {
      const respDB = await axios.get(`http://localhost:8081/api/getLast/${number}`)
      const data = respDB.data

      res({ data })
    } catch (e) {
      rej(e)
    }
  })
}

export function putRandomData() {
  const randomData = generateRandomData()
  return new Promise(async (res, rej) => {
    try {
      const respDB = await axios.post('http://localhost:8081/api/putData/', randomData)
      const data = respDB.data

      res({ data })
    } catch (e) {
      rej(e)
    }
  })
}

export function formatWeatherData(data) {
  let formattedData = [
    {
      sensorName: 'Pressure',
      data: [],
    },
    {
      sensorName: 'Temperature',
      data: [],
    },
    {
      sensorName: 'Humidity',
      data: [],
    },
  ]

  data.map(item => {
    // Each Day Level
    item.xdk2mam[0].data.map((sensor, i) => {
      // Each Weather Sensor Level
      let dataEntry = {
        x: 0,
        y: 0,
      }
      dataEntry.x = parseInt(item.timestamp)
      dataEntry.y = parseInt(sensor.value)
      formattedData[i].data.push(dataEntry)
    })
  })

  return formattedData
}
