import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Paper, Grid, Typography } from '@material-ui/core'

import Colors from '../helpers/colors.js'
import { formatWeatherData } from '../helpers/utils.js'
import data from '../helpers/data.js'
import Layout from '../components/Layout'
import LineChart from '../components/LineChart'

/**
 * Home
 */

class Home extends Component {
  state = {
    infoSensor: null,
    selectedTab: 0,
  }

  componentDidMount() {
    this.setState({ infoSensor: formatWeatherData(data) })
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
        <div>
          <h4 key={`${info.timestamp}`}>
            Pressure: {info.xdk2mam[0].data[0].value} - Temperature: {info.xdk2mam[0].data[1].value} - Humidity:{' '}
            {info.xdk2mam[0].data[2].value} - Device: {info.device} - Timestamp: {info.timestamp}
          </h4>
        </div>
      )
    })
  }

  handleTabChange = (event, value) => this.setState({ selectedTab: value })

  render() {
    const { classes } = this.props
    const { selectedTab } = this.state
    const { sensorType } = data && data[0].xdk2mam[0]
    const weatherData = this.state.infoSensor

    return (
      <Layout>
        <Grid item xs={12}>
          <Tabs
            value={selectedTab}
            onChange={this.handleTabChange}
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          >
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Weather" />
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Environmental">
              <Typography variant="h4" color="inherit">
                {sensorType}
              </Typography>
              {weatherData &&
                weatherData.map((data, index) => (
                  <Grid item xs={3} key={index}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6" color="inherit">
                          {data.name}
                        </Typography>
                        <LineChart data={data.data} />
                      </Paper>
                    </Grid>
                  </Grid>
                ))}
            </Tab>
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
  paper: {
    padding: 10,
    fontFamily: 'Roboto',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(Home)
