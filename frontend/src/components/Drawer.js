import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List, Drawer as MaterialDrawer } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import DrawerLinkButton from './DrawerLinkButton'

/**
 * Drawer
 */

class Drawer extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <MaterialDrawer classes={{ paper: classes.drawer }} variant="permanent">
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
}

/**
 * Styles
 */

const styles = {
  drawer: {
    width: 200,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(Drawer)
