import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { get, isEmpty } from 'lodash'
import { Formik, Field } from 'formik'

import Colors from '../helpers/colors'
import SettingsValues from '../constants/SettingsValues'
import { SettingEmailSchema, SettingFullNodeIotaUrlSchema, SettingExplorerUrlSchema } from '../helpers/validation'

// eslint-disable-next-line consistent-return
const getValidationSchema = value => {
  if (value === SettingsValues.email.value) {
    return SettingEmailSchema
  }

  if (value === SettingsValues.fullNodeIotaUrl.value) {
    return SettingFullNodeIotaUrlSchema
  }

  if (value === SettingsValues.explorerUrl.value) {
    return SettingExplorerUrlSchema
  }
}

/**
 * SettingDialog
 */

const SettingDialog = ({ classes, onCancel, onSave, open, selectedSetting, value }) => {
  const actionText = isEmpty(value) ? 'Add' : 'Edit'
  const titleText = `${actionText} ${selectedSetting.dialogLabel}`
  const validationSchema = getValidationSchema(selectedSetting.value)
  const type = get(SettingsValues[selectedSetting.value], 'type', '')

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <Formik
        validationSchema={validationSchema}
        validateOnChange
        initialValues={{ settingValue: value }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true)
          onSave(values[selectedSetting.value])
          actions.setSubmitting(false)
        }}
        render={({ handleChange, handleBlur, handleSubmit, isValid, errors, touched }) => (
          <Fragment>
            <DialogTitle disableTypography classes={{ root: classes.titleContainer }}>
              <h4 className={classes.titleText}>{titleText}</h4>
            </DialogTitle>
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
                  id={selectedSetting.value}
                  label={selectedSetting.label}
                  type={type}
                  fullWidth
                />
                {errors[selectedSetting.value] && touched[selectedSetting.value] ? (
                  <Typography variant="caption" classes={{ root: classes.error }}>
                    {errors[selectedSetting.value]}
                  </Typography>
                ) : null}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={onCancel} color="primary">
                Cancel
              </Button>
              <Button disabled={!isValid} onClick={handleSubmit} color="primary">
                Save
              </Button>
            </DialogActions>
          </Fragment>
        )}
      />
    </Dialog>
  )
}

/**
 * PropTypes
 */

SettingDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedSetting: PropTypes.object,
  value: PropTypes.string,
}

SettingDialog.defaultProps = {
  selectedSetting: {},
  value: '',
}

/**
 * Styles
 */

const styles = {
  titleContainer: {
    paddingBottom: 0,
  },

  titleText: {
    marginBottom: 0,
  },

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

export default withStyles(styles)(SettingDialog)
