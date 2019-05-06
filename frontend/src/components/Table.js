import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized'

/**
 * Constants
 */

const MULTI_LEVEL_HEADER_HEIGHT = 56

/**
 * VirtualizedTable
 */

class VirtualizedTable extends PureComponent {
  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const { classes, data, rowHeight, onRowClick } = this.props

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
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
      <React.Fragment>
        {/** @todo: Add table header */}

        {/*
        <TableHead className={classNames(classes.table, classes.tableHeader)}>
          <TableRow>
            <TableCell>Weather</TableCell>
            <TableCell>Gyroscope</TableCell>
            <TableCell>Accelerometer</TableCell>
            <TableCell>Inertial</TableCell>
            <TableCell>Magnetometer</TableCell>
          </TableRow>
        </TableHead>
        */}

        <AutoSizer>
          {({ height, width }) => (
            <Table
              className={classes.table}
              height={height - MULTI_LEVEL_HEADER_HEIGHT}
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
      </React.Fragment>
    )
  }
}

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
  headerHeight: 56,
  rowHeight: 56,
}

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
})

const WrappedVirtualizedTable = withStyles(styles)(VirtualizedTable)

const columns = [
  {
    width: 90,
    flexGrow: 1.0,
    label: 'T',
    dataKey: 'timestamp',
    numeric: true,
  },
  {
    width: 90,
    flexGrow: 1.0,
    label: 'T',
    dataKey: 'temperature',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'P',
    dataKey: 'pressure',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'H',
    dataKey: 'humidity',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'X',
    dataKey: 'gyroscopeX',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'Y',
    dataKey: 'gyroscopeY',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'Z',
    dataKey: 'gyroscopeZ',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'X',
    dataKey: 'accelerometerX',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'Y',
    dataKey: 'accelerometerY',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'Z',
    dataKey: 'accelerometerZ',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'X',
    dataKey: 'inertialX',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'Y',
    dataKey: 'inertialY',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'Z',
    dataKey: 'inertialZ',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'X',
    dataKey: 'magnetometerX',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'Y',
    dataKey: 'magnetometerY',
    numeric: true,
  },
  {
    width: 100,
    flexGrow: 1.0,
    label: 'Z',
    dataKey: 'magnetometerZ',
    numeric: true,
  },
]

function ReactVirtualizedTable(props) {
  return (
    <WrappedVirtualizedTable
      data={props.data}
      rowCount={props.data.length}
      rowGetter={({ index }) => props.data[index]}
      onRowClick={event => console.log(event)}
      columns={columns}
    />
  )
}

export default ReactVirtualizedTable
