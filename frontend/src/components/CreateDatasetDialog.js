import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

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
    <Dialog open={open} onClose={onCancel}>
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
 * PropTypes
 */

CreateDatasetDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

/**
 * Styles
 */

const styles = {
  field: {
    marginTop: 8,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(CreateDatasetDialog)
