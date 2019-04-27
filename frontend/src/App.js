import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Home from './layout/Home'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    this.setState({ loaded: true })
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Home />
      </React.Fragment>
    )
  }
}

export default App
