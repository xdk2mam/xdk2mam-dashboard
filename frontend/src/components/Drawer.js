import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List, Drawer as MaterialDrawer } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import DrawerLinkButton from './DrawerLinkButton'
import Colors from '../helpers/colors'

/**
 * Drawer
 */

class Drawer extends PureComponent {
  render() {
    const { classes, open, onClose } = this.props

    return (
      <MaterialDrawer open={open} classes={{ paper: classes.drawer }} variant="temporary" onClose={onClose}>
        <div tabIndex={0} role="button">
          <List>
            <DrawerLinkButton to="/" text="Home" />
            <DrawerLinkButton to="/datasets" text="Datasets" />
            <DrawerLinkButton to="/settings" text="Settings" />
          </List>
        </div>
      </MaterialDrawer>
    )
  }
}

/**
 * PropTypes
 */

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

/**
 * Styles
 */

const styles = {
  drawer: {
    width: 150,
    backgroundColor: Colors.DARKEST_BLUE,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(Drawer)
