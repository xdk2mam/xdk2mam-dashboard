import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import LabelItem from './MaxMinAvgLabelItem'

/**
 * MaxMinAvgLabels
 */

const MaxMinAvgLabels = ({ classes, title, maxValue, minValue, avgValue }) => (
  <div className={classes.container}>
    {console.log(title)}
    {!isEmpty(title) && (
      <Typography variant="caption" color="inherit" className={classes.title}>
        {title}
      </Typography>
    )}
    <LabelItem label={'Max'} value={maxValue} />
    <LabelItem label={'Min'} value={minValue} />
    <LabelItem label={'Avg'} value={avgValue} />
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
}

MaxMinAvgLabels.defaultProps = {
  title: null,
}

/**
 * Styles
 */

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 5,
    paddingBottom: 5,
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
