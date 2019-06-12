import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { isEmpty } from 'lodash'

/**
 * SettingDialog
 */

const SettingDialog = ({ classes, onCancel, onSave, open, selectedSetting, value }) => {
  const [settingValue, setSettingValue] = useState(value)

  useEffect(() => setSettingValue(value), [value])

  const handleChange = () => event => {
    setSettingValue(event.target.value)
  }

  const handleSaveClick = () => {
    onSave(settingValue)
  }

  const actionText = isEmpty(value) ? 'Add' : 'Edit'
  const titleText = `${actionText} ${selectedSetting.dialogLabel}`

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <DialogTitle disableTypography classes={{ root: classes.titleContainer }}>
        <h4 className={classes.titleText}>{titleText}</h4>
      </DialogTitle>
      <DialogContent>
        <TextField
          inputProps={{
            maxLength: 50,
          }}
          onChange={handleChange(settingValue)}
          value={settingValue}
          autoFocus
          margin="dense"
          id={selectedSetting.value}
          label={selectedSetting.label}
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveClick} color="primary">
          Save
        </Button>
      </DialogActions>
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
}

/**
 * Exports
 */

export default withStyles(styles)(SettingDialog)
