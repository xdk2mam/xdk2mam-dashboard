function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.floor(min) + 1) + Math.floor(min))
}

export default function generateRandomData() {
  const data = {
    xdk2mam: [
      {
        sensorType: 'Weather',
        data: [
          { name: 'Pressure', value: getRandomInt(1000, 1085) },
          { name: 'Temperature', value: getRandomInt(15, 30) },
          { name: 'Humidity', value: getRandomInt(20, 100) },
        ],
      },
      {
        sensorType: 'Accelerometer',
        data: [
          { name: 'x', value: getRandomInt(10, 30) * -1 },
          { name: 'y', value: getRandomInt(10, 30) * -1 },
          { name: 'z', value: getRandomInt(900, 1000) },
        ],
      },
      {
        sensorType: 'Gyroscope',
        data: [
          { name: 'x', value: getRandomInt(5000, 6000) * -1 },
          { name: 'y', value: getRandomInt(3000, 4000) * -1 },
          { name: 'z', value: getRandomInt(2000, 3000) * -1 },
        ],
      },
      {
        sensorType: 'Inertial',
        data: [
          { name: 'x', value: getRandomInt(200, 400) * -1 },
          { name: 'y', value: getRandomInt(200, 300) },
          { name: 'z', value: getRandomInt(300, 500) },
        ],
      },
      { sensorType: 'Light', data: [{ name: 'milliLux', value: getRandomInt(58000, 60000) }] },
      {
        sensorType: 'Magnetometer',
        data: [
          { name: 'x', value: getRandomInt(0, 100) },
          { name: 'y', value: getRandomInt(0, 100) * -1 },
          { name: 'z', value: getRandomInt(0, 100) * -1 },
        ],
      },
    ],
    device: 'XDKDevice1',
    timestamp: new Date().getTime(),
  }
  
  return data
}
