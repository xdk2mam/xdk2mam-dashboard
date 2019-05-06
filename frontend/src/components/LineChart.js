import React, { Component } from 'react'

import {
  XYPlot,
  makeWidthFlexible,
  LineMarkSeries,
  ChartLabel,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from 'react-vis'
import { withStyles } from '@material-ui/core'
import '../../node_modules/react-vis/dist/style.css'
import Colors from '../helpers/colors'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

class LineChart extends Component {
  render() {
    const { classes, color, baseColor } = this.props

    const { data } = this.props

    return (
      <FlexibleXYPlot height={300} className={classes.linePlot} xType="time">
        <XAxis style={baseColor ? { stroke: baseColor } : {}} />
        <YAxis style={baseColor ? { stroke: baseColor } : {}} />
        {data && !data.series && <LineMarkSeries curve={'curveMonotoneX'} data={data} color={color} size={2} />}
        {data &&
          data.series &&
          data.series.map(series => {
            return <LineMarkSeries curve={'curveMonotoneX'} data={series.data} size={2} />
          })}
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

const styles = {
  linePlot: {
    marginTop: 15,
    fontFamily: 'Roboto',
  },
}

export default withStyles(styles)(LineChart)
