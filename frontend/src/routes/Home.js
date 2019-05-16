import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import { Tab, Tabs, Paper, Grid, Typography } from '@material-ui/core'

import Colors from '../helpers/colors.js'
import { formatDataForCharts, formatDataForTable, getLast } from '../helpers/utils.js'
import generateRandomData from '../helpers/randomData.js'
import data from '../helpers/data.js'
import Layout from '../components/Layout'
import LineChart from '../components/LineChart'
import Table from '../components/Table.js'

/**
 * Constants
 */

const VISIBLE_VALUES_ON_CHART = 25

/**
 * Home
 */

class Home extends Component {
  state = {
    infoSensor: null,
    rawData: null,
    rawChartData: null,
    tableData: [],
    selectedTab: 0,
  }

  componentDidMount() {
    this.setState({
      infoSensor: formatDataForCharts(data),
      tableData: formatDataForTable(data),
      rawData: data,
      rawChartData: data,
    })

    this.interval = setInterval(() => {
      const { rawData, rawChartData } = this.state

      const newRandomData = generateRandomData()

      let newRawData = rawData.slice(0)
      let newChartData = rawChartData.slice(0)

      newRawData.push(newRandomData)
      newChartData.push(newRandomData)

      if (newChartData.length >= VISIBLE_VALUES_ON_CHART) {
        newChartData.shift()
      }

      this.setState({
        infoSensor: formatDataForCharts(newChartData),
        tableData: formatDataForTable(newRawData),
        rawData: newRawData,
        rawChartData: newChartData,
      })

      // this.getLastInfo(5)
    }, 2000)
  }

  getLastInfo = num => {
    getLast(num).then(({ data }) => {
      this.setState({ infoSensor: data.info })
    })
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
    const { infoSensor: weatherData, selectedTab, tableData } = this.state

    const colorPalette = [Colors.LOGO_GREEN, Colors.DARKEST_BLUE, Colors.COMP_YELLOW]

    return (
      <Layout>
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

        {selectedTab === 0 && (
          <Grid container className={classes.baseGrid}>
            {weatherData &&
              weatherData[0].series.map((data, index) => (
                <Grid item sm={4} xs={12} key={index} className={classes.gridInner}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={0}>
                      <Typography variant="subheading" color="inherit">
                        {data.seriesName}
                      </Typography>
                      <LineChart data={data.data} color={colorPalette[index]} />
                    </Paper>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        )}

        {selectedTab === 1 && (
          <Grid container className={classes.baseGrid}>
            {weatherData &&
              weatherData[4].series.map((data, index) => (
                <Grid item xs={12} key={index} className={classes.gridInner}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={0}>
                      <Typography variant="subheading" color="inherit">
                        {weatherData[4].sensorName}
                      </Typography>
                      <LineChart data={data.data} color={colorPalette[index]} />
                    </Paper>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        )}

        {selectedTab === 2 && (
          <Grid container className={classes.baseGrid}>
            {weatherData &&
              weatherData.map((sensors, i) => {
                if (i !== 0 && i !== 4) {
                  return (
                    <Grid item sm={6} xs={12} key={i} className={classes.gridInner}>
                      <Grid item xs={12}>
                        <Paper className={classes.paper} elevation={0}>
                          <Typography variant="subheading" color="inherit">
                            {sensors.sensorName}
                          </Typography>
                          <LineChart data={sensors} color={colorPalette[i]} />
                        </Paper>
                      </Grid>
                    </Grid>
                  )
                }
              })}
          </Grid>
        )}

        <Grid item xs={12} classes={{ item: classes.tableContainer }}>
          <Paper className={classes.tablePaper} elevation={0}>
            <Table data={tableData} />
          </Paper>
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
    backgroundColor: Colors.COMP_YELLOW,
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

  baseGrid: {
    backgroundColor: Colors.FAFAFA,
  },

  gridInner: {
    padding: '1%',
  },

  paper: {
    padding: 10,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },

  tableContainer: {
    padding: 20,
  },

  tablePaper: {
    width: '100%',
    height: 400,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(Home)
