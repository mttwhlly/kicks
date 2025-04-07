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
import { useLocation } from 'react-router';
import withRouterProtection from '~/components/WithRouterProtection/WithRouterProtection';

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

// Define table components outside the component to prevent recreation
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

// Helper function to stably compare arrays
function areArraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item === arr2[index]);
}

// Helper function to get keys from data in a stable way
function getDataKeys<T extends object>(data: T[]): string[] {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]);
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
  // Get the current location to force remount on navigation
  const location = useLocation();
  
  // Store data keys in a ref for stable comparison
  const dataKeysRef = React.useRef<string[]>([]);
  const prevExcludeKeysRef = React.useRef<string[]>([]);
  const prevColumnOrderRef = React.useRef<string[] | undefined>(undefined);
  
  // Create a virtuoso instance ref for cleanup
  const virtuosoRef = React.useRef<any>(null);
  
  // Generate columns with improved dependency tracking
  const columns = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    const firstItem = data[0];
    const currentDataKeys = Object.keys(firstItem);
    
    // Only update if the keys have changed
    if (!areArraysEqual(dataKeysRef.current, currentDataKeys)) {
      dataKeysRef.current = currentDataKeys;
    }
    
    // Check if exclude keys changed
    const excludeKeysChanged = !areArraysEqual(prevExcludeKeysRef.current, excludeKeys);
    if (excludeKeysChanged) {
      prevExcludeKeysRef.current = [...excludeKeys];
    }
    
    // Check if column order changed
    const columnOrderChanged = 
      (columnOrder && !prevColumnOrderRef.current) ||
      (!columnOrder && prevColumnOrderRef.current) ||
      (columnOrder && prevColumnOrderRef.current && 
       !areArraysEqual(columnOrder, prevColumnOrderRef.current));
       
    if (columnOrderChanged && columnOrder) {
      prevColumnOrderRef.current = [...columnOrder];
    }
    
    // Get all valid keys (excluding the specified ones)
    const validKeys = dataKeysRef.current.filter(
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
  }, [
    data, // Only depend on data itself, not stringified keys
    excludeKeys, // Direct dependency on excludeKeys array
    columnOrder, // Direct dependency on columnOrder
    columnConfig, // This is still an object but less likely to change frequently
    defaultColumnWidth,
  ]);

  // Fixed header content with stable reference
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
            className="font-bold uppercase bg-neutral-200"
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }, [columns]);

  // Row content with stable reference
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

  // Cleanup effect when route changes or component unmounts
  React.useEffect(() => {
    return () => {
      // Reset refs on unmount to ensure clean state on remount
      if (virtuosoRef.current) {
        // If virtuoso exposes any cleanup methods, call them here
        // This depends on the specific version and API of react-virtuoso
        if (virtuosoRef.current.scrollToIndex) {
          virtuosoRef.current.scrollToIndex(0);
        }
      }
    };
  }, [location.pathname]); // Clean up when route changes

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
    // Add key based on location to force clean remount between routes
    <Paper style={{ height, width }} key={`table-${location.pathname}`}>
      <TableVirtuoso
        ref={virtuosoRef}
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

export default withRouterProtection(DynamicVirtualizedTable);