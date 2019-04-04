import React from 'react'

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
    return <Home />
  }
}

export default App
