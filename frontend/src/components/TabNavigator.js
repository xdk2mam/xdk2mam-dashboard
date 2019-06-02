import React from 'react'
import { Tabs, Tab } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import SensorTypes from '../constants/SensorTypes'
import Colors from '../helpers/colors'

/**
 * TabNavigator
 */

const TabNavigator = ({ selected, classes, onChange }) => (
  <Tabs value={selected} onChange={onChange} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}>
    <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={SensorTypes.WEATHER} />
    <Tab
      disableRipple
      classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
      label={SensorTypes.ENVIRONMENTAL}
    />
    <Tab
      disableRipple
      classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
      label={SensorTypes.INERTIAL}
    />
  </Tabs>
)

/**
 * Styles
 */

const styles = {
  tabsRoot: {
    backgroundColor: Colors.COMP_PURPLE,
    borderBottom: `1px solid ${Colors.WHITE}`,
  },

  tabsIndicator: {
    backgroundColor: Colors.COMP_YELLOW,
  },

  tabRoot: {
    color: Colors.WHITE,
    textTransform: 'initial',
    minWidth: 103,
    fontFamily: 'Roboto, sans-serif',
    '&:hover': {
      color: Colors.WHITE,
      opacity: 1,
    },

    tabSelected: {
      color: Colors.WHITE,
    },

    '&:focus': {
      color: Colors.WHITE,
    },
  },
}

/**
 * Exports
 */

export default withStyles(styles)(TabNavigator)
