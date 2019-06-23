import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { TableCell, TableSortLabel, Tooltip } from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'
import AlarmIcon from '@material-ui/icons/Alarm'
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized'
import { isNil } from 'lodash'

import { TABLE_COLUMNS } from './helpers'
import Colors from '../../helpers/colors'

/** @todo: Use the URL from the user config when backend is ready */
const BASE_TANGLE_NODE_URL = 'https://devnet.thetangle.org/mam/'

/**
 * VirtualizedTable
 */

class VirtualizedTable extends PureComponent {
  cellRenderer = ({ columnIndex, rowIndex }) => {
    const { classes, data, rowHeight, onRowClick } = this.props

    const isNotEvenIndex = rowIndex % 2 !== 0
    const isLastColumn = columnIndex === 18

    if (!isLastColumn) {
      return (
        <TableCell
          component="div"
          className={classNames(classes.tableCell, classes.flexContainer, isNotEvenIndex && classes.row, {
            [classes.noClick]: onRowClick == null,
          })}
          variant="body"
          style={{ height: rowHeight }}
          align="right"
        >
          {data[rowIndex][columnIndex]}
        </TableCell>
      )
    }

    const root = data[rowIndex][columnIndex]
    const rootUrl = `${BASE_TANGLE_NODE_URL}${root}`

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, isNotEvenIndex && classes.row, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align="right"
      >
        {!isNil(root) ? (
          <Tooltip title="View on tangle" placement="top" classes={{ tooltipPlacementTop: classes.tooltip }}>
            <a className={classes.rootLink} href={rootUrl} target="blank">
              <LinkIcon />
            </a>
          </Tooltip>
        ) : (
          <Tooltip title="Not available" placement="top" classes={{ tooltipPlacementTop: classes.tooltip }}>
            <AlarmIcon />
          </Tooltip>
        )}
      </TableCell>
    )
  }

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    }

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      )

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align="right"
      >
        {inner}
      </TableCell>
    )
  }

  render() {
    const { classes, columns, ...tableProps } = this.props

    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={classes.flexContainer}
          >
            {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
              let renderer
              if (cellContentRenderer != null) {
                renderer = cellRendererProps =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index,
                  })
              } else {
                renderer = this.cellRenderer
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classNames(classes.flexContainer, className)}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              )
            })}
          </Table>
        )}
      </AutoSizer>
    )
  }
}

/**
 * PropTypes
 */

VirtualizedTable.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
  root: PropTypes.string.isRequired,
}

VirtualizedTable.defaultProps = {
  headerHeight: 40,
  rowHeight: 40,
}

/**
 * Styles
 */

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderBottom: `1px solid ${Colors.FAFAFA}`,
  },

  tableHeader: {
    width: '100%',
  },

  tableCell: {
    flex: 1,
  },

  noClick: {
    cursor: 'initial',
  },

  row: {
    backgroundColor: Colors.FAFAFA,
  },

  rootLink: {
    color: Colors.BLACK,
    paddingTop: 5,
  },

  tooltip: {
    marginBottom: 0,
  },
})

/**
 * Exports
 */

const WrappedVirtualizedTable = withStyles(styles)(VirtualizedTable)

const ReactVirtualizedTable = props => (
  <Fragment>
    <WrappedVirtualizedTable
      data={props.data}
      rowCount={props.data.length}
      rowGetter={({ index }) => props.data[index]}
      onRowClick={() => {}}
      columns={TABLE_COLUMNS}
    />
  </Fragment>
)

ReactVirtualizedTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default ReactVirtualizedTable
