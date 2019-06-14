function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.floor(min) + 1) + Math.floor(min))
}

export default function generateRandomData() {
  const data = {
    data: [
      {
        id: getRandomInt(0, 100000000),
        data: {
          xdk2mam: [
            {
              sensorType: 'Weather',
              data: [
                { Pressure: getRandomInt(1000, 1085) * 100 },
                { Temp: getRandomInt(23, 25) * 1000 },
                { Humidity: getRandomInt(56, 56) },
              ],
            },
            {
              sensorType: 'Accelerometer',
              data: [
                { x: getRandomInt(10, 30) * -1 },
                { y: getRandomInt(10, 30) * -1 },
                { z: getRandomInt(900, 1000) },
              ],
            },
            {
              sensorType: 'Gyroscope',
              data: [
                { x: getRandomInt(5000, 6000) * -1 },
                { y: getRandomInt(3000, 4000) * -1 },
                { z: getRandomInt(2000, 3000) * -1 },
              ],
            },
            {
              sensorType: 'Inertial',
              data: [{ x: getRandomInt(200, 400) * -1 }, { y: getRandomInt(200, 300) }, { z: getRandomInt(300, 500) }],
            },
            { sensorType: 'Light', data: [{ milliLux: getRandomInt(58000, 60000) }] },
            {
              sensorType: 'Magnetometer',
              data: [{ x: getRandomInt(0, 100) }, { y: getRandomInt(0, 100) * -1 }, { z: getRandomInt(0, 100) * -1 }],
            },
            { sensorType: 'Acoustic', data: [{ mp: getRandomInt(0, 100) }] },
          ],
          device: 'XDKDevice1',
          timestamp: new Date().getTime(),
        },
      },
    ],
  }

  return data
}
