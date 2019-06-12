import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { Formik, Field } from 'formik'

import { CreateDatasetSchema } from '../helpers/validation'
import Colors from '../helpers/colors'

/**
 * CreateDatasetDialog
 */

const CreateDatasetDialog = ({ classes, onCancel, onCreate, open }) => (
  <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
    <Formik
      validationSchema={CreateDatasetSchema}
      validateOnChange
      initialValues={{ name: '', description: '', deviceName: '', endDate: new Date() }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true)
        const { name, deviceName, description, endDate } = values
        onCreate(name, deviceName, description, endDate)
        actions.setSubmitting(false)
      }}
      render={({ handleChange, handleBlur, handleSubmit, isValid, errors, touched }) => (
        <React.Fragment>
          <DialogTitle>Create Dataset</DialogTitle>
          <DialogContent>
            <div className={classes.field}>
              <Field
                component={TextField}
                inputProps={{
                  maxLength: 50,
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
              />
              {errors.name && touched.name ? (
                <Typography variant="caption" classes={{ root: classes.error }}>
                  {errors.name}
                </Typography>
              ) : null}
            </div>
            <div className={classes.field}>
              <Field
                component={TextField}
                inputProps={{
                  maxLength: 100,
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
              />
              {errors.description && touched.description ? (
                <Typography variant="caption" classes={{ root: classes.error }}>
                  {errors.description}
                </Typography>
              ) : null}
            </div>
            <div className={classes.field}>
              <Field
                component={TextField}
                inputProps={{
                  maxLength: 50,
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                id="deviceName"
                label="Device name"
                type="text"
                fullWidth
              />
              {errors.deviceName && touched.deviceName ? (
                <Typography variant="caption" classes={{ root: classes.error }}>
                  {errors.deviceName}
                </Typography>
              ) : null}
            </div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <div className={classes.endDateField}>
                <DateTimePicker label="End date" onChange={handleChange} />
              </div>
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} color="primary">
              Cancel
            </Button>
            <Button disabled={!isValid} onClick={handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    />
  </Dialog>
)

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
    height: 72,
  },

  endDateField: {
    marginTop: 10,
  },

  error: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: Colors.RED,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(CreateDatasetDialog)
