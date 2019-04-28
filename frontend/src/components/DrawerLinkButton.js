import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListItemText, ListItem } from '@material-ui/core'

/**
 * DrawerLinkButton
 */

class DrawerLinkButton extends PureComponent {
  render() {
    const { text, to } = this.props

    return (
      <li>
        <ListItem button component={Link} to={to}>
          <ListItemText inset primary={text} />
        </ListItem>
      </li>
    )
  }
}

/**
 * PropTypes
 */

DrawerLinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

/**
 * Exports
 */

export default DrawerLinkButton
