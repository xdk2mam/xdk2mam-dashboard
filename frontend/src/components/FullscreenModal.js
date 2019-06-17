import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Dialog, Paper } from '@material-ui/core'
import { isEmpty } from 'lodash'

import FullscreenExitButton from './FullscreenExitButton'
import ChartView from './ChartView'
import { getYDomain, getSeriesLegendItems } from '../helpers/utils'

/**
 * FullscreenModal
 */

const FullscreenModal = ({ classes, onCloseClick, selectedChart, legendItems, disabledSeries = [], onLegendClick }) => {
  const hasSeries = !isEmpty(selectedChart.series)
  const title = hasSeries ? selectedChart.sensorName : selectedChart.seriesName
  const data = hasSeries ? selectedChart : selectedChart.data
  const yDomain = getYDomain(title)

  let legends = []

  if (hasSeries) {
    legends = getSeriesLegendItems(legendItems, title)
  }

  return (
    <Dialog open={!!selectedChart} fullWidth maxWidth="lg" onClose={onCloseClick}>
      <Paper className={classes.paper} elevation={1}>
        <FullscreenExitButton onClick={onCloseClick} />
        <ChartView
          title={title}
          data={data}
          yDomain={yDomain}
          legendItems={legends}
          disabledSeries={disabledSeries}
          onLegendClick={onLegendClick}
        />
      </Paper>
    </Dialog>
  )
}

/**
 * PropTypes
 */

FullscreenModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  selectedChart: PropTypes.object.isRequired,
  legendItems: PropTypes.array.isRequired,
  disabledSeries: PropTypes.array,
  onLegendClick: PropTypes.func,
}

FullscreenModal.propTypes = {
  disabledSeries: [],
  onLegendClick: () => {},
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

  gridInner: {
    padding: '1%',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(FullscreenModal)
