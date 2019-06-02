import React, { useState } from 'react'
import { Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Colors from '../helpers/colors'
import CreateDatasetDialog from './CreateDatasetDialog'

/**
 * NoActiveDataset
 */

const NoActiveDataset = ({ classes, onCreateDataset }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => setOpenDialog(true)

  const handleCancelDialog = () => setOpenDialog(false)

  const handleCreateDataset = (name, deviceName, description) => {
    setOpenDialog(false)
    onCreateDataset(name, deviceName, description)
  }

  return (
    <div className={classes.container}>
      <Typography className={classes.text} variant="h4">
        No active dataset
      </Typography>
      <Button variant="contained" color="primary" className={classes.button} onClick={handleOpenDialog}>
        Create Dataset
      </Button>
      <CreateDatasetDialog open={openDialog} onCancel={handleCancelDialog} onCreate={handleCreateDataset} />
    </div>
  )
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

  icon: {
    fontSize: 50,
  },

  text: {
    marginTop: 10,
  },

  button: {
    margin: 20,
    boxShadow: 'none',
    textTransform: 'uppercase',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    backgroundColor: Colors.BLUE,
    borderColor: Colors.BLUE,
    '&:hover': {
      backgroundColor: Colors.BLEU,
      borderColor: Colors.BLEU,
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: Colors.COMP_PURPLE,
      borderColor: Colors.PURPLE,
    },
  },
}

/**
 * Exports
 */

export default withStyles(styles)(NoActiveDataset)
