import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, Button, TableRow, TableHead, TableCell, TableBody, Table, Typography } from '@material-ui/core'
import moment from 'moment'
import { isNil } from 'lodash'

import { datasetsSelector, getActiveDataset } from '../store/selectors/dataset'
import { createDatasetDispatcher, setActiveDatasetIdDispatcher, getDatasetsDispatcher } from '../store/actions/dataset'
import Layout from '../components/Layout'
import CreateDatasetButton from '../components/CreateDatasetButton'
import CreateDatasetDialog from '../components/CreateDatasetDialog'

/**
 * Constants
 */

const DATASET_HEADERS = [
  'Id',
  'Name',
  'Description',
  // 'Device Name',
  'End Date',
  'Active',
  'Actions',
]

/**
 * Datasets
 */

class Datasets extends PureComponent {
  state = {
    openDialog: false,
  }

  handleOpenDialog = () => this.setState({ openDialog: true })

  handleCancelDialog = () => this.setState({ openDialog: false })

  handleCreateDataset = (name, deviceName, description, endDate) => {
    this.setState({ openDialog: false })
    this.props.dispatchCreateDataset({ name, deviceName, description, endDate }, true)
  }

  handleViewDataset = datasetId => {
    const { dispatchSetActiveDatasetId, history } = this.props

    dispatchSetActiveDatasetId(datasetId)
    history.push('/')
  }

  componentDidMount() {
    this.props.dispatchGetDatasets()
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeDataset.id !== prevProps.activeDataset.id) {
      this.props.dispatchGetDatasets()
    }
  }

  render() {
    const { classes, datasets } = this.props

    return (
      <Layout>
        <Grid item xs={12} className={classes.gridInner}>
          <div className={classes.sectionHeader}>
            <Typography variant="h5">Datasets</Typography>
            <CreateDatasetButton onClick={this.handleOpenDialog} />
          </div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {DATASET_HEADERS.map((header, i) => {
                    if (i === 0) {
                      return <TableCell key={`${header}-${i}`}>{header}</TableCell>
                    }

                    return (
                      <TableCell key={`${header}-${i}`} align="right">
                        {header}
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {datasets.map(dataset => {
                  const {
                    id,
                    dataset_name_table: name,
                    dataset_desc: description,
                    deviceName,
                    status,
                    dataset_end: endDate,
                  } = dataset

                  const dateText = !isNil(endDate) ? moment(endDate).format('Y/M/D hh:mm') : 'N/A'
                  const activeDatasetText = status === 1 ? 'Yes' : 'No'

                  return (
                    <TableRow key={`${deviceName}-${id}`}>
                      <TableCell component="th" scope="dataset">
                        {id}
                      </TableCell>
                      <TableCell align="right">{name}</TableCell>
                      <TableCell align="right">{description}</TableCell>
                      {/* <TableCell align="right">{deviceName}</TableCell> */}
                      <TableCell align="right">{dateText}</TableCell>
                      <TableCell align="right">{activeDatasetText}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          className={classes.viewDatasetButton}
                          onClick={() => this.handleViewDataset(id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
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
 * PropTypes
 */

Datasets.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatchCreateDataset: PropTypes.func.isRequired,
  dispatchSetActiveDatasetId: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  datasets: PropTypes.array,
  activeDataset: PropTypes.object,
}

Datasets.defaultProps = {
  datasets: [],
  activeDataset: null,
}

/**
 * Styles
 */

const styles = {
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  root: {
    width: '100%',
    marginTop: 15,
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
  datasets: datasetsSelector(state),
  activeDataset: getActiveDataset(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchCreateDataset: createDatasetDispatcher(dispatch),
  dispatchSetActiveDatasetId: setActiveDatasetIdDispatcher(dispatch),
  dispatchGetDatasets: getDatasetsDispatcher(dispatch),
})

/**
 * Exports
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Datasets))
