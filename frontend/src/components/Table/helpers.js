const generateTableColumnData = (label, dataKey, width) => ({
  width,
  flexGrow: 1.0,
  label,
  dataKey,
  numeric: true,
})

const TABLE_COLUMNS = [
  generateTableColumnData('Date', 'timestamp', 90),
  generateTableColumnData('Pres.', 'pressure', 100),
  generateTableColumnData('Temp.', 'temperature', 90),
  generateTableColumnData('Hum.', 'humidity', 100),
  generateTableColumnData('Lig.', 'light', 100),
  generateTableColumnData('Gyro. X', 'gyroscopeX', 100),
  generateTableColumnData('Gyro. Y', 'gyroscopeY', 100),
  generateTableColumnData('Gyro. Z', 'gyroscopeZ', 100),
  generateTableColumnData('Acc. X', 'accelerometerX', 100),
  generateTableColumnData('Acc. Y', 'accelerometerY', 100),
  generateTableColumnData('Acc. Z', 'accelerometerZ', 100),
  generateTableColumnData('Iner. X', 'inertialX', 100),
  generateTableColumnData('Iner. Y', 'inertialY', 100),
  generateTableColumnData('Iner. Z', 'inertialZ', 100),
  generateTableColumnData('Magn. X', 'magnetometerX', 100),
  generateTableColumnData('Magn. Y', 'magnetometerY', 100),
  generateTableColumnData('Magn. Z', 'magnetometerZ', 100),
  generateTableColumnData('Acou.', 'acoustic', 100),
  generateTableColumnData('Root', 'root', 100),
]

export { TABLE_COLUMNS }
