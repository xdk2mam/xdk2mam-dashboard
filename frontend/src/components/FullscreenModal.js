import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'

import FullscreenExitButton from './FullscreenExitButton'
import Colors from '../helpers/colors'
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
    <div className={classes.container}>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={0}>
          <div className={classes.lineChartHeader}>
            <Typography variant="subtitle1" color="inherit">
              {selectedChart.seriesName}
            </Typography>
            <FullscreenExitButton onClick={onCloseClick} />
          </div>
          <ChartView title={title} data={data} yDomain={yDomain} />
        </Paper>
      </Grid>
    </div>
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
  container: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    backgroundColor: Colors.WHITE,
    zIndex: 9999,
  },

  lineChartHeader: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },

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
