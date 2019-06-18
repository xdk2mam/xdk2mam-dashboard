import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import LabelItem from './MaxMinAvgLabelItem'
import Colors from '../helpers/colors'

/**
 * MaxMinAvgLabels
 */

const MaxMinAvgLabels = ({ classes, title, maxValue, minValue, avgValue, greyBackground }) => (
  <div className={classNames(classes.container, greyBackground && classes.greyBackground)}>
    {!isEmpty(title) && (
      <Typography variant="caption" color="inherit" className={classes.title}>
        {title}
      </Typography>
    )}
    <LabelItem label="Max" value={maxValue} />
    <LabelItem label="Min" value={minValue} />
    <LabelItem label="Avg" value={avgValue} />
  </div>
)

/**
 * PropTypes
 */

MaxMinAvgLabels.propTypes = {
  title: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  avgValue: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  greyBackground: PropTypes.bool,
}

MaxMinAvgLabels.defaultProps = {
  title: null,
  greyBackground: false,
}

/**
 * Styles
 */

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },

  greyBackground: {
    backgroundColor: Colors.FAFAFA,
  },

  title: {
    fontWeight: 'bold',
    paddingRight: 20,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(MaxMinAvgLabels)
