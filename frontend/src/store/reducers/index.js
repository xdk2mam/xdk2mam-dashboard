import { combineReducers } from 'redux'

const initialSettingsState = {}

const settings = (state = initialSettingsState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const rootReducer = combineReducers({
  settings,
})

export default rootReducer
