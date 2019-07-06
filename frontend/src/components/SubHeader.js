import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { get, isEmpty } from 'lodash'
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
  handleTimeIntervalClick = value => this.props.onTimeIntervalClick(value)

  render() {
    const {
      classes,
      // deviceName,
      activeDataset,
      datasetsToCompare,
      onFinishDatasetClick,
      selectedTimeInterval,
    } = this.props

    const activeDatasetName = get(activeDataset, 'dataset_name_table')
    const activeDatasetDisplayName = get(activeDataset, 'name')

    const isRecording = !isEmpty(activeDataset) && activeDataset.status === 1
    const isComparing = !isEmpty(datasetsToCompare)

    return (
      <div className={classes.container}>
        <div>
          {isComparing && (
            <Typography variant={TYPOGRAPHY_VARIANT} color={TYPOGRAPHY_COLOR}>
              {/** @todo: add deviceName to the backend */}
              {/* Device Name: <span className={classnames(classes.info, classes.deviceText)}>{deviceName}</span> /  */}
              Comparing Datasets:
              {datasetsToCompare.map((dataset, i) => (
                <span key={dataset.dataset_name_table} className={classes.info}>
                  {` ${dataset.dataset_name_table}${i === 0 ? ' | ' : ''} `}
                </span>
              ))}
            </Typography>
          )}
          {!isComparing && (
            <Typography variant={TYPOGRAPHY_VARIANT} color={TYPOGRAPHY_COLOR}>
              {/** @todo: add deviceName to the backend */}
              {/* Device Name: <span className={classnames(classes.info, classes.deviceText)}>{deviceName}</span> /  */}
              Active Dataset: <span className={classes.info}>{activeDatasetName || activeDatasetDisplayName}</span>
              {isRecording && <span className={classes.info}> | Recording</span>}
            </Typography>
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.timeIntervals}>
            <span className={classes.timeIntervalsTitle}>Time interval:</span>

            {TIME_INTERVALS.map((option, index) => {
              const separator = index === TIME_INTERVALS.length - 1 ? '' : ' / '
              const selected = selectedTimeInterval === option.value

              return (
                <Fragment key={`${TIME_INTERVALS[index].value}`}>
                  <span
                    role="presentation"
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
          {(isRecording || isComparing) && (
            <Button
              variant="outlined"
              size="small"
              className={classes.finishDatasetButton}
              onClick={onFinishDatasetClick}
            >
              {isRecording ? 'Finish Dataset' : 'Finish Comparison'}
            </Button>
          )}
        </div>
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
  // deviceName: PropTypes.string,
  selectedTimeInterval: PropTypes.string,
  datasetsToCompare: PropTypes.array,
  activeDataset: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    endDate: PropTypes.string,
  }),
}

SubHeader.defaultProps = {
  // deviceName: '',
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

  right: {
    display: 'flex',
    flexDirection: 'row',
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
    marginLeft: 20,
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
