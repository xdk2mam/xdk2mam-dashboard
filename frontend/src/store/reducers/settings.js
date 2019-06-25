import {
  SET_EMAIL,
  CLEAR_EMAIL,
  SET_FULLNODE_IOTA_URL,
  CLEAR_FULLNODE_IOTA_URL,
  SET_EXPLORER_URL,
  CLEAR_EXPLORER_URL,
} from '../actions/settings'

const initialState = {
  email: '',
  fullNodeIotaUrl: '',
}

const settings = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      }

    case SET_FULLNODE_IOTA_URL:
      return {
        ...state,
        fullNodeIotaUrl: action.payload.fullNodeIotaUrl,
      }

    case SET_EXPLORER_URL:
      return {
        ...state,
        explorerUrl: action.payload.explorerUrl,
      }

    case CLEAR_EMAIL:
      return {
        ...state,
        email: null,
      }

    case CLEAR_FULLNODE_IOTA_URL:
      return {
        ...state,
        fullNodeIotaUrl: null,
      }

    case CLEAR_EXPLORER_URL:
      return {
        ...state,
        explorerUrl: null,
      }

    default:
      return state
  }
}

export default settings
