import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, CssBaseline } from '@material-ui/core'

import Drawer from '../components/Drawer'
import Header from '../components/Header'

/**
 * Layout
 */

class Layout extends PureComponent {
  render() {
    const { children, classes } = this.props

    return (
      <Fragment>
        <CssBaseline />
        <Header />

        <Drawer />

        <Grid classes={{ container: classes.grid }} container spacing={24}>
          {children}
        </Grid>
      </Fragment>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
}

const styles = {
  grid: {
    padding: 25,
    marginLeft: 200,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(Layout)
