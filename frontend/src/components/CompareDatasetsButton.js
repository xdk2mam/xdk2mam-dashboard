import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Colors from '../helpers/colors'

/**
 * CompareDatasetsButton
 */

const CompareDatasetsButton = ({ classes, onClick, style }) => (
  <Button variant="outlined" color="primary" className={classnames(classes.button, style)} onClick={onClick}>
    Compare Datasets
  </Button>
)

/**
 * PropTypes
 */

CompareDatasetsButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.string,
}

/**
 * Styles
 */

const styles = {
  button: {
    boxShadow: 'none',
    textTransform: 'uppercase',
    fontSize: 14,
    padding: '6px 12px',
    border: '1px solid',
    marginRight: 10,
    lineHeight: 1.5,
    fontFamily: 'Roboto, sans-serif',
    borderColor: Colors.BLUE,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(CompareDatasetsButton)
