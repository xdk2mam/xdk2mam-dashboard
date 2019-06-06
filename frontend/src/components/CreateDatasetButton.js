import React from 'react'
import classnames from 'classnames'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Colors from '../helpers/colors'

/**
 * CreateDatasetButton
 */

const CreateDatasetButton = ({ classes, onClick, style }) => (
  <Button variant="contained" color="primary" className={classnames(classes.button, style)} onClick={onClick}>
    Create Dataset
  </Button>
)

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
    lineHeight: 1.5,
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: Colors.BLUE,
    borderColor: Colors.BLUE,
    '&:hover': {
      backgroundColor: Colors.BLEU,
      borderColor: Colors.BLEU,
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: Colors.COMP_PURPLE,
      borderColor: Colors.PURPLE,
    },
  },
}

/**
 * Exports
 */

export default withStyles(styles)(CreateDatasetButton)
