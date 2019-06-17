import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'

import { ChartColors } from '../helpers/colors'
import { getMaxYValue, getMinYValue, getAvgYValue } from '../helpers/utils'
import LineChart from './LineChart'
import MaxMinAvgLabels from './MaxMinAvgLabels'
import FullscreenButton from './FullscreenButton'

/**
 * ChartView
 */

class ChartView extends PureComponent {
  render() {
    const { classes, data, onFullscreenClick, title, yDomain, legendItems, onLegendClick, disabledSeries } = this.props

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
    const formattedlegendItems = hasSeries
      ? legendItems
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
          onLegendClick={onLegendClick}
          disabledSeries={disabledSeries}
          legendItems={formattedlegendItems}
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
  legendItems: PropTypes.array,
  disabledSeries: PropTypes.array,
  onLegendClick: PropTypes.func,
}

ChartView.defaultProps = {
  data: [],
  title: null,
  yDomain: undefined,
  onFullscreenClick: undefined,
  legendItems: [],
  onLegendClick: () => {},
  disabledSeries: [],
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
