import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import { find, isEmpty, remove } from 'lodash'

import { ChartColors } from '../helpers/colors'
import { getMaxYValue, getMinYValue, getAvgYValue } from '../helpers/utils'
import LineChart from './LineChart'
import MaxMinAvgLabels from './MaxMinAvgLabels'
import FullscreenButton from './FullscreenButton'

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

/**
 * ChartView
 */

class ChartView extends PureComponent {
  state = {
    disabledSeries: [],
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

  render() {
    const { classes, data, onFullscreenClick, title, yDomain } = this.props
    const { disabledSeries } = this.state

    let maxValue = null
    let minValue = null
    let avgValue = null
    let chartColors = null

    if (isEmpty(data.series)) {
      maxValue = getMaxYValue(data)
      minValue = getMinYValue(data)
      avgValue = getAvgYValue(data)
      chartColors = ChartColors[title]
    } else {
      chartColors = [ChartColors.x, ChartColors.y, ChartColors.z]
    }

    const hasSeries = !isEmpty(data.series)
    const name = hasSeries ? data.sensorName : data.seriesName
    const legendItems = hasSeries
      ? find(INERTIAL_LEGENDS, ['sensor', name]).legends
      : [
          {
            title,
            color: ChartColors[title],
          },
        ]

    return (
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.lineChartHeader}>
          <Typography variant="subtitle1" align="left" color="inherit">
            {title}
          </Typography>
          {onFullscreenClick && <FullscreenButton onClick={onFullscreenClick} />}
        </div>
        <LineChart
          data={data}
          color={chartColors}
          onLegendClick={this.handleLegendClick}
          disabledSeries={disabledSeries}
          legendItems={legendItems}
          yDomain={yDomain}
        />
        {!isEmpty(data.series) ? (
          data.series.map(item => {
            const seriesMaxValue = getMaxYValue(item.data)
            const seriesMinValue = getMinYValue(item.data)
            const seriesAvgValue = getAvgYValue(item.data)

            return (
              <MaxMinAvgLabels
                key={`max-min-avg-${title}-${item.seriesName}`}
                title={data.seriesName}
                maxValue={seriesMaxValue}
                minValue={seriesMinValue}
                avgValue={seriesAvgValue}
              />
            )
          })
        ) : (
          <MaxMinAvgLabels maxValue={maxValue} minValue={minValue} avgValue={avgValue} />
        )}
      </Paper>
    )
  }
}

/**
 * PropTypes
 */

ChartView.propTypes = {
  classes: PropTypes.object.isRequired,
  onFullscreenClick: PropTypes.func,
  // Data returns one line chart or three line charts
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  yDomain: PropTypes.array,
}

ChartView.defaultProps = {
  data: [],
  title: null,
  yDomain: undefined,
  onFullscreenClick: undefined,
}

/**
 * Styles
 */

const styles = {
  paper: {
    padding: 10,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },

  lineChartHeader: {
    position: 'relative',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(ChartView)
