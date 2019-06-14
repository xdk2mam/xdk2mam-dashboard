import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import { isEmpty, find } from 'lodash'
import { connect } from 'react-redux'

import { createDatasetDispatcher, clearActiveDatasetIdDispatcher } from '../store/actions/dataset'
import { getActiveDataset } from '../store/selectors/dataset'
import { formatDataForCharts, formatDataForTable, getLast } from '../helpers/utils'
import generateRandomData from '../helpers/randomData'
import { ChartColors } from '../helpers/colors.js'
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

const USE_FAKE_DATA = true

const VISIBLE_VALUES_ON_CHART = 25

const HUMIDITY_Y_DOMAIN = [0, 100]

const initialState = {
  infoSensor: [],
  rawData: [],
  rawChartData: [],
  tableData: [],
  selectedTab: 0,
  selectedChart: null,
  selectedTimeInterval: '',
}

const INERTIAL_LEGENDS = [
  {
    sensor: 'Accelerometer',
    legends: [
      { title: 'AccelerometerX', color: ChartColors['x'] },
      { title: 'AccelerometerY', color: ChartColors['y'] },
      { title: 'AccelerometerZ', color: ChartColors['z'] },
    ],
  },
  {
    sensor: 'Gyroscope',
    legends: [
      { title: 'GyroscopeX', color: ChartColors['x'] },
      { title: 'GyroscopeY', color: ChartColors['y'] },
      { title: 'GyroscopeZ', color: ChartColors['z'] },
    ],
  },
  {
    sensor: 'Inertial',
    legends: [
      { title: 'InertialX', color: ChartColors['x'] },
      { title: 'InertialY', color: ChartColors['y'] },
      { title: 'InertialZ', color: ChartColors['z'] },
    ],
  },
  {
    sensor: 'Magnetometer',
    legends: [
      { title: 'MagnetometerX', color: ChartColors['x'] },
      { title: 'MagnetometerY', color: ChartColors['y'] },
      { title: 'MagnetometerZ', color: ChartColors['z'] },
    ],
  },
]

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

  componentDidMount() {
    /** @todo: REMOVE THIS. only for dev purposes until backend is ready */
    if (!isEmpty(this.props.activeDataset)) {
      this.startDataset()
    }
  }

  startDataset = () => {
    this.intervalId = setInterval(async () => {
      const { rawData, rawChartData } = this.state
      let sensorData = []

      if (USE_FAKE_DATA) {
        sensorData = generateRandomData()
      } else {
        sensorData = await getLast(1)
      }

      const parsedData = USE_FAKE_DATA ? sensorData.data[0].data : JSON.parse(sensorData.data[0].data)

      const newRawData = rawData.slice(0)
      const newChartData = rawChartData.slice(0)

      newRawData.push(parsedData)
      newChartData.push(parsedData)

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

  getLastInfo = async num => {
    const lastData = await getLast(num)
    this.setState({ infoSensor: lastData.info })
  }

  handleTabChange = (event, value) => this.setState({ selectedTab: value })

  handleFullscreenButton = data => {
    /** @todo: we should show the entire data of this chart and not the fragmented one */
    this.setState({ selectedChart: data })
  }

  handleCloseFullscreenButton = () => this.setState({ selectedChart: null })

  handleSelectTimeInterval = selectedTimeInterval => this.setState({ selectedTimeInterval })

  handleCreateDataset = (name, deviceName, description, endDate) => {
    this.props.dispatchCreateDataset({ name, deviceName, description, endDate }, true)
    this.startDataset()
  }

  handleFinishDatasetClick = () => {
    clearInterval(this.intervalId)
    this.props.dispatchClearActiveDatasetId()
    this.setState(initialState)
  }

  render() {
    const { classes, activeDataset } = this.props
    const { selectedTab, infoSensor, tableData, selectedChart, selectedTimeInterval } = this.state

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
                    const legendItems = [
                      {
                        title,
                        color: ChartColors[title],
                      },
                    ]

                    return (
                      <Grid item sm={4} xs={12} key={index} className={classes.gridInner}>
                        <Grid item xs={12}>
                          <ChartView
                            title={title}
                            legendItems={legendItems}
                            data={data.data}
                            onFullscreenClick={() => this.handleFullscreenButton(data)}
                            yDomain={title === 'Humidity' ? HUMIDITY_Y_DOMAIN : undefined}
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
                    const legendItems = [
                      {
                        title,
                        color: ChartColors[title],
                      },
                    ]

                    return (
                      <Grid item xs={6} key={index} className={classes.gridInner}>
                        <Grid item xs={12}>
                          <ChartView
                            title={title}
                            legendItems={legendItems}
                            data={data.data}
                            onFullscreenClick={() => this.handleFullscreenButton(data)}
                          />
                        </Grid>
                      </Grid>
                    )
                  })}
                {infoSensor &&
                  infoSensor[6].series.map((data, index) => {
                    const title = infoSensor[6].sensorName
                    const legendItems = [
                      {
                        title,
                        color: ChartColors[title],
                      },
                    ]

                    return (
                      <Grid item xs={6} key={index} className={classes.gridInner}>
                        <Grid item xs={12}>
                          <ChartView
                            title={title}
                            legendItems={legendItems}
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
                    if (index === 0 || index === 4 || index === 6) {
                      return false
                    }
                    const legendItems = find(INERTIAL_LEGENDS, ['sensor', sensors.sensorName]).legends

                    return (
                      index !== 0 &&
                      index !== 4 &&
                      index !== 6 && (
                        <Grid item sm={6} xs={12} key={index} className={classes.gridInner}>
                          <Grid item xs={12}>
                            <ChartView
                              title={sensors.sensorName}
                              legendItems={legendItems}
                              data={sensors}
                              onFullscreenClick={() => this.handleFullscreenButton(data)}
                            />
                          </Grid>
                        </Grid>
                      )
                    )
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
  activeDataset: PropTypes.object,
  dispatchCreateDataset: PropTypes.func.isRequired,
  dispatchClearActiveDatasetId: PropTypes.func.isRequired,
}

Home.defaultProps = {
  activeDataset: null,
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
 * Connect
 */

const mapStateToProps = state => ({
  datasets: state.dataset.datasets,
  activeDataset: getActiveDataset(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchCreateDataset: createDatasetDispatcher(dispatch),
  dispatchClearActiveDatasetId: clearActiveDatasetIdDispatcher(dispatch),
})

/**
 * Exports
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home))
