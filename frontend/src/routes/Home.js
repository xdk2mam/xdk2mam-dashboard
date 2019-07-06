import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import { get, includes, isEmpty, find, remove } from 'lodash'
import { connect } from 'react-redux'

import {
  createDatasetDispatcher,
  clearActiveDatasetIdDispatcher,
  setDatasetsToCompareIdsDispatcher,
  clearDatasetsToCompareIdsDispatcher,
} from '../store/actions/dataset'
import { getActiveDataset, datasetsToCompareIdsSelector, getDatasetsToCompare } from '../store/selectors/dataset'
import { formatDataForCharts, formatDataForTable, getYDomain, getSeriesLegendItems } from '../helpers/utils'
import api from '../api/api'
import generateRandomData from '../helpers/randomData'
import Layout from '../components/Layout'
import Table from '../components/Table/Table'
import FullscreenModal from '../components/FullscreenModal'
import ChartView from '../components/ChartView'
import TabNavigator from '../components/TabNavigator'
import CompareHeader from '../components/CompareHeader'
import SubHeader from '../components/SubHeader'
import NoDataMessage from '../components/NoDataMessage'
import NoActiveDataset from '../components/NoActiveDataset'
import SensorTypes from '../constants/SensorTypes'
import Colors from '../helpers/colors'
import { INERTIAL_LEGENDS, INERTIAL_LEGENDS_COMPARE } from '../helpers/inertialLegends'

/**
 * Constants
 */

const USE_FAKE_DATA = false

const VISIBLE_VALUES_ON_CHART = 25

const GET_ALL_LIMIT_ENTRIES = 10000

const TIME_INTERVALS = [{ '1m': 1 }, { '5m': 5 }, { '10m': 10 }, { '30m': 30 }, { All: 0 }]

const initialState = {
  infoSensor: [],
  infoSensorCompare: [],
  rawData: [],
  rawChartData: [],
  tableData: [],
  selectedTab: 0,
  selectedChart: null,
  selectedTimeInterval: '',
  disabledSeries: [],
  legendItems: INERTIAL_LEGENDS,
  legendItemsCompare: INERTIAL_LEGENDS_COMPARE,
  isSelectedChartFromCompare: false,
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

  componentDidMount() {
    this.start()
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeDataset !== prevProps.activeDataset) {
      this.start()
    }
  }

  componentWillUnmount() {
    const { datasetsToCompareIds, dispatchClearDatasetsToCompareIds } = this.props

    if (!isEmpty(datasetsToCompareIds)) {
      dispatchClearDatasetsToCompareIds()
    } else {
      clearInterval(this.intervalId)
    }
  }

  getAllData = async () => {
    const { selectedTimeInterval } = this.state
    const { datasetsToCompareIds } = this.props

    const selectedTimeIntervalValue = find(TIME_INTERVALS, value => Object.keys(value)[0] === selectedTimeInterval)[
      selectedTimeInterval
    ]

    let sensorData, sensorCompareData

    if (!isEmpty(datasetsToCompareIds)) {
      sensorData = await api.getDatasetData(datasetsToCompareIds[0], selectedTimeIntervalValue, GET_ALL_LIMIT_ENTRIES)
      sensorCompareData = await api.getDatasetData(
        datasetsToCompareIds[1],
        selectedTimeIntervalValue,
        GET_ALL_LIMIT_ENTRIES
      )

      return this.setState({
        infoSensor: !isEmpty(sensorData) ? formatDataForCharts(sensorData) : null,
        infoSensorCompare: !isEmpty(sensorCompareData) ? formatDataForCharts(sensorCompareData) : null,
      })
    }

    const {
      activeDataset: { id },
    } = this.props

    sensorData = await api.getDatasetData(id, selectedTimeIntervalValue, GET_ALL_LIMIT_ENTRIES)

    return this.setState({
      infoSensor: !isEmpty(sensorData) ? formatDataForCharts(sensorData) : null,
      tableData: !isEmpty(sensorData) ? formatDataForTable(sensorData) : null,
      rawData: sensorData,
      rawChartData: sensorData,
    })
  }

  start = () => {
    const { activeDataset, datasetsToCompareIds } = this.props

    if (isEmpty(activeDataset) && isEmpty(datasetsToCompareIds)) {
      return
    }

    if (!isEmpty(activeDataset) && activeDataset.status === 1) {
      this.setState({ selectedTimeInterval: '1m' }, () => {
        if (USE_FAKE_DATA) {
          this.startFakeDataset()
        } else {
          this.intervalId = setInterval(async () => {
            this.getAllData()
          }, 1000)
        }
      })
    } else {
      this.setState({ selectedTimeInterval: 'All' }, () => this.getAllData())
    }
  }

  startFakeDataset = () => {
    this.intervalId = setInterval(async () => {
      const { rawData, rawChartData } = this.state

      const sensorData = generateRandomData()
      const parsedData = sensorData.data[0].data

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

  handleFullscreenButton = (selectedChart, isCompare) => {
    /** @todo: we should show the entire data of this chart and not the fragmented one */
    this.setState({ selectedChart })
    if (isCompare) {
      this.setState({ isSelectedChartFromCompare: true })
    } else {
      this.setState({ isSelectedChartFromCompare: false })
    }
  }

  handleCloseFullscreenButton = () => this.setState({ selectedChart: null })

  handleSelectTimeInterval = selectedTimeInterval => this.setState({ selectedTimeInterval })

  handleCreateDataset = (name, deviceName, description, endDate, interval) => {
    this.props.dispatchCreateDataset({ name, deviceName, description, endDate, interval }, true)
    this.start()
  }

  handleFinishDatasetClick = () => {
    const {
      dispatchClearActiveDatasetId,
      dispatchClearDatasetsToCompareIds,
      activeDataset,
      datasetsToCompareIds,
    } = this.props
    clearInterval(this.intervalId)

    if (activeDataset) {
      dispatchClearActiveDatasetId(activeDataset.id)
    }

    if (datasetsToCompareIds) {
      dispatchClearDatasetsToCompareIds()
    }

    this.setState(initialState)
  }

  handleLegendClick = item => {
    const { disabledSeries } = this.state
    const { title } = item

    /** @todo: refactor to maintain immutability */
    item.disabled = !item.disabled

    if (item.disabled) {
      disabledSeries.push(title)
      /** @todo: forceUpdate shouldn't be necessary, but setState is not triggering re-render for children */
      this.setState({ disabledSeries }, () => this.forceUpdate())
    } else {
      remove(disabledSeries, seriesName => seriesName === item.title)
      /** @todo: forceUpdate shouldn't be necessary, but setState is not triggering re-render for children */
      this.setState({ disabledSeries }, () => this.forceUpdate())
    }
  }

  getSelectedChartData = () => {
    const { infoSensor, infoSensorCompare, selectedChart, isSelectedChartFromCompare } = this.state

    if (isEmpty(selectedChart)) {
      return null
    }

    const datasetData = isSelectedChartFromCompare ? infoSensorCompare : infoSensor

    if (selectedChart.sensorName) {
      return find(datasetData, { sensorName: selectedChart.sensorName })
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

    const selectedSensor = find(datasetData, { sensorName: sensorType })
    /** @todo: backend should return consistent objects */
    const data = sensorType === SensorTypes.ACOUSTIC_SENSORS ? selectedSensor.data : selectedSensor.series

    return find(data, { seriesName: selectedChart.seriesName })
  }

  render() {
    const { classes, activeDataset, datasetsToCompare } = this.props
    const {
      selectedTab,
      infoSensor,
      infoSensorCompare,
      tableData,
      selectedTimeInterval,
      legendItems,
      legendItemsCompare,
      disabledSeries,
    } = this.state

    const selectedChartData = this.getSelectedChartData()

    const compareView = !isEmpty(infoSensorCompare)
    const showDashboard = !isEmpty(infoSensor)
    const showSubHeader = !isEmpty(activeDataset) || !isEmpty(datasetsToCompare)
    const showNoDataMessage = (!isEmpty(activeDataset) && isEmpty(infoSensor)) || (!compareView && isEmpty(tableData))
    const showNoActiveDataset = isEmpty(activeDataset) && isEmpty(datasetsToCompare)

    return (
      <Layout>
        {showNoActiveDataset && <NoActiveDataset onCreateDataset={this.handleCreateDataset} />}
        {showSubHeader && (
          <Fragment>
            <Grid item xs={12}>
              <SubHeader
                deviceName={get(activeDataset, 'deviceName')}
                activeDataset={activeDataset}
                datasetsToCompare={datasetsToCompare}
                onTimeIntervalClick={this.handleSelectTimeInterval}
                onFinishDatasetClick={this.handleFinishDatasetClick}
                selectedTimeInterval={selectedTimeInterval}
              />
              <TabNavigator selected={selectedTab} onChange={this.handleTabChange} />
              {compareView && <CompareHeader datasetsToCompare={datasetsToCompare} />}
            </Grid>
            {showNoDataMessage && <NoDataMessage />}
            {showDashboard && selectedTab === 0 && (
              <Grid container>
                <Grid container item xs={compareView ? 6 : 12}>
                  {infoSensor[0].series.map(data => {
                    const title = data.seriesName
                    const yDomain = getYDomain(title)

                    return (
                      <Grid item sm={compareView ? 12 : 4} xs={12} key={title} className={classes.gridInner}>
                        <Grid item xs={12}>
                          <ChartView
                            title={title}
                            data={data.data}
                            onFullscreenClick={() => this.handleFullscreenButton(data)}
                            yDomain={yDomain}
                            isCompare={compareView}
                          />
                        </Grid>
                      </Grid>
                    )
                  })}
                </Grid>
                {compareView && (
                  <Grid item xs={6} className={classes.rightContainer}>
                    {infoSensorCompare[0].series.map(data => {
                      const title = data.seriesName
                      const yDomain = getYDomain(title)

                      return (
                        <Grid item sm={12} xs={12} key={title} className={classes.gridInner}>
                          <Grid item xs={12}>
                            <ChartView
                              title={title}
                              data={data.data}
                              onFullscreenClick={() => this.handleFullscreenButton(data, compareView)}
                              yDomain={yDomain}
                            />
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                )}
              </Grid>
            )}

            {showDashboard && selectedTab === 1 && (
              <Grid container>
                <Grid container item xs={compareView ? 6 : 12}>
                  {infoSensor[4].series.map(data => {
                    const title = infoSensor[4].sensorName

                    return (
                      <Grid item xs={compareView ? 12 : 6} key={title} className={classes.gridInner}>
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
                  {infoSensor[6].series.map(data => {
                    const title = infoSensor[6].sensorName

                    return (
                      <Grid item xs={compareView ? 12 : 6} key={title} className={classes.gridInner}>
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
                {compareView && (
                  <Grid item xs={6} className={classes.rightContainer}>
                    {infoSensorCompare[4].series.map(data => {
                      const title = infoSensor[4].sensorName

                      return (
                        <Grid item xs={12} key={title} className={classes.gridInner}>
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
                    {infoSensorCompare[6].series.map(data => {
                      const title = infoSensor[6].sensorName

                      return (
                        <Grid item xs={12} key={title} className={classes.gridInner}>
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
              </Grid>
            )}

            {showDashboard && selectedTab === 2 && (
              <Grid container>
                <Grid container item xs={compareView ? 6 : 12}>
                  {infoSensor.map((sensors, index) => {
                    if (index === 0 || index === 4 || index === 6) {
                      return false
                    }

                    const sensorName = sensors.sensorName
                    const legends = getSeriesLegendItems(legendItems, sensorName)

                    return (
                      index !== 0 &&
                      index !== 4 &&
                      index !== 6 && (
                        <Grid item sm={compareView ? 12 : 6} xs={12} key={sensorName} className={classes.gridInner}>
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
                {compareView && (
                  <Grid item xs={6} className={classes.rightContainer}>
                    {infoSensorCompare.map((sensors, index) => {
                      if (index === 0 || index === 4 || index === 6) {
                        return false
                      }

                      const sensorName = sensors.sensorName
                      const legends = getSeriesLegendItems(legendItemsCompare, sensorName)

                      return (
                        index !== 0 &&
                        index !== 4 &&
                        index !== 6 && (
                          <Grid item sm={12} key={sensorName} className={classes.gridInner}>
                            <Grid item xs={12}>
                              <ChartView
                                title={sensorName}
                                data={sensors}
                                onFullscreenClick={() => this.handleFullscreenButton(sensors)}
                                legendItems={legends}
                                onLegendClick={this.handleLegendClick}
                                disabledSeries={disabledSeries}
                                isCompare={compareView}
                              />
                            </Grid>
                          </Grid>
                        )
                      )
                    })}
                  </Grid>
                )}
              </Grid>
            )}
            {showDashboard && !compareView && (
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
  datasetsToCompareIds: PropTypes.array,
  datasetsToCompare: PropTypes.array,
  dispatchCreateDataset: PropTypes.func.isRequired,
  dispatchClearActiveDatasetId: PropTypes.func.isRequired,
  dispatchClearDatasetsToCompareIds: PropTypes.func.isRequired,
}

Home.defaultProps = {
  activeDataset: null,
  datasetsToCompareIds: null,
  datasetsToCompare: null,
}

/**
 * Styles
 */

const styles = {
  gridInner: {
    padding: '1%',
  },

  rightContainer: {
    backgroundColor: Colors.LIGHT_GREY,
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
  datasetsToCompareIds: datasetsToCompareIdsSelector(state),
  datasetsToCompare: getDatasetsToCompare(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchCreateDataset: createDatasetDispatcher(dispatch),
  dispatchClearActiveDatasetId: clearActiveDatasetIdDispatcher(dispatch),
  dispatchSetDatasetsToCompareIds: setDatasetsToCompareIdsDispatcher(dispatch),
  dispatchClearDatasetsToCompareIds: clearDatasetsToCompareIdsDispatcher(dispatch),
})

/**
 * Exports
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home))
