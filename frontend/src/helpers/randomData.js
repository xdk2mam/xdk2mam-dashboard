function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export default function generateRandomData() {
  const data = {
    xdk2mam: [
      {
        sensorType: 'Weather',
        data: [
          { name: 'Pressure', value: getRandomInt(100085) },
          { name: 'Temperature', value: getRandomInt(30) },
          { name: 'Humidity', value: getRandomInt(50) },
        ],
      },
      {
        sensorType: 'Accelerometer',
        data: [
          { name: 'x', value: getRandomInt(30) * -1 },
          { name: 'y', value: getRandomInt(30) * -1 },
          { name: 'z', value: getRandomInt(1000) },
        ],
      },
      {
        sensorType: 'Gyroscope',
        data: [
          { name: 'x', value: getRandomInt(6000) * -1 },
          { name: 'y', value: getRandomInt(4000) * -1 },
          { name: 'z', value: getRandomInt(3000) * -1 },
        ],
      },
      {
        sensorType: 'Inertial',
        data: [
          { name: 'x', value: getRandomInt(400) * -1 },
          { name: 'y', value: getRandomInt(300) },
          { name: 'z', value: getRandomInt(500) },
        ],
      },
      { sensorType: 'Light', data: [{ name: 'milliLux', value: getRandomInt(60000) }] },
      {
        sensorType: 'Magnetometer',
        data: [
          { name: 'x', value: getRandomInt(100) },
          { name: 'y', value: getRandomInt(100) * -1 },
          { name: 'z', value: getRandomInt(100) * -1 },
        ],
      },
    ],
    device: 'XDKDevice1',
    timestamp: new Date() / 1000,
  }
  return data
}
