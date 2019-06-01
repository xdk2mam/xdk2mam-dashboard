import React, { Fragment, PureComponent } from 'react'
import classnames from 'classnames'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { isEmpty } from 'lodash'

import Colors from '../helpers/colors'

/**
 * Constants
 */

const TYPOGRAPHY_VARIANT = 'subtitle1'
const TYPOGRAPHY_COLOR = 'inherit'
const TIME_INTERVALS = [{ value: '1m' }, { value: '5m' }, { value: '10m' }, { value: '30m' }, { value: 'All' }]

/**
 * SubHeader
 */

class SubHeader extends PureComponent {
  handleTimeIntervalClick = value => {
    const { onTimeIntervalClick } = this.props
    onTimeIntervalClick(value)
  }

  render() {
    const { classes, deviceName, selectedTimeInterval, activeDataset } = this.props

    return (
      <div className={classes.container}>
        <div>
          <Typography variant={TYPOGRAPHY_VARIANT} color={TYPOGRAPHY_COLOR}>
            Device Name: <span className={classnames(classes.info, classes.deviceText)}>{deviceName}</span> / Active
            Dataset: <span className={classes.info}>{activeDataset}</span>
          </Typography>
        </div>
        <div className={classes.timeIntervals}>
          <span className={classes.timeIntervalsTitle}>Time interval:</span>

          {TIME_INTERVALS.map((option, index) => {
            const separator = index === TIME_INTERVALS.length - 1 ? '' : ' / '
            const selected = selectedTimeInterval === option.value

            return (
              <Fragment key={`${option}-${index}`}>
                <span
                  className={classnames(classes.text, classes.button, selected && classes.selectedButton)}
                  onClick={() => this.handleTimeIntervalClick(option.value)}
                >
                  {option.value}
                </span>
                {!isEmpty(separator) && <span className={classes.separator}>{separator}</span>}
              </Fragment>
            )
          })}
        </div>
      </div>
    )
  }
}

/**
 * Styless
 */

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.BLUE,
    height: 30,
    padding: 24,
    color: Colors.WHITE,
  },

  info: {
    fontWeight: 'bold',
  },

  timeIntervals: {
    display: 'flex',
    alignItems: 'center',
  },

  timeIntervalsTitle: {
    fontSize: '13px',
    fontFamily: 'Roboto, Sans-serif',
  },

  text: {
    width: '35px',
    fontSize: '13px',
    textAlign: 'center',
    fontFamily: 'Roboto, Sans-serif',
  },

  button: {
    cursor: 'pointer',
  },

  selectedButton: {
    fontWeight: 'bold',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(SubHeader)
