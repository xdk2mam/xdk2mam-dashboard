import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import logo from '../assets/logo.png'
import Colors from '../helpers/colors'

/**
 * Header
 */

class Header extends PureComponent {
  handleClick = () => this.props.onMenuButtonClick(true)

  render() {
    const { classes, onMenuButtonClick } = this.props

    return (
      <AppBar position="static" elevation={0} classes={{ root: classes.root }}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <div
            tabIndex={0}
            role="button"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            onClick={onMenuButtonClick}
          >
            <MenuIcon />
          </div>
          <Link to="/">
            <Typography variant="h6" color="inherit">
              <img src={logo} alt="Logo" className={classes.logo} />
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}

/**
 * PropTypes
 */

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onMenuButtonClick: PropTypes.func.isRequired,
}

/**
 * Styles
 */

const styles = {
  root: {
    backgroundColor: Colors.BASE,
  },

  toolbar: {
    paddingLeft: 10,
  },

  logo: {
    width: 200,
    paddingTop: 8,
    marginLeft: 4,
  },

  menuButton: {
    display: 'flex',
    cursor: 'pointer',
    padding: 12,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(Header)
