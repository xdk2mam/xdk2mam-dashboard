import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { XYPlot, makeWidthFlexible, LineSeries, XAxis, YAxis, Crosshair, Borders, DiscreteColorLegend } from 'react-vis'
import { isEmpty } from 'lodash'
import { CircularProgress, withStyles } from '@material-ui/core'
import '../../node_modules/react-vis/dist/style.css'
import moment from 'moment'

import Colors from '../helpers/colors'

/**
 * Constants
 */

const LINE_SIZE = 1
const CURVE_TYPE = 'curveBasis'
const Y_PADDING = 80
const DEFAULT_MARGINS = { left: 65, right: 10, top: 10, bottom: 50 }

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

  handleItemsFormat = values => [
    { title: 'X', value: moment.unix(values[0].x).format('DD/MM hh:mm:ss') },
    { title: 'Y', value: values[0].y },
  ]

  handleXAxisFormat = value => `${moment.unix(value).format('mm:ss')}`

  render() {
    const {
      data,
      classes,
      color,
      baseColor,
      height,
      yDomain,
      legendItems,
      onLegendClick,
      disabledSeries,
      isCompare,
    } = this.props
    const { crosshairValues } = this.state

    if (isEmpty(data)) {
      return null
    }

    if (data.length < 1) {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress classes={{ root: classes.loadingSpinner, colorPrimary: classes.loadingColor }} size={25} />
        </div>
      )
    }
    const hasSeries = !isEmpty(data.series)
    const axisStyle = !isEmpty(baseColor) ? { stroke: baseColor } : {}

    return (
      <FlexibleXYPlot
        yPadding={Y_PADDING}
        yDomain={yDomain}
        onMouseLeave={this.handleMouseLeave}
        height={height}
        className={classes.linePlot}
        xType="time"
        margin={DEFAULT_MARGINS}
      >
        {!hasSeries && (
          <LineSeries
            curve={CURVE_TYPE}
            data={data}
            color={disabledSeries.length > 0 ? 'transparent' : color}
            size={LINE_SIZE}
            onNearestX={this.handleNearestX}
          />
        )}
        {hasSeries &&
          data.series.map((series, index) => {
            /** dirty fix to make names unique between original and compare object, necessary for Legends */
            const name = `${data.sensorName}${series.seriesName.toUpperCase()}${isCompare ? ' ' : ''}`

            const isDisabled = disabledSeries.find(i => i === name)

            return (
              <LineSeries
                key={name}
                curve={CURVE_TYPE}
                color={isDisabled ? 'transparent' : color[index]}
                data={series.data}
                size={LINE_SIZE}
              />
            )
          })}
        {/* Borders are necessary to avoid displaying values outside of the default domain 
            cfr.: https://github.com/uber/react-vis/issues/543
            Note: Place it immediately below all <****Series> components
        */}
        <Borders
          style={{
            all: { fill: Colors.WHITE },
          }}
        />
        <DiscreteColorLegend
          items={legendItems}
          orientation="horizontal"
          onItemClick={hasSeries ? onLegendClick : undefined}
        />
        <XAxis style={axisStyle} tickLabelAngle={-45} tickFormat={this.handleXAxisFormat} />
        <YAxis style={axisStyle} />

        <Crosshair values={crosshairValues} titleFormat={this.handleTitleFormat} itemsFormat={this.handleItemsFormat} />
      </FlexibleXYPlot>
    )
  }
}

/**
 * PropTypes
 */

LineChart.propTypes = {
  // Data returns one line chart or three line charts
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  height: PropTypes.number,
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  baseColor: PropTypes.string,
  disabledSeries: PropTypes.array,
  yDomain: PropTypes.array,
  onLegendClick: PropTypes.func,
  legendItems: PropTypes.array,
  isCompare: PropTypes.bool,
}

LineChart.defaultProps = {
  height: 300,
  disabledSeries: [],
  legendItems: [],
  onLegendClick: null,
  yDomain: undefined,
  isCompare: false,
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
    marginBottom: 50,
    fontFamily: 'Roboto, Sans-serif',
  },
}

/**
 * Exports
 */

export default withStyles(styles)(LineChart)
