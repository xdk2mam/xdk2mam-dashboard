import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

/**
 * AddButton
 */

const AddButton = ({ classes, onClick }) => (
  <Button variant="outlined" color="primary" className={classes.button} onClick={onClick}>
    Add
  </Button>
)

/**
 * PropTypes
 */

AddButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

/**
 * Styles
 */

const styles = {
  button: {
    textTransform: 'none',
    fontSize: 12,
  },
}

/**
 * Exports
 */

export default withStyles(styles)(AddButton)
