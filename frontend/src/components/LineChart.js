import React, { PureComponent } from 'react'
import {
  XYPlot,
  makeWidthFlexible,
  LineMarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Crosshair,
} from 'react-vis'
import { isEmpty } from 'lodash'
import { CircularProgress, withStyles } from '@material-ui/core'
import '../../node_modules/react-vis/dist/style.css'
import moment from 'moment'

import Colors from '../helpers/colors'

/**
 * Constants
 */

const LINE_SIZE = 2
const CURVE_TYPE = 'curveMonotoneX'

/**
 * Helpers
 */

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

/**
 * LineChart
 */

class LineChart extends PureComponent {
  state = {
    crosshairValues: [],
  }

  handleMouseLeave = () => {
    this.setState({ crosshairValues: [] })
  }

  handleNearestX = value => {
    const { data } = this.props

    if (isEmpty(data)) {
      return
    }

    this.setState({ crosshairValues: [{ x: value.x, y: value.y }] })
  }

  handleTitleFormat = () => null

  handleItemsFormat = values => [{ title: 'X', value: moment(values[0].x).format('hh:mm:ss') }, { title: 'Y', value: values[0].y }]

  handleXAxisFormat = value => (`${moment(value).format('mm:ss')}`)

  render() {
    const { data, classes, color, baseColor, height } = this.props
    const { crosshairValues } = this.state

    if (isEmpty(data)) {
      return null
    }

    if (data.length < 2) {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress classes={{ root: classes.loadingSpinner, colorPrimary: classes.loadingColor }} size={25} />
        </div>
        
      )
    }

    const hasSeries = !isEmpty(data.series)
    const axisStyle = !isEmpty(baseColor) ? { stroke: baseColor } : {}

    return (
      <FlexibleXYPlot onMouseLeave={this.handleMouseLeave} height={height} className={classes.linePlot} xType="time">
        <XAxis style={axisStyle} tickLabelAngle={-45} tickFormat={this.handleXAxisFormat} />
        <YAxis style={axisStyle} />

        <HorizontalGridLines />
        <VerticalGridLines />

        <Crosshair values={crosshairValues} titleFormat={this.handleTitleFormat} itemsFormat={this.handleItemsFormat} />

        {!hasSeries && (
          <LineMarkSeries
            curve={CURVE_TYPE}
            data={data}
            color={color}
            size={LINE_SIZE}
            onNearestX={this.handleNearestX}
          />
        )}
        {hasSeries &&
          data.series.map((series, index) => (
            <LineMarkSeries key={index} curve={CURVE_TYPE} data={series.data} size={LINE_SIZE} />
          ))
        }
      </FlexibleXYPlot>
    )
  }
}

/**
 * PropTypes
 */

LineChart.defaultProps = {
  height: 300,
}

/**
 * Styles
 */

const styles = {
  loadingContainer: {
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingSpinner: {
    margin: 50,
  },

  loadingColor: {
    color: Colors.OFF_BLUE,
  },

  linePlot: {
    marginTop: 15,
    fontFamily: 'Roboto, Sans-serif',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(LineChart)
