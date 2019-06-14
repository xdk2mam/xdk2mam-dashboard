import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

/**
 * LabelItem
 */

const LabelItem = ({ classes, value, label }) => {
  return (
    <div className={classes.value}>
      <Typography variant="h6" color="inherit" className={classes.maxValue} align="center">
        {value}
      </Typography>
      <Typography variant="subtitle1" className={classes.maxValue} align="center">
        {label}
      </Typography>
    </div>
  )
}

/**
 * PropTypes
 */

LabelItem.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

/**
 * Styles
 */

const styles = {
  value: {
    minWidth: 90,
  },

  maxValue: {
    // paddingRight: 15,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(LabelItem)
