import { combineReducers } from 'redux'

import dataset from './dataset'
import settings from './settings'

const rootReducer = combineReducers({
  dataset,
  settings,
})

export default rootReducer
