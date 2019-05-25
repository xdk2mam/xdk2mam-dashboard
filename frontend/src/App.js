import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { configureStore } from './store'
import Home from './routes/Home'
import Settings from './routes/Settings'
import Datasets from './routes/Datasets'

/**
 * Configure Redux store
 */

const { store, persistor } = configureStore()

/**
 * App
 */

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/settings" component={Settings} />
            <Route path="/datasets" component={Datasets} />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  )
}

/**
 * Exports
 */

export default App
