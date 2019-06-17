import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import { includes, isEmpty, find, remove } from 'lodash'
import { connect } from 'react-redux'

import { createDatasetDispatcher, clearActiveDatasetIdDispatcher } from '../store/actions/dataset'
import { getActiveDataset } from '../store/selectors/dataset'
import { formatDataForCharts, formatDataForTable, getYDomain, getSeriesLegendItems } from '../helpers/utils'
import generateRandomData from '../helpers/randomData'
import Layout from '../components/Layout'
import Table from '../components/Table/Table'
import FullscreenModal from '../components/FullscreenModal'
import ChartView from '../components/ChartView'
import TabNavigator from '../components/TabNavigator'
import SubHeader from '../components/SubHeader'
import NoDataMessage from '../components/NoDataMessage'
import NoActiveDataset from '../components/NoActiveDataset'
import SensorTypes from '../constants/SensorTypes'
import { ChartColors } from '../helpers/colors'

/**
 * Constants
 */

const USE_FAKE_DATA = false

const VISIBLE_VALUES_ON_CHART = 25

const INERTIAL_LEGENDS = [
  {
    sensor: 'Accelerometer',
    legends: [
      { title: 'AccelerometerX', color: ChartColors.x },
      { title: 'AccelerometerY', color: ChartColors.y },
      { title: 'AccelerometerZ', color: ChartColors.z },
    ],
  },
  {
    sensor: 'Gyroscope',
    legends: [
      { title: 'GyroscopeX', color: ChartColors.x },
      { title: 'GyroscopeY', color: ChartColors.y },
      { title: 'GyroscopeZ', color: ChartColors.z },
    ],
  },
  {
    sensor: 'Inertial',
    legends: [
      { title: 'InertialX', color: ChartColors.x },
      { title: 'InertialY', color: ChartColors.y },
      { title: 'InertialZ', color: ChartColors.z },
    ],
  },
  {
    sensor: 'Magnetometer',
    legends: [
      { title: 'MagnetometerX', color: ChartColors.x },
      { title: 'MagnetometerY', color: ChartColors.y },
      { title: 'MagnetometerZ', color: ChartColors.z },
    ],
  },
]

const GET_ALL_LIMIT_ENTRIES = 10000

const TIME_INTERVALS = [{ '1m': 1 }, { '5m': 5 }, { '10m': 10 }, { '30m': 30 }, { All: -1 }]

const initialState = {
  infoSensor: [],
  rawData: [],
  rawChartData: [],
  tableData: [],
  selectedTab: 0,
  selectedChart: null,
  selectedTimeInterval: '',
  disabledSeries: [],
  legendItems: INERTIAL_LEGENDS,
  recording: false,
}

// const name = hasSeries ? data.sensorName : data.seriesName

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

  start = () => {
    const { activeDataset } = this.props

    if (!isEmpty(activeDataset)) {
      if (activeDataset.status === 1) {
        this.setState(
          {
            recording: true,
            selectedTimeInterval: '1m',
          },
          () => {
            if (USE_FAKE_DATA) {
              this.startDataset()
            } else {
              this.intervalId = setInterval(async () => {
                this.getAllData()
              }, 1000)
            }
          }
        )
      } else {
        this.setState({ selectedTimeInterval: 'All' }, () => this.getAllData())
      }
    }
  }

  getAllData = async () => {
    const {
      activeDataset: { id },
    } = this.props
    const { selectedTimeInterval } = this.state

    const selectedTimeIntervalValue = find(TIME_INTERVALS, selectedTimeInterval)[selectedTimeInterval]
    const sensorData = await getData(id, selectedTimeIntervalValue, GET_ALL_LIMIT_ENTRIES)
    const parsedData = sensorData.data

    this.setState({
      infoSensor: !isEmpty(parsedData) ? formatDataForCharts(parsedData) : null,
      tableData: !isEmpty(parsedData) ? formatDataForTable(parsedData) : null,
      rawData: parsedData,
      rawChartData: parsedData,
    })
  }

  startDataset = () => {
    this.intervalId = setInterval(async () => {
      const { rawData, rawChartData } = this.state

      let sensorData = []
      let parsedData

      sensorData = generateRandomData()
      parsedData = sensorData.data[0].data

      const newRawData = rawData.slice(0)
      const newChartData = rawChartData.slice(0)

      newRawData.push(parsedData)
      newChartData.push(parsedData)

      if (newChartData.length >= VISIBLE_VALUES_ON_CHART) {
        newChartData.shift()
      }

      this.setState({
        infoSensor: !isEmpty(newChartData) ? formatDataForCharts(newChartData) : null,
        tableData: !isEmpty(newRawData) ? formatDataForTable(newRawData) : null,
        rawData: newRawData,
        rawChartData: newChartData,
      })
    }, 1000)
  }

  handleTabChange = (_event, value) => this.setState({ selectedTab: value })

  handleFullscreenButton = selectedChart => {
    /** @todo: we should show the entire data of this chart and not the fragmented one */
    this.setState({ selectedChart })
  }

  handleCloseFullscreenButton = () => this.setState({ selectedChart: null })

  handleSelectTimeInterval = selectedTimeInterval => this.setState({ selectedTimeInterval })

  handleCreateDataset = (name, deviceName, description, endDate) => {
    this.props.dispatchCreateDataset({ name, deviceName, description, endDate }, true)
    this.start()
  }

  handleFinishDatasetClick = () => {
    clearInterval(this.intervalId)
    this.props.dispatchClearActiveDatasetId(this.props.activeDataset)
    this.setState(initialState)
  }

  handleLegendClick = item => {
    const { disabledSeries } = this.state
    const { title } = item
    item.disabled = !item.disabled

    if (item.disabled) {
      disabledSeries.push(title)
      this.setState({ disabledSeries })
    } else {
      remove(disabledSeries, seriesName => seriesName === item.title)
      this.setState({ disabledSeries })
    }
  }

  getSelectedChartData = () => {
    const { infoSensor, selectedChart } = this.state

    if (isEmpty(selectedChart)) {
      return null
    }

    if (selectedChart.sensorName) {
      return find(infoSensor, { sensorName: selectedChart.sensorName })
    }

    let sensorType = ''
    const WEATHER_SENSORS = ['Pressure', 'Temp', 'Humidity']
    const LIGHT_SENSORS = ['milliLux']
    const ACOUSTIC_SENSORS = ['mp']

    if (includes(WEATHER_SENSORS, selectedChart.seriesName)) {
      sensorType = SensorTypes.WEATHER
    }

    if (includes(LIGHT_SENSORS, selectedChart.seriesName)) {
      sensorType = SensorTypes.LIGHT
    }

    if (includes(ACOUSTIC_SENSORS, selectedChart.seriesName)) {
      sensorType = SensorTypes.ACOUSTIC
    }

    const selectedSensor = find(infoSensor, { sensorName: sensorType })
    /** @todo: backend should return consistent objects */
    const data = sensorType === SensorTypes.ACOUSTIC_SENSORS ? selectedSensor.data : selectedSensor.series

    return find(data, { seriesName: selectedChart.seriesName })
  }

  componentDidMount() {
    this.start()
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeDataset !== prevProps.activeDataset) {
      this.start()
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const { classes, activeDataset } = this.props
    const { selectedTab, infoSensor, tableData, selectedTimeInterval, legendItems, disabledSeries } = this.state

    const selectedChartData = this.getSelectedChartData()

    const showNoDataMessage = (!isEmpty(activeDataset) && isEmpty(infoSensor)) || isEmpty(tableData)
    const showDashboard = !isEmpty(infoSensor)
    const showSubHeader = !isEmpty(activeDataset)

    return (
      <Layout>
        {isEmpty(activeDataset) && <NoActiveDataset onCreateDataset={this.handleCreateDataset} />}
        {showSubHeader && (
          <Fragment>
            <Grid item xs={12}>
              <SubHeader
                deviceName={activeDataset.deviceName}
                activeDataset={activeDataset}
                onTimeIntervalClick={this.handleSelectTimeInterval}
                onFinishDatasetClick={this.handleFinishDatasetClick}
                selectedTimeInterval={selectedTimeInterval}
              />
              <TabNavigator selected={selectedTab} onChange={this.handleTabChange} />
            </Grid>
            {showNoDataMessage && <NoDataMessage />}
            {showDashboard && selectedTab === 0 && (
              <Grid container>
                {infoSensor &&
                  infoSensor[0].series.map((data, index) => {
                    const title = data.seriesName
                    const yDomain = getYDomain(title)

                    return (
                      <Grid item sm={4} xs={12} key={index} className={classes.gridInner}>
                        <Grid item xs={12}>
                          <ChartView
                            title={title}
                            data={data.data}
                            onFullscreenClick={() => this.handleFullscreenButton(data)}
                            yDomain={yDomain}
                          />
                        </Grid>
                      </Grid>
                    )
                  })}
              </Grid>
            )}

            {showDashboard && selectedTab === 1 && (
              <Grid container>
                {infoSensor &&
                  infoSensor[4].series.map((data, index) => {
                    const title = infoSensor[4].sensorName

                    return (
                      <Grid item xs={6} key={index} className={classes.gridInner}>
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
                {infoSensor &&
                  infoSensor[6].series.map((data, index) => {
                    const title = infoSensor[6].sensorName

                    return (
                      <Grid item xs={6} key={index} className={classes.gridInner}>
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

            {showDashboard && selectedTab === 2 && (
              <Grid container>
                {infoSensor &&
                  infoSensor.map((sensors, index) => {
                    if (index === 0 || index === 4 || index === 6) {
                      return false
                    }

                    const sensorName = sensors.sensorName
                    const legends = getSeriesLegendItems(legendItems, sensorName)

                    return (
                      index !== 0 &&
                      index !== 4 &&
                      index !== 6 && (
                        <Grid item sm={6} xs={12} key={index} className={classes.gridInner}>
                          <Grid item xs={12}>
                            <ChartView
                              title={sensorName}
                              data={sensors}
                              onFullscreenClick={() => this.handleFullscreenButton(sensors)}
                              legendItems={legends}
                              onLegendClick={this.handleLegendClick}
                              disabledSeries={disabledSeries}
                            />
                          </Grid>
                        </Grid>
                      )
                    )
                  })}
              </Grid>
            )}
            {showDashboard && (
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
            )}

            {!isEmpty(selectedChartData) && (
              <FullscreenModal
                selectedChart={selectedChartData}
                onCloseClick={this.handleCloseFullscreenButton}
                legendItems={legendItems}
                disabledSeries={disabledSeries}
                onLegendClick={this.handleLegendClick}
              />
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
