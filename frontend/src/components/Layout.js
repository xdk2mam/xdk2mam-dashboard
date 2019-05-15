import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, CssBaseline } from '@material-ui/core'

import Drawer from '../components/Drawer'
import Header from '../components/Header'
import Colors from '../helpers/colors'

/**
 * Layout
 */

class Layout extends PureComponent {
  state = {
    isDrawerOpened: false,
  }

  handleDrawerOpen = () => this.setState({ isDrawerOpened: true })

  handleDrawerClose = () => this.setState({ isDrawerOpened: false })

  render() {
    const { children, classes } = this.props
    const { isDrawerOpened } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />

        <Drawer open={isDrawerOpened} onClose={this.handleDrawerClose} />

        <Grid classes={{ container: classes.grid }} container>
          <Header onMenuButtonClick={this.handleDrawerOpen} />
          {children}
        </Grid>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
}

const styles = {
  root: {
    display: 'flex',
    backgroundColor: Colors.FAFAFA,
    height: '100vh',
    alignItems: 'flex-start',
  },

  grid: {
    backgroundColor: Colors.COMP_PURPLE,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(Layout)
