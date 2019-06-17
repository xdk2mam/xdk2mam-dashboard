import { concat } from 'lodash'

import { SET_ACTIVE_DATASET_ID, CLEAR_ACTIVE_DATASET_ID, CREATE_DATASET, SET_DATASETS } from '../actions/dataset'

const initialState = {
  activeDatasetId: null,
  datasets: [],
}

const dataset = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_DATASET_ID:
      return {
        ...state,
        activeDatasetId: action.payload.activeDatasetId,
      }

    case CLEAR_ACTIVE_DATASET_ID:
      return {
        ...state,
        activeDatasetId: null,
      }

    case CREATE_DATASET:
      return {
        ...state,
        datasets: concat(state.datasets, action.payload.dataset),
      }

    case SET_DATASETS:
      return {
        ...state,
        datasets: action.payload.datasets,
      }

    default:
      return state
  }
}

export default dataset
