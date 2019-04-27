import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Grid, CssBaseline, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core'

// import MenuIcon from '@material-ui/icons/Menu'

import CustomLink from '../components/CustomLink'
import Drawer from '../components/Drawer'
import Header from '../components/Header'

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
        <Header />

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
