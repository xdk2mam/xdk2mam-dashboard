const data = [
  {
    xdk2mam: [
      {
        sensorType: 'Weather',
        data: [
          { name: 'Pressure', value: '1001' },
          { name: 'Temperature', value: '27' },
          { name: 'Humidity', value: '62' },
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
    timestamp: new Date() / 1000,
  },
]

export default data
