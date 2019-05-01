import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { getLast } from '../helpers/utils.js'
import Layout from '../components/Layout.js'
import Colors from '../helpers/colors.js'
import { Grid } from '@material-ui/core'

/**
 * Home
 */

class Home extends Component {
  state = {
    infoSensor: null,
    selectedTab: 0,
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

  handleTabChange = (event, value) => this.setState({ selectedTab: value })

  render() {
    const { classes } = this.props
    const { selectedTab } = this.state

    return (
      <Layout>
        {this.getEnvironmentInfo()}
        <Grid item xs={12}>
          <Tabs
            value={selectedTab}
            onChange={this.handleTabChange}
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          >
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Weather" />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Environmental"
            />
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Inertial" />
          </Tabs>
        </Grid>
      </Layout>
    )
  }
}

/**
 * PropTypes
 */

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

/**
 * Styles
 */

const styles = {
  tabsRoot: {
    borderBottom: `1px solid ${Colors.WHITE}`,
  },
  tabsIndicator: {
    backgroundColor: Colors.DARKEST_BLUE,
  },
  tabRoot: {
    color: Colors.WHITE,
    textTransform: 'initial',
    minWidth: 72,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: Colors.WHITE,
      opacity: 1,
    },
    '&$tabSelected': {
      color: Colors.WHITE,
    },
    '&:focus': {
      color: Colors.WHITE,
    },
  },
  tabSelected: {},
}

/**
 * Exports
 */

export default withStyles(styles)(Home)
