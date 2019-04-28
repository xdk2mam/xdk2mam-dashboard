import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './routes/Home'
import Settings from './routes/Settings'
import Datasets from './routes/Datasets'

/**
 * App
 */

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/settings" component={Settings} />
        <Route path="/datasets" component={Datasets} />
      </div>
    </Router>
  )
}

/**
 * Exports
 */

export default App
