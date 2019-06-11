import React, { useState } from 'react'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography, Menu, MenuItem } from '@material-ui/core'
import { connect } from 'react-redux'

import {
  setEmailDispatcher,
  setFullnodeIotaUrlDispatcher,
  clearEmailDispatcher,
  clearFullnodeIotaUrlDispatcher,
} from '../store/actions/settings'
import Colors from '../helpers/colors'
import SettingsValues from '../constants/SettingsValues'
import Layout from '../components/Layout'
import SettingDialog from '../components/SettingDialog'
import SettingItem from '../components/SettingItem'

/**
 * Settings
 */

const Settings = props => {
  const initialSelectedSetting = {
    label: '',
    dialogLabel: '',
    value: '',
  }

  const [selectedSetting, setSelectedSetting] = useState(initialSelectedSetting)
  const [openDialog, setOpenDialog] = useState(false)
  const [menuAnchorElement, setMenuAnchorElement] = useState(null)

  const handleMenuClick = (event, value) => {
    setMenuAnchorElement(event.currentTarget)
    setSelectedSetting(SettingsValues[value])
  }

  const handleCloseMenu = () => {
    setMenuAnchorElement(null)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    handleCloseMenu()
    setTimeout(() => setSelectedSetting(initialSelectedSetting), 200)
  }

  const handleAddEmailButton = () => {
    setOpenDialog(true)
    setSelectedSetting(SettingsValues.email)
  }

  const handleAddFullNodeIotaUrlButton = () => {
    setOpenDialog(true)
    setSelectedSetting(SettingsValues.fullNodeIotaUrl)
  }

  const handleSave = value => {
    const { dispatchSetEmail, dispatchSetFullNodeIotaUrl } = props

    const selectedSettingValue = selectedSetting.value

    if (selectedSettingValue === SettingsValues.email.value) {
      dispatchSetEmail(value)
    }

    if (selectedSettingValue === SettingsValues.fullNodeIotaUrl.value) {
      dispatchSetFullNodeIotaUrl(value)
    }

    handleCloseDialog()
  }

  const handleRemove = value => {
    const { dispatchClearEmail, dispatchClearFullNodeIotaUrl } = props

    const selectedSettingValue = selectedSetting.value

    if (selectedSettingValue === SettingsValues.email.value) {
      dispatchClearEmail()
    }

    if (selectedSettingValue === SettingsValues.fullNodeIotaUrl.value) {
      dispatchClearFullNodeIotaUrl(value)
    }

    handleCloseMenu()
  }

  const handleEdit = () => {
    setOpenDialog(true)
    handleCloseMenu()
  }

  const { classes, email, fullNodeIotaUrl } = props

  const dialogValue =
    (selectedSetting.value === SettingsValues.email.value && email) ||
    (selectedSetting.value === SettingsValues.fullNodeIotaUrl.value && fullNodeIotaUrl) ||
    ''

  return (
    <Layout>
      <Grid container className={classes.gridInner}>
        <Grid item lg={4} md={8} sm={12} xs={12}>
          <div className={classes.sectionHeader}>
            <Typography variant="h5">Settings</Typography>
          </div>
          <Paper className={classes.root}>
            <div className={classnames(classes.setting, classes.email)}>
              <SettingItem
                type={SettingsValues.email.value}
                value={email}
                onAddClick={handleAddEmailButton}
                onMenuClick={handleMenuClick}
              />
            </div>
            <div className={classes.setting}>
              <SettingItem
                type={SettingsValues.fullNodeIotaUrl.value}
                value={fullNodeIotaUrl}
                onAddClick={handleAddFullNodeIotaUrlButton}
                onMenuClick={handleMenuClick}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
      <SettingDialog
        open={openDialog}
        onCancel={handleCloseDialog}
        onSave={handleSave}
        selectedSetting={selectedSetting}
        value={dialogValue}
      />
      <Menu
        id="simple-menu"
        anchorEl={menuAnchorElement}
        keepMounted
        open={Boolean(menuAnchorElement)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleRemove}>Remove</MenuItem>
      </Menu>
    </Layout>
  )
}

/**
 * Styles
 */

const styles = {
  root: {
    marginTop: 15,
  },

  gridInner: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1%',
  },

  setting: {
    padding: 20,
  },

  settingHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  email: {
    borderBottom: '1px solid',
    borderBottomColor: Colors.GREY,
  },
}

/**
 * Connect
 */

const mapStateToProps = state => ({
  email: state.settings.email,
  fullNodeIotaUrl: state.settings.fullNodeIotaUrl,
})

const mapDispatchToProps = dispatch => ({
  dispatchSetEmail: setEmailDispatcher(dispatch),
  dispatchClearEmail: clearEmailDispatcher(dispatch),
  dispatchSetFullNodeIotaUrl: setFullnodeIotaUrlDispatcher(dispatch),
  dispatchClearFullNodeIotaUrl: clearFullnodeIotaUrlDispatcher(dispatch),
})

/**
 * Exports
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Settings))
