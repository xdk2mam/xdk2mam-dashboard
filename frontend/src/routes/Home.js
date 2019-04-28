import React, { Component } from 'react'

import { getLast } from '../helpers/utils.js'
import Layout from '../components/Layout.js'

/**
 * Home
 */

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoSensor: null,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getLastInfo(5)
    }, 2000)
  }

  getLastInfo = async num => {
    const data = await getLast(num)
    this.setState({ infoSensor: data })
  }

  getEnvironmentInfo = () => {
    const { infoSensor } = this.state

    if (!infoSensor || infoSensor.length < 0) {
      return null
    }

    return infoSensor.map(info => {
      if (info.xdk2mam[0].sensorType !== 'Environmental') {
        return null
      }

      return (
        <h4 key={`${info.timestamp}`}>
          Pressure: {info.xdk2mam[0].data[0].value} - Temperature: {info.xdk2mam[0].data[1].value} - Humidity:{' '}
          {info.xdk2mam[0].data[2].value} - Device: {info.device} - Timestamp: {info.timestamp}
        </h4>
      )
    })
  }

  render() {
    return <Layout>{this.getEnvironmentInfo()}</Layout>
  }
}

/**
 * Exports
 */

export default Home