import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const loggerMiddleware = createLogger()

export const configureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
  const persistor = persistStore(store)

  return { store, persistor }
}
