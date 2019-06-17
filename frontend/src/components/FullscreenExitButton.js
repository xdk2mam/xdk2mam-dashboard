import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FullscreenIcon from '@material-ui/icons/FullscreenExit'

/**
 * FullscreenExitButton
 */

const FullscreenExitButton = ({ classes, onClick }) => {
  return (
    <div tabIndex={0} role="button" className={classes.container} onClick={onClick}>
      <FullscreenIcon />
    </div>
  )
}

/**
 * PropTypes
 */

FullscreenExitButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

/**
 * Styles
 */

const styles = {
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    cursor: 'pointer',
    zIndex: 9999,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(FullscreenExitButton)
