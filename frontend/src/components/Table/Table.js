import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized'

import { TABLE_COLUMNS } from './helpers'
import Colors from '../../helpers/colors'

/**
 * VirtualizedTable
 */

class VirtualizedTable extends PureComponent {
  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const { classes, data, rowHeight, onRowClick } = this.props

    const isNotEvenIndex = rowIndex % 2 !== 0

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
    backgroundColor: Colors.GREY,
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

export default ReactVirtualizedTable
