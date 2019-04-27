export function getLast(number) {
  return new Promise(async (res, rej) => {
    try {
      const data = [
        {
          xdk2mam: [
            {
              sensorType: 'Environmental',
              data: [
                { name: 'Pressure', value: '100809' },
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
          timestamp: '159',
        },
      ]
      res(data)
    } catch (e) {
      rej(e)
    }
  })
}
