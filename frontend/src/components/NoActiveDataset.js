import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import CreateDatasetButton from './CreateDatasetButton'
import CreateDatasetDialog from './CreateDatasetDialog'

/**
 * NoActiveDataset
 */

const NoActiveDataset = ({ classes, onCreateDataset }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => setOpenDialog(true)

  const handleCancelDialog = () => setOpenDialog(false)

  const handleCreateDataset = (name, deviceName, description, endDate, interval) => {
    setOpenDialog(false)
    onCreateDataset(name, deviceName, description, endDate, interval)
  }

  return (
    <div className={classes.container}>
      <Typography className={classes.text} variant="h4">
        No active dataset
      </Typography>
      <CreateDatasetButton style={classes.button} onClick={handleOpenDialog} />
      <CreateDatasetDialog open={openDialog} onCancel={handleCancelDialog} onCreate={handleCreateDataset} />
    </div>
  )
}

/**
 * PropTypes
 */

NoActiveDataset.propTypes = {
  classes: PropTypes.object.isRequired,
  onCreateDataset: PropTypes.func.isRequired,
}

/**
 * Styles
 */

const styles = {
  container: {
    display: 'flex',
    flexGrow: 1,
    height: '85vh',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginTop: 10,
  },

  button: {
    margin: 20,
    fontSize: 16,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(NoActiveDataset)
