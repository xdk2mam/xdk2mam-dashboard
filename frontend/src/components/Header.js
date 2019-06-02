import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import logo from '../assets/logo.png'
import Colors from '../helpers/colors'

class Header extends PureComponent {
  handleClick = () => this.props.onMenuButtonClick(true)

  render() {
    const { classes, onMenuButtonClick } = this.props

    return (
      <AppBar position="static" elevation={0} classes={{ root: classes.root }}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <div className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={onMenuButtonClick}>
            <MenuIcon />
          </div>
          <Typography variant="h6" color="inherit">
            <img src={logo} alt="Logo" className={classes.logo} />
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onMenuButtonClick: PropTypes.func.isRequired,
}

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

export default withStyles(styles)(Header)
