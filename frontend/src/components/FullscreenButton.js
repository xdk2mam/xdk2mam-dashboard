import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FullscreenIcon from '@material-ui/icons/Fullscreen'

/**
 * FullscreenButton
 */

const FullscreenButton = ({ classes, onClick }) => {
  return (
    <div tabIndex={0} role="button" className={classes.container} onClick={onClick}>
      <FullscreenIcon />
    </div>
  )
}

/**
 * PropTypes
 */

FullscreenButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

/**
 * Styles
 */

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(FullscreenButton)
