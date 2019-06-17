import axios from 'axios'

const HOST = 'http://localhost'
const PORT = '8081'

/**
 * Create a new Dataset
 */

const createDataset = async data => {
  const response = await axios.post(`${HOST}:${PORT}/api/dataset/create`, { data })

  return response
}

/**
 * Terminate a Dataset
 */

const terminateDataset = async dataset => {
  const response = await axios.post(`${HOST}:${PORT}/api/dataset/terminate`, { data: { id: dataset.id } })

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

const getData = async (datasetId, minutesAgo, limit) => {
  const response = await axios.get(`${HOST}:${PORT}/api/getData/${datasetId}/${minutesAgo}?limit=${limit}`)

  return response.data
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
