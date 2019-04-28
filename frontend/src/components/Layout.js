import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Grid, CssBaseline } from '@material-ui/core'

import Drawer from '../components/Drawer'
import Header from '../components/Header'

/**
 * Layout
 */

class Layout extends PureComponent {
  render() {
    const { children } = this.props

    return (
      <Fragment>
        <CssBaseline />
        <Header />

        <Drawer />

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
 * Exports
 */

export default Layout
