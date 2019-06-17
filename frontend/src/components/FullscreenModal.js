import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Dialog, Paper } from '@material-ui/core'
import { isEmpty } from 'lodash'

import FullscreenExitButton from './FullscreenExitButton'
import ChartView from './ChartView'
import { getYDomain } from '../helpers/utils'

/**
 * FullscreenModal
 */

const FullscreenModal = ({ classes, onCloseClick, selectedChart }) => {
  const hasSeries = !isEmpty(selectedChart.series)
  const title = hasSeries ? selectedChart.sensorName : selectedChart.seriesName
  const data = hasSeries ? selectedChart : selectedChart.data
  const yDomain = getYDomain(title)

  return (
    <Dialog open={!!selectedChart} fullWidth maxWidth="lg" onClose={onCloseClick}>
      <Paper className={classes.paper} elevation={1}>
        <FullscreenExitButton onClick={onCloseClick} />
        <ChartView title={title} data={data} yDomain={yDomain} />
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
