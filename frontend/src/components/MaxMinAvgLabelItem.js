import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Colors from '../helpers/colors'

/**
 * LabelItem
 */

const LabelItem = ({ classes, value, label }) => {
  return (
    <div className={classes.value}>
      <Typography variant="subtitle2" color="inherit" align="center">
        {value}
      </Typography>
      <Typography variant="caption" className={classes.label} align="center">
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
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string.isRequired,
}

/**
 * Styles
 */

const styles = {
  value: {
    minWidth: 90,
  },

  label: {
    color: Colors.TEXT_GREY,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(LabelItem)
