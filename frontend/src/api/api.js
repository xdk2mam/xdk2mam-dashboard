import axios from 'axios'

const HOST = 'http://localhost'
const PORT = '8081'

/**
 * Create a new Dataset
 */

const createDataset = async options => {
  const response = await axios.post(`${HOST}:${PORT}/api/dataset/create`, { data: options })

  return response
}

/**
 * Terminate a Dataset
 */

const terminateDataset = async datasetId => {
  const response = await axios.post(`${HOST}:${PORT}/api/dataset/terminate`, { data: { id: datasetId.id } })

  return response
}

/**
 * Get all Datasets
 */

const getDatasets = async () => {
  const response = await axios.get(`${HOST}:${PORT}/api/dataset/get`)

  return response
}

/**
 * Get sensor data for a specific Dataset Id, time interval and applying a limit to the results
 */

const getData = async options => {
  const response = await axios.get(`${HOST}:${PORT}/api/getData/`, { data: options })

  return response
}

/**
 * Exports
 */

export default {
  createDataset,
  terminateDataset,
  getDatasets,
  getData,
}
