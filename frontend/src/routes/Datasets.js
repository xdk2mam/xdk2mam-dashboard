import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, Button, TableRow, TableHead, TableCell, TableBody, Table, Typography } from '@material-ui/core'
import { getActiveDataset } from '../store/selectors/dataset'
import { createDatasetDispatcher, setActiveDatasetIdDispatcher } from '../store/actions/dataset'

import Layout from '../components/Layout'
import CreateDatasetDialog from '../components/CreateDatasetDialog'

/**
 * Constants
 */

const DATASET_HEADERS = ['Id', 'Name', 'Description', 'Device Name', 'End Date', 'Active', 'Actions']

/**
 * Datasets
 */

class Datasets extends PureComponent {
  state = {
    openDialog: false,
    setOpenDialog: false,
  }

  handleOpenDialog = () => this.setState({ openDialog: true })

  handleCancelDialog = () => this.setState({ openDialog: false })

  handleCreateDataset = (name, deviceName, description) => {
    this.setState({ openDialog: false })
    this.props.dispatchCreateDataset({ name, deviceName, description }, true)
  }

  handleViewDataset = datasetId => {
    this.props.dispatchSetActiveDatasetId(datasetId)
    this.props.history.push('/')
  }

  render() {
    const { classes, datasets, activeDataset } = this.props

    return (
      <Layout>
        <Grid item xs={10} className={classes.gridInner}>
          <Typography variant="h6" color="inherit">
            Datasets
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.gridInner}>
          <Button variant="outlined" color="primary" onClick={this.handleOpenDialog}>
            Create Dataset
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.gridInner}>
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
                    <TableCell align="right">
                      <Button
                        color="primary"
                        className={classes.viewDatasetButton}
                        onClick={() => this.handleViewDataset(dataset.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <CreateDatasetDialog
            open={this.state.openDialog}
            onCancel={this.handleCancelDialog}
            onCreate={this.handleCreateDataset}
          />
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

  viewDatasetButton: {
    padding: 0,
    minWidth: 0,
  },
}

/**
 * Connect
 */

const mapStateToProps = state => ({
  datasets: state.dataset.datasets,
  activeDataset: getActiveDataset(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchCreateDataset: createDatasetDispatcher(dispatch),
  dispatchSetActiveDatasetId: setActiveDatasetIdDispatcher(dispatch),
})

/**
 * Exports
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Datasets))
