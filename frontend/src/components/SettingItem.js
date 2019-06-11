import React, { Fragment } from 'react'
import { isEmpty } from 'lodash'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import SettingsValues from '../constants/SettingsValues'
import AddButton from '../components/AddButton'
import MenuButton from '../components/MenuButton'

/**
 * SettingItem
 */

const SettingItem = ({ classes, value, onAddClick, onMenuClick, settingId, type }) => (
  <Fragment>
    <div className={classes.settingHeader}>
      <Typography variant="subtitle2">{SettingsValues[type].label}</Typography>
      {isEmpty(value) && <AddButton onClick={onAddClick} />}
      {!isEmpty(value) && <MenuButton onClick={event => onMenuClick(event, SettingsValues[type].value)} />}
    </div>
    {!isEmpty(value) && <Typography variant="body1">{value}</Typography>}
  </Fragment>
)

/**
 * Styles
 */

const styles = {
  settingHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(SettingItem)
