import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
// import { isEmpty } from 'lodash'
import Colors from '../helpers/colors'

/**
 * Constants
 */

const TYPOGRAPHY_VARIANT = 'subtitle1'
const TYPOGRAPHY_COLOR = 'inherit'
// const TIME_INTERVALS = [{ value: '1m' }, { value: '5m' }, { value: '10m' }, { value: '30m' }, { value: 'All' }]

/**
 * SubHeader
 */

class SubHeader extends PureComponent {
  handleTimeIntervalClick = value => {
    const { onTimeIntervalClick } = this.props
    onTimeIntervalClick(value)
  }

  render() {
    const { classes, deviceName, activeDataset, onFinishDatasetClick } = this.props

    return (
      <div className={classes.container}>
        <div>
          <Typography variant={TYPOGRAPHY_VARIANT} color={TYPOGRAPHY_COLOR}>
            Device Name: <span className={classnames(classes.info, classes.deviceText)}>{deviceName}</span> / Active
            Dataset: <span className={classes.info}>{activeDataset}</span>
          </Typography>
        </div>
        {/** @todo Move time intervals to line charts as quantity intervals */}
        {/* <div className={classes.timeIntervals}>
          <span className={classes.timeIntervalsTitle}>Time interval:</span>

          {TIME_INTERVALS.map((option, index) => {
            const separator = index === TIME_INTERVALS.length - 1 ? '' : ' / '
            const selected = this.props.selectedTimeInterval === option.value

            return (
              <React.Fragment key={`${option}-${index}`}>
                <span
                  className={classnames(classes.text, classes.button, selected && classes.selectedButton)}
                  onClick={() => this.handleTimeIntervalClick(option.value)}
                >
                  {option.value}
                </span>
                {!isEmpty(separator) && <span className={classes.separator}>{separator}</span>}
              </React.Fragment>
            )
          })}
        </div> */}
        <Button variant="outlined" size="small" className={classes.finishDatasetButton} onClick={onFinishDatasetClick}>
          Finish Dataset
        </Button>
      </div>
    )
  }
}

/**
 * PropTypes
 */

SubHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  onFinishDatasetClick: PropTypes.func.isRequired,
  onTimeIntervalClick: PropTypes.func.isRequired,
  deviceName: PropTypes.string,
  activeDataset: PropTypes.string,
}

SubHeader.defaultProps = {
  deviceName: '',
  activeDataset: '',
}

/**
 * Styles
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

  finishDatasetButton: {
    fontFamily: 'Roboto, sans-serif',
    textTransform: 'uppercase',
    color: Colors.WHITE,
    borderColor: Colors.WHITE,
  },

  selectedButton: {
    fontWeight: 'bold',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(SubHeader)
