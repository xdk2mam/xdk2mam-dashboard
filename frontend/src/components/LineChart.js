import React, { PureComponent } from 'react'
import {
  XYPlot,
  makeWidthFlexible,
  LineMarkSeries,
  // ChartLabel,
  // VerticalGridLines,
  // HorizontalGridLines,
  XAxis,
  YAxis,
} from 'react-vis'
import { isEmpty } from 'lodash'
import { withStyles } from '@material-ui/core'
import '../../node_modules/react-vis/dist/style.css'

/**
 * Helpers
 */

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

/**
 * LineChart
 */

class LineChart extends PureComponent {
  render() {
    const { data, classes, color, baseColor } = this.props

    if (isEmpty(data)) {
      return null
    }

    const hasSeries = !isEmpty(data.series)

    return (
      <FlexibleXYPlot height={300} className={classes.linePlot} xType="time">
        <XAxis style={baseColor ? { stroke: baseColor } : {}} />
        <YAxis style={baseColor ? { stroke: baseColor } : {}} />
        {!hasSeries && <LineMarkSeries curve={'curveMonotoneX'} data={data} color={color} size={2} />}
        {hasSeries &&
          data.series.map((series, index) => (
            <LineMarkSeries key={index} curve={'curveMonotoneX'} data={series.data} size={2} />
          ))}
        {/* TO DO: INCLUDE THESE LATER WITH PROPER STYLES 
          <HorizontalGridLines />
          <VerticalGridLines /> 
          <ChartLabel text="X Axis" className="alt-x-label" includeMargin={false} xPercent={0.025} yPercent={1.01} />
          <ChartLabel
            text="Y Axis"
            className="alt-y-label"
            includeMargin={false}
            xPercent={0.06}
            yPercent={0.06}
            style={{
              transform: 'rotate(-90)',
              textAnchor: 'end',
            }}
          /> 
        */}
      </FlexibleXYPlot>
    )
  }
}

/**
 * Styles
 */

const styles = {
  linePlot: {
    marginTop: 15,
    fontFamily: 'Roboto',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(LineChart)
