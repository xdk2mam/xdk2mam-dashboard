import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

/**
 * MaxMinLabels
 */

const MaxMinLabels = ({ classes, title, maxValue, minValue }) => (
  <div className={classes.container}>
    {!isEmpty(title) && (
      <Typography variant="caption" color="inherit" className={classes.title}>
        {title}
      </Typography>
    )}
    <div className={classes.value}>
      <Typography variant="caption" color="inherit" className={classes.maxValue} align="left">
        {`Max: ${maxValue}`}
      </Typography>
    </div>
    <div className={classes.value}>
      <Typography variant="caption" color="inherit" align="left">
        {`Min: ${minValue}`}
      </Typography>
    </div>
  </div>
)

/**
 * PropTypes
 */

MaxMinLabels.propTypes = {
  title: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
}

MaxMinLabels.defaultProps = {
  title: null,
}

/**
 * Styles
 */

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 40,
    paddingTop: 5,
    paddingBottom: 5,
  },

  title: {
    fontWeight: 'bold',
    paddingRight: 20,
  },

  value: {
    minWidth: 90,
  },

  maxValue: {
    paddingRight: 15,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(MaxMinLabels)
