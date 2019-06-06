import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, TableRow, TableHead, TableCell, TableBody, Table, Typography } from '@material-ui/core'
import { getActiveDataset } from '../store/selectors/dataset'

import Layout from '../components/Layout'

/**
 * Constants
 */

const DATASET_HEADERS = ['Id', 'Name', 'Description', 'Device Name', 'End Date', 'Active']

/**
 * Datasets
 */

class Datasets extends PureComponent {
  render() {
    const { classes, datasets, activeDataset } = this.props

    return (
      <Layout>
        <Grid item xs={12} className={classes.gridInner}>
          <Typography variant="h6" color="inherit">
            Datasets
          </Typography>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {DATASET_HEADERS.map((header, i) => {
                    if (i === 0) {
                      return <TableCell>{header}</TableCell>
                    } else {
                      return <TableCell align="right">{header}</TableCell>
                    }
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {datasets.map(dataset => (
                  <TableRow key={dataset.name}>
                    <TableCell component="th" scope="dataset">
                      {dataset.id}
                    </TableCell>
                    <TableCell align="right">{dataset.name}</TableCell>
                    <TableCell align="right">{dataset.description}</TableCell>
                    <TableCell align="right">{dataset.deviceName}</TableCell>
                    <TableCell align="right">N/A</TableCell>
                    <TableCell align="right">{dataset.id === activeDataset ? 'true' : 'false'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
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
    width: '100%',
    marginTop: 30,
    overflowX: 'auto',
  },

  table: {
    minWidth: 650,
  },

  gridInner: {
    padding: '1%',
  },
}

/**
 * Connect
 */

const mapStateToProps = state => ({
  datasets: state.dataset.datasets,
  activeDataset: getActiveDataset(state),
})

/**
 * Exports
 */

export default connect(mapStateToProps)(withStyles(styles)(Datasets))
