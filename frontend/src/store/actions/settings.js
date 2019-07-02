import api from '../../api/api'

/**
 * Types
 */

export const SET_USER_CONFIG = 'SET_USER_CONFIG'
export const SET_EMAIL = 'SET_EMAIL'
export const SET_FULLNODE_IOTA_URL = 'SET_FULLNODE_IOTA_URL'
export const SET_EXPLORER_URL = 'SET_EXPLORER_URL'
export const CLEAR_EMAIL = 'CLEAR_EMAIL'
export const CLEAR_FULLNODE_IOTA_URL = 'CLEAR_FULLNODE_IOTA_URL'
export const CLEAR_EXPLORER_URL = 'CLEAR_EXPLORER_URL'

/**
 * Action creators
 */

export const setUserConfig = config => ({
  type: SET_USER_CONFIG,
  payload: {
    email: config.email,
    fullNodeIotaUrl: config.fullnode,
    explorerUrl: config.explorer,
  },
})

export const setEmail = email => ({
  type: SET_EMAIL,
  payload: { email },
})

export const setFullnodeIotaUrl = fullNodeIotaUrl => ({
  type: SET_FULLNODE_IOTA_URL,
  payload: { fullNodeIotaUrl },
})

export const setExplorerUrl = explorerUrl => ({
  type: SET_EXPLORER_URL,
  payload: { explorerUrl },
})

export const clearEmail = () => ({
  type: CLEAR_EMAIL,
})

export const clearFullnodeIotaUrl = () => ({
  type: CLEAR_FULLNODE_IOTA_URL,
})

export const clearExplorerUrl = () => ({
  type: CLEAR_EXPLORER_URL,
})

/**
 * Action dispatchers
 */

export const getUserConfigDispatcher = dispatch => async () => {
  const response = await api.getUserConfig()

  if (response.status === 200) {
    dispatch(setUserConfig(response.data))
  }
}

export const setEmailDispatcher = dispatch => async email => {
  const response = await api.setEmail(email)

  if (response.status === 200) {
    dispatch(setEmail(email))
  }
}

export const setFullnodeIotaUrlDispatcher = dispatch => async url => {
  const response = await api.setFullNodeIotaUrl(url)

  if (response.status === 200) {
    dispatch(setFullnodeIotaUrl(url))
  }
}

export const setExplorerUrlDispatcher = dispatch => async url => {
  const response = await api.setExplorerUrl(url)

  if (response.status === 200) {
    dispatch(setExplorerUrl(url))
  }
}

export const clearEmailDispatcher = dispatch => async () => {
  const response = await api.setEmail('')

  if (response.status === 200) {
    dispatch(setEmail(''))
  }
}

export const clearFullnodeIotaUrlDispatcher = dispatch => async () => {
  const response = await api.setFullNodeIotaUrl('')

  if (response.status === 200) {
    dispatch(setFullnodeIotaUrl(''))
  }
}

export const clearExplorerUrlDispatcher = dispatch => async () => {
  const response = await api.setExplorerUrl('')

  if (response.status === 200) {
    dispatch(setExplorerUrl(''))
  }
}
