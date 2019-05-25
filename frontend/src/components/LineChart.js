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

import Colors from '../helpers/colors'

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

  onMouseLeave = () => {
    this.setState({ crosshairValues: [] })
  }

  onNearestX = value => {
    const { data } = this.props

    if (isEmpty(data)) {
      return
    }

    this.setState({ crosshairValues: [{ x: value.x, y: value.y }] })
  }

  handleTitleFormat = () => null

  handleItemsFormat = values => [{ title: 'X', value: values[0].x }, { title: 'Y', value: values[0].y }]

  render() {
    const { data, classes, color, baseColor } = this.props
    const { crosshairValues } = this.state

    if (isEmpty(data)) {
      return null
    }

    if (data.length < 2) {
      return (
        <CircularProgress classes={{ root: classes.loadingContainer, colorPrimary: classes.loadingColor }} size={25} />
      )
    }

    const hasSeries = !isEmpty(data.series)
    const axisStyle = !isEmpty(baseColor) ? { stroke: baseColor } : {}

    return (
      <FlexibleXYPlot onMouseLeave={this.onMouseLeave} height={300} className={classes.linePlot} xType="time">
        <XAxis style={axisStyle} />
        <YAxis style={axisStyle} />
        <HorizontalGridLines />
        <VerticalGridLines />
        {!hasSeries && (
          <LineMarkSeries curve="curveMonotoneX" data={data} color={color} size={2} onNearestX={this.onNearestX} />
        )}
        {hasSeries &&
          data.series.map((series, index) => (
            <LineMarkSeries key={index} curve="curveMonotoneX" data={series.data} size={2} />
          ))}
        <Crosshair values={crosshairValues} titleFormat={this.handleTitleFormat} itemsFormat={this.handleItemsFormat} />
      </FlexibleXYPlot>
    )
  }
}

/**
 * Styles
 */

const styles = {
  loadingContainer: {
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
