import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import SettingsValues from '../constants/SettingsValues'
import AddButton from './AddButton'
import MenuButton from './MenuButton'

/**
 * SettingItem
 */

const SettingItem = ({ classes, value, onAddClick, onMenuClick, type }) => (
  <Fragment>
    <div className={classes.settingHeader}>
      <Typography variant="subtitle2">{SettingsValues[type].dialogLabel}</Typography>
      {isEmpty(value) && <AddButton onClick={onAddClick} />}
      {!isEmpty(value) && <MenuButton onClick={event => onMenuClick(event, SettingsValues[type].value)} />}
    </div>
    {!isEmpty(value) && <Typography variant="body1">{value}</Typography>}
  </Fragment>
)

/**
 * PropTypes
 */

SettingItem.propTypes = {
  classes: PropTypes.object.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
}

SettingItem.defaultProps = {
  type: null,
  value: null,
}

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
