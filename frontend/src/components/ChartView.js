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
    const { classes, data, onFullscreenClick, title } = this.props

    let maxValue = null
    let minValue = null
    let avgValue = null

    if (isEmpty(data.series)) {
      maxValue = getMaxYValue(data)
      minValue = getMinYValue(data)
      avgValue = getAvgYValue(data)
    }

    return (
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.lineChartHeader}>
          <Typography variant="subtitle1" align="left" color="inherit">
            {title}
          </Typography>
          <FullscreenButton onClick={onFullscreenClick} />
        </div>
        <LineChart data={data} color={ChartColors[title]} />
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
  onFullscreenClick: PropTypes.func.isRequired,
  // Data returns one line chart or three line charts
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
}

ChartView.defaultProps = {
  data: [],
  title: null,
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
