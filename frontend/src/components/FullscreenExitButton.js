import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import FullscreenIcon from '@material-ui/icons/FullscreenExit'

/**
 * FullscreenExitButton
 */

const FullscreenExitButton = ({ classes, onClick }) => {
  return (
    <div className={classes.container} onClick={onClick}>
      <FullscreenIcon />
    </div>
  )
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

export default withStyles(styles)(FullscreenExitButton)
