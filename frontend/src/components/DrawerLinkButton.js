import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { ListItemText, ListItem } from '@material-ui/core'

import Colors from '../helpers/colors'

/**
 * DrawerLinkButton
 */

class DrawerLinkButton extends PureComponent {
  render() {
    const { text, to, classes } = this.props

    return (
      <ListItem button component={Link} to={to}>
        <ListItemText classes={{ primary: classes.text }} primary={text} />
      </ListItem>
    )
  }
}

/**
 * PropTypes
 */

DrawerLinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

/**
 * Styles
 */

const styles = {
  text: {
    fontSize: 14,
    color: Colors.WHITE,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(DrawerLinkButton)
