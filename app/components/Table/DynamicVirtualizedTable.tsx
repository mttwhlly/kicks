import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import type { TableComponents } from 'react-virtuoso';

interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width?: number | 'auto';
  renderCell?: (value: any, row: any) => React.ReactNode;
}

interface VirtualizedTableProps<T extends object> {
  data: T[];
  height?: number | string;
  width?: number | string;
  excludeKeys?: string[];
  columnConfig?: Record<string, Partial<ColumnData>>;
  defaultColumnWidth?: number | 'auto';
  columnOrder?: string[]; // Column ordering array
}

const VirtuosoTableComponents: TableComponents<any> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: 'separate', tableLayout: 'auto' }}
    />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

// Completely rewritten column generation function that prioritizes columnOrder
function generateColumns<T extends object>(
  data: T[],
  excludeKeys: string[],
  columnConfig: Record<string, Partial<ColumnData>>,
  defaultColumnWidth: number | 'auto',
  columnOrder?: string[]
): ColumnData[] {
  if (!data || data.length === 0) return [];

  const firstItem = data[0];
  
  // Get all valid keys (excluding the specified ones)
  const validKeys = Object.keys(firstItem).filter(
    (key) => !excludeKeys.includes(key)
  );
  
  // If we have a column order, use it to build the columns
  if (columnOrder && columnOrder.length > 0) {
    // First, build a Set of valid keys for O(1) lookups
    const validKeysSet = new Set(validKeys);
    
    // Filter the columnOrder to only include keys that exist in the data
    const validColumnOrder = columnOrder.filter(key => validKeysSet.has(key));
    
    // Find any keys in validKeys that aren't in the column order
    const remainingKeys = validKeys.filter(key => !columnOrder.includes(key));
    
    // Combine the valid column order with any remaining keys
    const orderedKeys = [...validColumnOrder, ...remainingKeys];
    
    // Map ordered keys to columns
    return orderedKeys.map(key => {
      const config = columnConfig[key] || {};
      const value = firstItem[key as keyof typeof firstItem];
      const isNumeric = typeof value === 'number';

      return {
        dataKey: key,
        label: config.label || key.charAt(0).toUpperCase() + key.slice(1),
        numeric: config.numeric !== undefined ? config.numeric : isNumeric,
        width: config.width || defaultColumnWidth,
        renderCell: config.renderCell
      };
    });
  }
  
  // If no column order, just map all valid keys to columns
  return validKeys.map(key => {
    const config = columnConfig[key] || {};
    const value = firstItem[key as keyof typeof firstItem];
    const isNumeric = typeof value === 'number';

    return {
      dataKey: key,
      label: config.label || key.charAt(0).toUpperCase() + key.slice(1),
      numeric: config.numeric !== undefined ? config.numeric : isNumeric,
      width: config.width || defaultColumnWidth,
      renderCell: config.renderCell
    };
  });
}

function DynamicVirtualizedTable<T extends object>({
  data,
  height = 400,
  width = '100%',
  excludeKeys = [],
  columnConfig = {},
  defaultColumnWidth = 'auto',
  columnOrder,
}: VirtualizedTableProps<T>) {
  // Generate columns using the new approach
  const columns = React.useMemo(
    () => generateColumns(data, excludeKeys, columnConfig, defaultColumnWidth, columnOrder),
    [
      data.length > 0 ? JSON.stringify(Object.keys(data[0])) : '',
      excludeKeys.join(','),
      JSON.stringify(columnConfig),
      defaultColumnWidth,
      columnOrder?.join(','),
    ]
  );

  const fixedHeaderContent = React.useCallback(() => {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ 
              width: column.width === 'auto' ? undefined : column.width,
              whiteSpace: 'nowrap',
            }}
            sx={{ backgroundColor: 'background.paper' }}
            className="font-bold uppercase"
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }, [columns]);

  const rowContent = React.useCallback(
    (_index: number, row: T) => {
      return (
        <React.Fragment>
          {columns.map((column) => {
            const cellValue = row[column.dataKey as keyof typeof row];
            return (
              <TableCell
                key={column.dataKey}
                align={column.numeric || false ? 'right' : 'left'}
                style={{ 
                  width: column.width === 'auto' ? undefined : column.width,
                }}
              >
                {column.renderCell ? (
                  column.renderCell(cellValue, row)
                ) : cellValue !== undefined ? String(cellValue) : ''}
              </TableCell>
            );
          })}
        </React.Fragment>
      );
    },
    [columns]
  );

  if (!data || data.length === 0 || columns.length === 0) {
    return (
      <Paper
        style={{
          height,
          width,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        No data available
      </Paper>
    );
  }

  return (
    <Paper style={{ height, width }}>
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

export default DynamicVirtualizedTable;