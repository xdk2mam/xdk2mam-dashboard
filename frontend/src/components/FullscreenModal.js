import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

import LineChart from './LineChart'
import FullscreenExitButton from './FullscreenExitButton'
import Colors, { ChartColors } from '../helpers/colors'

/**
 * FullscreenModal
 */

const FullscreenModal = ({ classes, onCloseClick, selectedChart }) => {
  return (
    <div className={classes.container}>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={0}>
          <div className={classes.lineChartHeader}>
            <Typography variant="subheading" color="inherit">
              {selectedChart.seriesName}
            </Typography>
            <FullscreenExitButton onClick={onCloseClick} />
          </div>
          <LineChart data={selectedChart.data} color={ChartColors[selectedChart.seriesName]} height={600} />
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
