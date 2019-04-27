import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

/**
 * CustomLink
 */

const CustomRouterLink = props => <RouterLink to="/open-collective" {...props} />

const CustomLink = ({ to, children }) => {
  return <Link component={CustomRouterLink}>{children}</Link>
}

/**
 * Exports
 */

export default CustomLink
