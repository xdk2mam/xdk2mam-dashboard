import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import ReportIcon from '@material-ui/icons/Report'
import { withStyles } from '@material-ui/core/styles'

/**
 * NoDataMessage
 */

const NoDataMessage = ({ classes }) => (
  <div className={classes.container}>
    <ReportIcon className={classes.icon} />
    <Typography className={classes.text} variant="h4">
      No data available
    </Typography>
  </div>
)

/**
 * PropTypes
 */

NoDataMessage.propTypes = {
  classes: PropTypes.object.isRequired,
}

/**
 * Styles
 */

const styles = {
  container: {
    display: 'flex',
    flexGrow: 1,
    height: '85vh',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 50,
  },

  text: {
    marginTop: 10,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(NoDataMessage)
