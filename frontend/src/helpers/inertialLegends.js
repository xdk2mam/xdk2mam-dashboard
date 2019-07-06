import { ChartColors } from './colors'

const INERTIAL_LEGENDS = [
  {
    sensor: 'Accelerometer',
    legends: [
      { title: 'AccelerometerX', color: ChartColors.x },
      { title: 'AccelerometerY', color: ChartColors.y },
      { title: 'AccelerometerZ', color: ChartColors.z },
    ],
  },
  {
    sensor: 'Gyroscope',
    legends: [
      { title: 'GyroscopeX', color: ChartColors.x },
      { title: 'GyroscopeY', color: ChartColors.y },
      { title: 'GyroscopeZ', color: ChartColors.z },
    ],
  },
  {
    sensor: 'Inertial',
    legends: [
      { title: 'InertialX', color: ChartColors.x },
      { title: 'InertialY', color: ChartColors.y },
      { title: 'InertialZ', color: ChartColors.z },
    ],
  },
  {
    sensor: 'Magnetometer',
    legends: [
      { title: 'MagnetometerX', color: ChartColors.x },
      { title: 'MagnetometerY', color: ChartColors.y },
      { title: 'MagnetometerZ', color: ChartColors.z },
    ],
  },
]

const INERTIAL_LEGENDS_COMPARE = [
  {
    sensor: 'Accelerometer',
    legends: [
      { title: 'AccelerometerX ', color: ChartColors.x },
      { title: 'AccelerometerY ', color: ChartColors.y },
      { title: 'AccelerometerZ ', color: ChartColors.z },
    ],
  },
  {
    sensor: 'Gyroscope',
    legends: [
      { title: 'GyroscopeX ', color: ChartColors.x },
      { title: 'GyroscopeY ', color: ChartColors.y },
      { title: 'GyroscopeZ ', color: ChartColors.z },
    ],
  },
  {
    sensor: 'Inertial',
    legends: [
      { title: 'InertialX ', color: ChartColors.x },
      { title: 'InertialY ', color: ChartColors.y },
      { title: 'InertialZ ', color: ChartColors.z },
    ],
  },
  {
    sensor: 'Magnetometer',
    legends: [
      { title: 'MagnetometerX ', color: ChartColors.x },
      { title: 'MagnetometerY ', color: ChartColors.y },
      { title: 'MagnetometerZ ', color: ChartColors.z },
    ],
  },
]

export { INERTIAL_LEGENDS, INERTIAL_LEGENDS_COMPARE }
