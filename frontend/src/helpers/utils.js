export function getLast(number) {
  return new Promise(async (res, rej) => {
    try {
      const data = [
        {
          xdk2mam: [
            {
              sensorType: 'Weather',
              data: [
                { name: 'Pressure', value: '1004' },
                { name: 'Temperature', value: '34280' },
                { name: 'Humidity', value: '36' },
              ],
            },
            {
              sensorType: 'Accelerometer',
              data: [{ name: 'x', value: '-119' }, { name: 'y', value: '-7' }, { name: 'z', value: '1000' }],
            },
            {
              sensorType: 'Gyroscope',
              data: [{ name: 'x', value: '-5249' }, { name: 'y', value: '-3906' }, { name: 'z', value: '-3051' }],
            },
            {
              sensorType: 'Inertial',
              data: [{ name: 'x', value: '-366' }, { name: 'y', value: '366' }, { name: 'z', value: '-366' }],
            },
            { sensorType: 'Light', data: [{ name: 'milliLux', value: '54360' }] },
            {
              sensorType: 'Magnetometer',
              data: [{ name: 'x', value: '46' }, { name: 'y', value: '-42' }, { name: 'z', value: '-3' }],
            },
          ],
          device: 'XDKDevice1',
          timestamp: '1556491555',
        },
        {
          xdk2mam: [
            {
              sensorType: 'Weather',
              data: [
                { name: 'Pressure', value: '1009' },
                { name: 'Temperature', value: '34280' },
                { name: 'Humidity', value: '36' },
              ],
            },
            {
              sensorType: 'Accelerometer',
              data: [{ name: 'x', value: '-119' }, { name: 'y', value: '-7' }, { name: 'z', value: '1000' }],
            },
            {
              sensorType: 'Gyroscope',
              data: [{ name: 'x', value: '-5249' }, { name: 'y', value: '-3906' }, { name: 'z', value: '-3051' }],
            },
            {
              sensorType: 'Inertial',
              data: [{ name: 'x', value: '-366' }, { name: 'y', value: '366' }, { name: 'z', value: '-366' }],
            },
            { sensorType: 'Light', data: [{ name: 'milliLux', value: '54360' }] },
            {
              sensorType: 'Magnetometer',
              data: [{ name: 'x', value: '46' }, { name: 'y', value: '-42' }, { name: 'z', value: '-3' }],
            },
          ],
          device: 'XDKDevice1',
          timestamp: '1556491558',
        },
        {
          xdk2mam: [
            {
              sensorType: 'Weather',
              data: [
                { name: 'Pressure', value: '1008' },
                { name: 'Temperature', value: '34280' },
                { name: 'Humidity', value: '36' },
              ],
            },
            {
              sensorType: 'Accelerometer',
              data: [{ name: 'x', value: '-119' }, { name: 'y', value: '-7' }, { name: 'z', value: '1000' }],
            },
            {
              sensorType: 'Gyroscope',
              data: [{ name: 'x', value: '-5249' }, { name: 'y', value: '-3906' }, { name: 'z', value: '-3051' }],
            },
            {
              sensorType: 'Inertial',
              data: [{ name: 'x', value: '-366' }, { name: 'y', value: '366' }, { name: 'z', value: '-366' }],
            },
            { sensorType: 'Light', data: [{ name: 'milliLux', value: '54360' }] },
            {
              sensorType: 'Magnetometer',
              data: [{ name: 'x', value: '46' }, { name: 'y', value: '-42' }, { name: 'z', value: '-3' }],
            },
          ],
          device: 'XDKDevice1',
          timestamp: '1556491559',
        },
      ]
      res(data)
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
