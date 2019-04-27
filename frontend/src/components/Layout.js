import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Grid, CssBaseline, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu'

import CustomLink from '../components/CustomLink'
import Drawer from '../components/Drawer'

/**
 * Layout
 */

class Layout extends PureComponent {
  state = {
    isDrawerOpened: true,
  }

  handleDrawerOpen = () => this.setState({ isDrawerOpened: true })

  handleDrawerClose = () => this.setState({ isDrawerOpened: false })

  render() {
    const { children } = this.props
    const { isDrawerOpened } = this.state

    return (
      <Fragment>
        <CssBaseline />
        {/* TODO: Insert final AppBar
        
        <AppBar style={styles.appBar}>
          <Toolbar>
            <IconButton onClick={this.handleDrawerOpen} color="inherit" aria-label="Menu" style={styles.drawerButton}>
              >
            </IconButton>
            <CustomLink to="/">
              <Typography style={styles.navigationBarText} variant="h6" color="inherit">
                XDK2MAM
              </Typography>
            </CustomLink>
          </Toolbar>
        </AppBar> 

        */}

        <Drawer open={isDrawerOpened} onDrawerClose={this.handleDrawerClose} />

        <Grid container justify="center" spacing={24}>
          {children}
        </Grid>
      </Fragment>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * Styles
 */

const styles = {
  appBar: {
    marginLeft: 240,
  },

  navButton: {
    cursor: 'pointer',
  },

  drawerButton: {
    marginLeft: -12,
    marginRight: 20,
  },

  navigationBarText: {
    flexGrow: 1,
    cursor: 'pointer',
  },
}

/**
 * Exports
 */

export default Layout
