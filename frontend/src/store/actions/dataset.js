import moment from 'moment'

/**
 * Types
 */

export const SET_ACTIVE_DATASET_ID = 'SET_ACTIVE_DATASET_ID'
export const CLEAR_ACTIVE_DATASET_ID = 'CLEAR_ACTIVE_DATASET_ID'
export const CREATE_DATASET = 'CREATE_DATASET'

/**
 * Action creators
 */

export const setActiveDatasetId = activeDatasetId => ({
  type: SET_ACTIVE_DATASET_ID,
  payload: { activeDatasetId },
})

export const clearActiveDatasetId = () => ({
  type: CLEAR_ACTIVE_DATASET_ID,
})

export const createDataset = dataset => ({
  type: CREATE_DATASET,
  payload: { dataset },
})

/**
 * Action dispatchers
 */

export const setActiveDatasetIdDispatcher = dispatch => activeDatasetId => {
  dispatch(setActiveDatasetId(activeDatasetId))
}

export const clearActiveDatasetIdDispatcher = dispatch => () => {
  dispatch(clearActiveDatasetId())
}

export const createDatasetDispatcher = dispatch => (dataset, setAsActive = false) => {
  const datasetToCreate = {
    id: Math.floor(Math.random() * 100000 + 1) /** TEMPORARY */,
    ...dataset,
    endDate: moment(dataset.endDate).format(),
  }
  // dataset is an object with name, description, device name and end date
  // we should write an api client with the object validations besides doing client validation
  dispatch(createDataset(datasetToCreate))
  // here we should post to an endpoint with the client dataset data
  // api should return dataset id and we should store updated datasets array and set as active
  if (setAsActive) {
    setActiveDatasetIdDispatcher(dispatch)(datasetToCreate.id)
  }
}
