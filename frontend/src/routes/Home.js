import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'

import { formatDataForCharts, formatDataForTable, getLast } from '../helpers/utils'
import generateRandomData from '../helpers/randomData'
import data from '../helpers/data'
import Layout from '../components/Layout'
import Table from '../components/Table/Table'
import FullscreenModal from '../components/FullscreenModal'
import ChartView from '../components/ChartView'
import TabNavigator from '../components/TabNavigator'
import SubHeader from '../components/SubHeader'
import NoDataMessage from '../components/NoDataMessage'
import NoActiveDataset from '../components/NoActiveDataset'

/**
 * Constants
 */

const VISIBLE_VALUES_ON_CHART = 25

const initialState = {
  infoSensor: formatDataForCharts(data),
  rawData: data,
  rawChartData: data,
  tableData: formatDataForTable(data),
  selectedTab: 0,
  selectedChart: null,
  selectedTimeInterval: '',
  activeDataset: null,
}

/**
 * Home
 */

class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      ...initialState,
    }
  }

  startDataset = () => {
    this.intervalId = setInterval(() => {
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
    }, 1000)
  }

  getLastInfo = num => {
    getLast(num).then(({ data }) => {
      this.setState({ infoSensor: data.info })
    })
  }

  handleTabChange = (event, value) => this.setState({ selectedTab: value })

  handleFullscreenButton = data => {
    /** @todo: we should show the entire data of this chart and not the fragmented one */
    this.setState({ selectedChart: data })
  }

  handleCloseFullscreenButton = () => this.setState({ selectedChart: null })

  handleSelectTimeInterval = selectedTimeInterval => this.setState({ selectedTimeInterval })

  handleCreateDataset = (name, deviceName, description) => {
    this.setState({ activeDataset: { name, deviceName, description } })
    this.startDataset()
  }

  handleFinishDatasetClick = () => {
    clearInterval(this.intervalId)
    this.setState(initialState)
  }

  render() {
    const { classes } = this.props
    const { selectedTab, infoSensor, tableData, selectedChart, selectedTimeInterval, activeDataset } = this.state

    const showNoDataMessage = !isEmpty(activeDataset) && isEmpty(infoSensor)
    const showDashboard = !isEmpty(activeDataset) && !isEmpty(infoSensor)

    return (
      <Layout>
        {isEmpty(activeDataset) && <NoActiveDataset onCreateDataset={this.handleCreateDataset} />}
        {showNoDataMessage && <NoDataMessage />}
        {showDashboard && (
          <Fragment>
            <Grid item xs={12}>
              <SubHeader
                deviceName={activeDataset.deviceName}
                activeDataset={activeDataset.name}
                onTimeIntervalClick={this.handleSelectTimeInterval}
                onFinishDatasetClick={this.handleFinishDatasetClick}
                selectedTimeInterval={selectedTimeInterval}
              />
              <TabNavigator selected={selectedTab} onChange={this.handleTabChange} />
            </Grid>

            {selectedTab === 0 && (
              <Grid container>
                {infoSensor &&
                  infoSensor[0].series.map((data, index) => {
                    const title = data.seriesName

                    return (
                      <Grid item sm={4} xs={12} key={index} className={classes.gridInner}>
                        <Grid item xs={12}>
                          <ChartView
                            title={title}
                            data={data.data}
                            onFullscreenClick={() => this.handleFullscreenButton(data)}
                          />
                        </Grid>
                      </Grid>
                    )
                  })}
              </Grid>
            )}

            {selectedTab === 1 && (
              <Grid container>
                {infoSensor &&
                  infoSensor[4].series.map((data, index) => {
                    const title = infoSensor[4].sensorName

                    return (
                      <Grid item xs={12} key={index} className={classes.gridInner}>
                        <Grid item xs={12}>
                          <ChartView
                            title={title}
                            data={data.data}
                            onFullscreenClick={() => this.handleFullscreenButton(data)}
                          />
                        </Grid>
                      </Grid>
                    )
                  })}
              </Grid>
            )}

            {selectedTab === 2 && (
              <Grid container>
                {infoSensor &&
                  infoSensor.map((sensors, index) => {
                    if (index !== 0 && index !== 4) {
                      return (
                        <Grid item sm={6} xs={12} key={index} className={classes.gridInner}>
                          <Grid item xs={12}>
                            <ChartView
                              title={sensors.sensorName}
                              data={sensors}
                              onFullscreenClick={() => this.handleFullscreenButton(data)}
                            />
                          </Grid>
                        </Grid>
                      )
                    }
                  })}
              </Grid>
            )}
            <Grid container>
              <Grid item xs={12} classes={{ item: classes.gridInner }}>
                <Typography variant="h5" classes={{ root: classes.tableTitle }}>
                  Live Data
                </Typography>
                <Paper className={classes.tablePaper} elevation={0}>
                  <Table data={tableData} />
                </Paper>
              </Grid>
            </Grid>

            {!isEmpty(selectedChart) && (
              <FullscreenModal selectedChart={selectedChart} onCloseClick={this.handleCloseFullscreenButton} />
            )}
          </Fragment>
        )}
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
  gridInner: {
    padding: '1%',
  },

  paper: {
    padding: 10,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },

  tableTitle: {
    marginBottom: 10,
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
