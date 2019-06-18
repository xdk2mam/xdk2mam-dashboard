async function convertToFrontFormat(info) {
  let xdk2mam = [
    {
      sensor: 'Environmental',
      data: [
        {
          Pressure: null,
        },
        {
          Temp: null,
        },
        {
          Humidity: null,
        },
      ],
    },
    {
      sensor: 'Accel',
      data: [
        {
          x: null,
        },
        {
          y: null,
        },
        {
          z: null,
        },
      ],
    },
    {
      sensor: 'Gyroscope',
      data: [
        {
          x: null,
        },
        {
          y: null,
        },
        {
          z: null,
        },
      ],
    },
    {
      sensor: 'Inertial',
      data: [
        {
          x: null,
        },
        {
          y: null,
        },
        {
          z: null,
        },
      ],
    },
    {
      sensor: 'Light',
      data: [
        {
          milliLux: null,
        },
      ],
    },
    {
      sensor: 'Magnetometer',
      data: [
        {
          x: null,
        },
        {
          y: null,
        },
        {
          z: null,
        },
      ],
    },
    {
      sensor: 'Acoustic',
      data: [
        {
          mp: null,
        },
      ],
    },
  ]

  xdk2mam.map(dt => {
    switch (dt.sensor) {
      case 'Environmental':
        dt.data[0].Pressure = info.pressure
        dt.data[1].Temp = info.temperature
        dt.data[2].Humidity = info.humidity
        break
      case 'Accel':
        dt.data[0].x = info.accel_x
        dt.data[1].y = info.accel_y
        dt.data[2].z = info.accel_z
        break
      case 'Gyroscope':
        dt.data[0].x = info.gyroscope_x
        dt.data[1].y = info.gyroscope_y
        dt.data[2].z = info.gyroscope_z
        break
      case 'Inertial':
        dt.data[0].x = info.inertial_x
        dt.data[1].y = info.inertial_y
        dt.data[2].z = info.inertial_z
        break
      case 'Magnetometer':
        dt.data[0].x = info.magnetometer_x
        dt.data[1].y = info.magnetometer_y
        dt.data[2].z = info.magnetometer_z
        break
      case 'Light':
        dt.data[0].milliLux = info.light
        break
      case 'Acoustic':
        dt.data[0].mp = info.acoustic
        break
    }
  })

  let copy = []

  for (let i = 0; i < xdk2mam.length; i++) {
    const dt = xdk2mam[i]
    let flag = true
    for (let k = 0; k < dt.data.length; k++) {
      const obj = dt.data[k]
      const datas = Object.keys(obj)
      for (let j = 0; j < datas.length; j++) {
        const d = datas[j]
        if (obj[d] === null) {
          flag = false
        }
      }
    }
    if (flag) copy.push(dt)
  }

  return { xdk2mam: copy, timestamp: info.timestamp, device: info.device_name }
}

module.exports = {
  convertToFrontFormat,
}
