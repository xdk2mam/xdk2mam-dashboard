import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Button, Grid, Paper, Typography } from '@material-ui/core'

import Layout from '../components/Layout'
import Colors from '../helpers/colors'

/**
 * Settings
 */

class Settings extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <Layout>
        <Grid container className={classes.gridInner}>
          <Grid item lg={4} md={8} sm={12} xs={12}>
            <div className={classes.sectionHeader}>
              <Typography variant="h5">Settings</Typography>
            </div>
            <Paper className={classes.root}>
              <div className={classnames(classes.setting, classes.email)}>
                <div className={classes.settingHeader}>
                  <Typography variant="subtitle2">Email</Typography>
                  <Button variant="outlined" color="primary" className={classes.addButton}>
                    Add
                  </Button>
                </div>
              </div>
              <div className={classes.setting}>
                <div className={classes.settingHeader}>
                  <Typography variant="subtitle2">Full Node Iota URL</Typography>
                  <Button variant="outlined" color="primary" className={classes.addButton}>
                    Add
                  </Button>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

/**
 * Styles
 */

const styles = {
  root: {
    marginTop: 15,
  },

  gridInner: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1%',
  },

  setting: {
    padding: 20,
  },

  settingHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addButton: {
    textTransform: 'none',
    fontSize: 12,
  },

  email: {
    borderBottom: '1px solid',
    borderBottomColor: Colors.GREY,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(Settings)
