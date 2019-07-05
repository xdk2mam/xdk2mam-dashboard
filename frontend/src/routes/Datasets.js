import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  Checkbox,
  Grid,
  Paper,
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Typography,
} from '@material-ui/core'
import moment from 'moment'
import { concat, filter, isNil, toString } from 'lodash'

import { datasetsSelector, getActiveDataset } from '../store/selectors/dataset'
import {
  createDatasetDispatcher,
  setActiveDatasetIdDispatcher,
  getDatasetsDispatcher,
  setDatasetsToCompareIdsDispatcher,
} from '../store/actions/dataset'
import Layout from '../components/Layout'
import CreateDatasetButton from '../components/CreateDatasetButton'
import CreateDatasetDialog from '../components/CreateDatasetDialog'
import CompareDatasetsButton from '../components/CompareDatasetsButton'
import CancelButton from '../components/CancelButton'

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
  'Interval',
  'Actions',
]

/**
 * Datasets
 */

class Datasets extends PureComponent {
  constructor(props) {
    super(props)

    const checkboxes = {}
    // eslint-disable-next-line array-callback-return
    props.datasets.map(item => {
      checkboxes[`checkbox${item.id}`] = false
    })

    this.state = {
      openDialog: false,
      datasetsToCompareIds: [],
      checkboxes,
    }
  }

  componentDidMount() {
    this.props.dispatchGetDatasets()
  }

  componentDidUpdate(prevProps) {
    const { activeDataset, dispatchGetDatasets } = this.props

    if (activeDataset && prevProps.activeDataset && activeDataset.id !== prevProps.activeDataset.id) {
      dispatchGetDatasets()
    }
  }

  handleOpenDialog = () => this.setState({ openDialog: true })

  handleCancelDialog = () => this.setState({ openDialog: false })

  handleCreateDataset = (name, deviceName, description, endDate, interval) => {
    this.setState({ openDialog: false })
    this.props.dispatchCreateDataset({ name, deviceName, description, endDate, interval }, true)
  }

  handleViewDataset = datasetId => {
    const { dispatchSetActiveDatasetId, history } = this.props

    dispatchSetActiveDatasetId(datasetId)
    history.push('/')
  }

  handleCompareClick = () => this.setState({ compareMode: true })

  handleConfirmCompareClick = () => {
    const { dispatchSetDatasetsToCompareIds, history } = this.props
    const { datasetsToCompareIds } = this.state

    dispatchSetDatasetsToCompareIds(datasetsToCompareIds)
    history.push('/')
  }

  handleCancelCompareClick = () => this.setState({ compareMode: false, datasetsToCompareIds: [] })

  handleCompareCheckboxClick = id => event => {
    const { checkboxes, datasetsToCompareIds } = this.state

    const isSelected = !event.target.checked

    if (!isSelected && datasetsToCompareIds.length >= 2) {
      return
    }

    const newCheckboxes = checkboxes
    newCheckboxes[`checkbox${id}`] = event.target.checked

    const newArray = isSelected ? filter(datasetsToCompareIds, item => item !== id) : concat(datasetsToCompareIds, id)
    this.setState({ datasetsToCompareIds: newArray, checkboxes: newCheckboxes })
  }

  render() {
    const { classes, datasets } = this.props
    const { checkboxes, compareMode, datasetsToCompareIds } = this.state

    const showCompareDatasetsButton = datasets.length >= 2
    const enableConfirmCompareDatasetsButton = datasetsToCompareIds.length === 2

    return (
      <Layout>
        <Grid item xs={12} className={classes.gridInner}>
          <div className={classes.sectionHeader}>
            <Typography variant="h5">Datasets</Typography>
            {!compareMode && (
              <div>
                {showCompareDatasetsButton && <CompareDatasetsButton onClick={this.handleCompareClick} />}
                <CreateDatasetButton onClick={this.handleOpenDialog} />
              </div>
            )}
            {compareMode && (
              <div>
                <CancelButton onClick={this.handleCancelCompareClick} />
                <CompareDatasetsButton
                  disabled={!enableConfirmCompareDatasetsButton}
                  onClick={this.handleConfirmCompareClick}
                />
              </div>
            )}
          </div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {DATASET_HEADERS.map((header, i) => {
                    if (i === 0) {
                      return <TableCell key={header}>{header}</TableCell>
                    }

                    if (i === DATASET_HEADERS.length - 1) {
                      return (
                        <TableCell width={150} align="right" key={header}>
                          {compareMode ? 'Compare' : 'Actions'}
                        </TableCell>
                      )
                    }

                    return (
                      <TableCell key={header} align="right">
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
                    dataset_interval: interval,
                  } = dataset

                  const dateText = !isNil(endDate) ? moment.unix(endDate).format('Y/M/D hh:mm') : 'N/A'
                  const activeDatasetText = status === 1 ? 'Yes' : 'No'
                  const intervalText = `${toString(interval / 1000)} sec`
                  const disableCheckbox = !checkboxes[`checkbox${id}`] && datasetsToCompareIds.length >= 2

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
                      <TableCell align="right">{intervalText}</TableCell>
                      {!compareMode ? (
                        <TableCell align="right">
                          <Button
                            color="primary"
                            className={classes.viewDatasetButton}
                            onClick={() => this.handleViewDataset(id)}
                          >
                            View
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell classes={{ root: classes.checkboxContainer }} align="right">
                          <Checkbox
                            checked={checkboxes[`checkbox${id}`]}
                            disabled={disableCheckbox}
                            color="primary"
                            onClick={this.handleCompareCheckboxClick(id)}
                          />
                        </TableCell>
                      )}
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
  dispatchGetDatasets: PropTypes.func.isRequired,
  dispatchSetDatasetsToCompareIds: PropTypes.func.isRequired,
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

  checkboxContainer: {
    padding: 5,
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
  dispatchSetDatasetsToCompareIds: setDatasetsToCompareIdsDispatcher(dispatch),
})

/**
 * Exports
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Datasets))
