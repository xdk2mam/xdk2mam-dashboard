import React, { Component } from 'react'

import {
  XYPlot,
  makeWidthFlexible,
  LineSeries,
  ChartLabel,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from 'react-vis'
import { withStyles } from '@material-ui/core'
import '../../node_modules/react-vis/dist/style.css'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

class LineChart extends Component {
  render() {
    const { classes } = this.props

    const { data } = this.props

    return (
      <FlexibleXYPlot height={400} className={classes.linePlot} xType="time">
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis />
        <YAxis />
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
        <LineSeries className="first-series" data={data} />
      </FlexibleXYPlot>
    )
  }
}

const styles = {
  linePlot: {
    marginTop: 50,
    fontFamily: 'Roboto',
  },
}

export default withStyles(styles)(LineChart)
