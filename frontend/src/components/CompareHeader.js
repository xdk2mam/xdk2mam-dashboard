import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Colors from '../helpers/colors'

/**
 * Constants
 */

const TYPOGRAPHY_VARIANT = 'subtitle1'
const TYPOGRAPHY_COLOR = 'inherit'

/**
 * CompareHeader
 */

const CompareHeader = ({ classes, datasetsToCompare }) => {
  return (
    <Grid container className={classes.container}>
      {datasetsToCompare.map((dataset, i) => (
        <Grid item sm={6} key={dataset.dataset_name_table} className={i === 1 ? classes.rightContainer : undefined}>
          <Typography variant={TYPOGRAPHY_VARIANT} color={TYPOGRAPHY_COLOR} className={classes.text}>
            {dataset.dataset_name_table}
          </Typography>
        </Grid>
      ))}
    </Grid>
  )
}

/**
 * PropTypes
 */

CompareHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  datasetsToCompare: PropTypes.array.isRequired,
}

CompareHeader.defaultProps = {}

/**
 * Styles
 */

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rightContainer: {
    backgroundColor: Colors.LIGHT_GREY,
  },

  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(CompareHeader)
