import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

/**
 * CancelButton
 */

const CancelButton = ({ classes, onClick, style }) => (
  <Button variant="outlined" color="primary" className={classnames(classes.button, style)} onClick={onClick}>
    Cancel
  </Button>
)

/**
 * PropTypes
 */

CancelButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.string,
}

/**
 * Styles
 */

const styles = {
  button: {
    boxShadow: 'none',
    textTransform: 'uppercase',
    fontSize: 14,
    padding: '6px 12px',
    border: 0,
    marginRight: 10,
    lineHeight: 1.5,
    fontFamily: 'Roboto, sans-serif',
    '&:hover': {
      border: 0,
    },
    '&:active': {
      border: 0,
    },
  },
}

/**
 * Exports
 */

export default withStyles(styles)(CancelButton)
