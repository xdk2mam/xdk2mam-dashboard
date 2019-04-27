import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ListItemText, ListItem, ListItemIcon } from '@material-ui/core'

/**
 * DrawerLinkButton
 */

class DrawerLinkButton extends PureComponent {
  render() {
    const { href, icon, text } = this.props

    return (
      <a prefetch href={href}>
        <ListItem button>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </a>
    )
  }
}

/**
 * PropTypes
 */

DrawerLinkButton.propTypes = {
  icon: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

/**
 * Exports
 */

export default DrawerLinkButton
