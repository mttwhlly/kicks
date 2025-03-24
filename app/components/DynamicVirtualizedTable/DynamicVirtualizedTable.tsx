import * as React from 'react';
import { Link } from 'react-router';
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
  width?: number | 'auto'; // Allow 'auto' for content-based width
  renderCell?: (value: any, row: any) => React.ReactNode;
  order?: number; // Add order property for column ordering
}

interface VirtualizedTableProps<T extends object> {
  data: T[];
  height?: number | string;
  width?: number | string;
  excludeKeys?: string[];
  columnConfig?: Record<string, Partial<ColumnData>>;
  defaultColumnWidth?: number | 'auto'; // Allow 'auto' as default
  columnOrder?: string[]; // Add explicit column order option
  columnLabels?: Record<string, string>; // Add custom column labels option
}

const VirtuosoTableComponents: TableComponents<any> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: 'separate', tableLayout: 'auto' }} // Change from 'fixed' to 'auto' for content-based sizing
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

// Helper function to derive columns from data
function deriveColumns<T extends object>(
  data: T[],
  excludeKeys: string[],
  columnConfig: Record<string, Partial<ColumnData>>,
  defaultColumnWidth: number | 'auto',
  columnOrder?: string[],
  columnLabels?: Record<string, string>
): ColumnData[] {
  if (!data || data.length === 0) return [];

  const firstItem = data[0];
  const keys = Object.keys(firstItem).filter(
    (key) => !excludeKeys.includes(key)
  );

  // Create columns with all properties
  const columns = keys.map((key) => {
    const config = columnConfig[key] || {};
    const value = firstItem[key as keyof typeof firstItem];
    const isNumeric = typeof value === 'number';

    return {
      dataKey: key,
      // Priority: 1. Column labels from props, 2. Config label, 3. Capitalized key
      label: (columnLabels && columnLabels[key]) || 
             config.label || 
             key.charAt(0).toUpperCase() + key.slice(1),
      numeric: config.numeric !== undefined ? config.numeric : isNumeric,
      width: config.width || defaultColumnWidth,
      renderCell: config.renderCell,
      // Set order from config or use a high number as default (to place at the end)
      order: config.order !== undefined ? config.order : 1000,
    };
  });

  // Apply explicit column order if provided
  if (columnOrder && columnOrder.length > 0) {
    // Create a map for O(1) lookup of order by key
    const orderMap = new Map(columnOrder.map((key, index) => [key, index]));
    
    // Apply explicit order for keys that are in the columnOrder array
    columns.forEach(column => {
      if (orderMap.has(column.dataKey)) {
        column.order = orderMap.get(column.dataKey);
      }
    });
  }

  // Sort columns by order
  return columns.sort((a, b) => (a.order || 1000) - (b.order || 1000));
}

function DynamicVirtualizedTable<T extends object>({
  data,
  height = 400,
  width = '100%',
  excludeKeys = [],
  columnConfig = {},
  defaultColumnWidth = 'auto', // Change default to 'auto'
  columnOrder,
  columnLabels,
}: VirtualizedTableProps<T>) {
  // Derive columns only once during initial render or when inputs change
  const columns = React.useMemo(
    () => deriveColumns(data, excludeKeys, columnConfig, defaultColumnWidth, columnOrder, columnLabels),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      data.length > 0 ? data[0] : null, // Only depend on the first item's structure
      excludeKeys.join(','), // Convert arrays to strings for comparison
      JSON.stringify(columnConfig), // Convert objects to strings for comparison
      defaultColumnWidth,
      columnOrder?.join(','), // Add columnOrder to dependencies
      JSON.stringify(columnLabels), // Add columnLabels to dependencies
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
              whiteSpace: 'nowrap', // Prevent header text from wrapping
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
