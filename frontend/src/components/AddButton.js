import React from 'react'
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
