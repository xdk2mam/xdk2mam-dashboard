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

const terminateDataset = async id => {
  const response = await axios.post(`${HOST}:${PORT}/api/dataset/terminate`, { data: { id } })

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

const getDatasetData = async (datasetId, minutesAgo, limit) => {
  const response = await axios.get(`${HOST}:${PORT}/api/getData/${datasetId}/${minutesAgo}?limit=${limit}`)

  return response.data
}

/**
 * Get user config
 */

const getUserConfig = async () => {
  const response = await axios.get(`${HOST}:${PORT}/api/userConfig`)

  return response
}

/**
 * Set user email
 */

const setEmail = async email => {
  const response = await axios.post(`${HOST}:${PORT}/api/userConfig/email`, { email })

  return response
}

/**
 * Set Full node iota url
 */

const setFullNodeIotaUrl = async fullNode => {
  const response = await axios.post(`${HOST}:${PORT}/api/userConfig/fullnode`, { fullNode })

  return response
}

/**
 * Set explorer url
 */

const setExplorerUrl = async explorer => {
  const response = await axios.post(`${HOST}:${PORT}/api/userConfig/explorer`, { explorer })

  return response
}

/**
 * Exports
 */

export default {
  createDataset,
  terminateDataset,
  getDatasets,
  getDatasetData,
  getUserConfig,
  setEmail,
  setFullNodeIotaUrl,
  setExplorerUrl,
}
