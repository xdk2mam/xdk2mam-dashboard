import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'

import Colors, { ChartColors } from '../helpers/colors.js'
import LineChart from '../components/LineChart'
import MaxMinAvgLabels from '../components/MaxMinAvgLabels'
import FullscreenButton from '../components/FullscreenButton.js'
import { getMaxYValue, getMinYValue, getAvgYValue } from '../helpers/utils.js'

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
          data.series.map((data, index) => {
            const seriesMaxValue = getMaxYValue(data.data)
            const seriesMinValue = getMinYValue(data.data)
            const seriesAvgValue = getAvgYValue(data.data)

            return (
              <MaxMinAvgLabels
                key={index}
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
}

/**
 * Styles
 */

const styles = {
  tabsRoot: {
    backgroundColor: Colors.COMP_PURPLE,
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

  gridInner: {
    padding: '1%',
  },

  paper: {
    padding: 10,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },

  tablePaper: {
    width: '100%',
    height: 400,
  },

  lineChartHeader: {
    position: 'relative',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(ChartView)
