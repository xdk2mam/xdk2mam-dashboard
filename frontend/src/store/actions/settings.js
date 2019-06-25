/**
 * Types
 */

export const SET_EMAIL = 'SET_EMAIL'
export const SET_FULLNODE_IOTA_URL = 'SET_FULLNODE_IOTA_URL'
export const SET_EXPLORER_URL = 'SET_EXPLORER_URL'
export const CLEAR_EMAIL = 'CLEAR_EMAIL'
export const CLEAR_FULLNODE_IOTA_URL = 'CLEAR_FULLNODE_IOTA_URL'
export const CLEAR_EXPLORER_URL = 'CLEAR_EXPLORER_URL'

/**
 * Action creators
 */

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

export const setEmailDispatcher = dispatch => email => {
  dispatch(setEmail(email))
}

export const setFullnodeIotaUrlDispatcher = dispatch => url => {
  dispatch(setFullnodeIotaUrl(url))
}

export const setExplorerUrlDispatcher = dispatch => url => {
  dispatch(setExplorerUrl(url))
}

export const clearEmailDispatcher = dispatch => () => {
  dispatch(clearEmail())
}

export const clearFullnodeIotaUrlDispatcher = dispatch => () => {
  dispatch(clearFullnodeIotaUrl())
}

export const clearExplorerUrlDispatcher = dispatch => () => {
  dispatch(clearExplorerUrl())
}
