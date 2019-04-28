import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import logo from '../assets/logo.png'
import Colors from '../helpers/colors'

function Header(props) {
  const { classes } = props

  return (
    <AppBar position="static" elevation={0} classes={{ root: classes.root }}>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          <img src={logo} alt="Logo" className={classes.logo} />
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = {
  root: {
    flexGrow: 1,
    marginLeft: 200,
    backgroundColor: Colors.BASE,
  },

  grow: {
    flexGrow: 1,
  },

  logo: {
    width: 200,
    padding: '8px 0 0 0',
    marginLeft: '5%',
  },
}

export default withStyles(styles)(Header)
