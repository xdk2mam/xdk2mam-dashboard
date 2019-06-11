import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

/**
 * MenuButton
 */

const MenuButton = ({ classes, onClick }) => {
  return (
    <div className={classes.container} onClick={onClick}>
      <MoreHorizIcon />
    </div>
  )
}

/**
 * Styles
 */

const styles = {
  container: {
    cursor: 'pointer',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(MenuButton)
