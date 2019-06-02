/**
 * Types
 */

export const SET_EMAIL = 'SET_EMAIL'
export const SET_FULLNODE_IOTA_URL = 'SET_FULLNODE_IOTA_URL'
export const CLEAR_EMAIL = 'CLEAR_EMAIL'
export const CLEAR_FULLNODE_IOTA_URL = 'CLEAR_FULLNODE_IOTA_URL'

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

export const clearEmail = () => ({
  type: CLEAR_EMAIL,
})

export const clearFullnodeIotaUrl = () => ({
  type: CLEAR_FULLNODE_IOTA_URL,
})

/**
 * Action dispatchers
 */

export const setEmailDispatcher = dispatch => email => {
  dispatch(setEmail(email))
}

export const setFullnodeIotaUrlDispatcher = dispatch => fullNodeIotaUrl => {
  dispatch(setFullnodeIotaUrl(fullNodeIotaUrl))
}

export const clearEmailDispatcher = dispatch => () => {
  dispatch(clearEmail())
}

export const clearFullnodeIotaUrlDispatcher = dispatch => () => {
  dispatch(clearFullnodeIotaUrl())
}
