import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List, Drawer as MaterialDrawer } from '@material-ui/core'

import DrawerLinkButton from './DrawerLinkButton'

/**
 * Drawer
 */

class Drawer extends PureComponent {
  render() {
    const { open, onDrawerClose } = this.props

    return (
      <MaterialDrawer variant="permanent" open={open} onClose={onDrawerClose}>
        <div tabIndex={0} role="button" onClick={onDrawerClose} onKeyDown={onDrawerClose}>
          <List>
            <DrawerLinkButton href="/" text="Home" />
            <DrawerLinkButton href="/" text="Datasets" />
            <DrawerLinkButton href="/" text="Settings" />
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
  open: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
}

/**
 * Exports
 */

export default Drawer
