import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

/**
 * MenuButton
 */

const MenuButton = ({ classes, onClick }) => {
  return (
    <div tabIndex={0} role="button" className={classes.container} onClick={onClick}>
      <MoreHorizIcon />
    </div>
  )
}

/**
 * PropTypes
 */

MenuButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
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
