import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import Colors from '../helpers/colors'

/**
 * CreateDatasetDialog
 */

const CreateDatasetDialog = ({ classes, onCancel, onCreate, open }) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    deviceName: '',
    endDate: new Date(),
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleCreateClick = () => {
    const { name, deviceName, description, endDate } = values
    onCreate(name, deviceName, description, endDate)
  }

  return (
    <Dialog open={open} onClose={onCancel} classes={{ paper: classes.dialogPaper }}>
      <DialogTitle>Create Dataset</DialogTitle>
      <DialogContent>
        <TextField
          inputProps={{
            maxLength: 50,
          }}
          onChange={handleChange('name')}
          value={values.name}
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
        />
        <TextField
          inputProps={{
            maxLength: 100,
          }}
          onChange={handleChange('description')}
          value={values.description}
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
        />
        <TextField
          inputProps={{
            maxLength: 50,
          }}
          onChange={handleChange('deviceName')}
          value={values.deviceName}
          margin="dense"
          id="deviceName"
          label="Device name"
          type="text"
          fullWidth
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div className={classes.field}>
            <DateTimePicker label="End date" value={values.endDate} onChange={handleChange('endDate')} />
          </div>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateClick} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
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

  field: {
    marginTop: 8,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(CreateDatasetDialog)
