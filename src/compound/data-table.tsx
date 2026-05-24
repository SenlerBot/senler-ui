import * as React from 'react';

import { CheckBox } from '../atoms/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../atoms/table';
import { cn } from '../lib/utils';

export interface DataTableDataAttributes {
  [key: `data-${string}`]: string | number | undefined;
}

export interface DataTableRowContext<TItem> {
  item: TItem;
  itemId: string;
  isSelected: boolean;
  isSelectionEnabled: boolean;
  isSelectionMode: boolean;
}

export type DataTableClassName<TItem> =
  | string
  | ((
      item: TItem,
      context: DataTableRowContext<TItem>,
    ) => string | undefined);

export interface DataTableColumn<TItem> {
  id: string;
  header?: React.ReactNode;
  cell: (
    item: TItem,
    context: DataTableRowContext<TItem>,
  ) => React.ReactNode;
  headClassName?: string;
  cellClassName?: DataTableClassName<TItem>;
  preventRowClick?: boolean;
  truncate?: boolean;
}

export interface DataTableSelection<TItem> {
  selectedIds: string[];
  onSelectedIdsChange: (selectedIds: string[]) => void;
  getRowLabel: (item: TItem) => string;
  selectAllLabel: string;
  deselectAllLabel?: string;
  isRowSelectable?: (item: TItem) => boolean;
}

export interface DataTableProps<TItem> {
  items: TItem[];
  columns: DataTableColumn<TItem>[];
  getItemId: (item: TItem) => string;
  selection?: DataTableSelection<TItem>;
  onRowClick?: (item: TItem) => void;
  isRowInteractive?: (item: TItem) => boolean;
  getRowDataAttributes?: (item: TItem) => DataTableDataAttributes;
  containerClassName?: string;
  tableClassName?: string;
  headClassName?: string;
  bodyClassName?: string;
  rowClassName?: DataTableClassName<TItem>;
  selectedRowClassName?: string;
  selectionHeadCellClassName?: string;
  selectionCellClassName?: DataTableClassName<TItem>;
}

function resolveDataTableClassName<TItem>(
  className: DataTableClassName<TItem> | undefined,
  item: TItem,
  context: DataTableRowContext<TItem>,
) {
  if (typeof className === 'function') {
    return className(item, context);
  }

  return className;
}

function DataTable<TItem>({
  items,
  columns,
  getItemId,
  selection,
  onRowClick,
  isRowInteractive,
  getRowDataAttributes,
  containerClassName,
  tableClassName,
  headClassName,
  bodyClassName,
  rowClassName,
  selectedRowClassName = '[&_td]:bg-primary/5',
  selectionHeadCellClassName,
  selectionCellClassName,
}: DataTableProps<TItem>) {
  const hasTruncatedColumns = columns.some((column) => column.truncate === true);
  const isSelectionEnabled = selection !== undefined;
  const isSelectionMode =
    isSelectionEnabled && (selection?.selectedIds.length ?? 0) > 0;
  const selectedIdSet = React.useMemo(
    () => new Set(selection?.selectedIds ?? []),
    [selection?.selectedIds],
  );
  const selectableIds = React.useMemo(() => {
    if (!selection) {
      return [];
    }

    return items
      .filter((item) => selection.isRowSelectable?.(item) ?? true)
      .map(getItemId);
  }, [getItemId, items, selection]);
  const selectedVisibleIds = selectableIds.filter((id) =>
    selectedIdSet.has(id),
  );
  const selectAllChecked =
    selectableIds.length > 0 && selectedVisibleIds.length === selectableIds.length
      ? true
      : selectedVisibleIds.length > 0
        ? 'indeterminate'
        : false;
  const selectAllLabel =
    selectAllChecked === true && selection?.deselectAllLabel
      ? selection.deselectAllLabel
      : selection?.selectAllLabel;

  const changeSelectedIds = (selectedIds: string[]) => {
    selection?.onSelectedIdsChange(selectedIds);
  };

  const toggleAllVisibleRows = (checked: boolean | 'indeterminate') => {
    if (!selection) {
      return;
    }

    if (checked === true) {
      const nextIds = [...selection.selectedIds];

      for (const id of selectableIds) {
        if (!nextIds.includes(id)) {
          nextIds.push(id);
        }
      }

      changeSelectedIds(nextIds);
      return;
    }

    const visibleIdSet = new Set(selectableIds);
    changeSelectedIds(
      selection.selectedIds.filter((id) => !visibleIdSet.has(id)),
    );
  };

  const toggleRowSelection = (item: TItem, shouldSelect: boolean) => {
    if (!selection) {
      return;
    }

    const itemId = getItemId(item);

    if (shouldSelect) {
      if (selection.selectedIds.includes(itemId)) {
        return;
      }

      changeSelectedIds([...selection.selectedIds, itemId]);
      return;
    }

    changeSelectedIds(selection.selectedIds.filter((id) => id !== itemId));
  };

  const handleRowActivation = (
    item: TItem,
    context: DataTableRowContext<TItem>,
    isSelectable: boolean,
    isInteractive: boolean,
  ) => {
    if (isSelectable && context.isSelectionMode) {
      toggleRowSelection(item, !context.isSelected);
      return;
    }

    if (isInteractive) {
      onRowClick?.(item);
    }
  };

  return (
    <TableContainer
      className={cn('min-w-0 max-w-full bg-transparent', containerClassName)}
    >
      <Table
        className={cn(
          'border-separate border-spacing-y-0',
          hasTruncatedColumns ? 'table-fixed' : 'table-auto',
          tableClassName,
        )}
      >
        <TableHead className={cn('hidden sm:table-header-group', headClassName)}>
          <TableRow>
            {isSelectionEnabled ? (
              <TableHeadCell
                className={cn(
                  'w-10 border-0 px-2 py-1 sm:px-3',
                  selectionHeadCellClassName,
                )}
              >
                <CheckBox
                  checked={selectAllChecked}
                  disabled={selectableIds.length === 0}
                  onCheckedChange={toggleAllVisibleRows}
                  aria-label={selectAllLabel}
                  title={selectAllLabel}
                />
              </TableHeadCell>
            ) : null}
            {columns.map((column) => (
              <TableHeadCell
                key={column.id}
                className={cn(
                  'border-0 px-3 py-1 text-xs font-medium text-muted-foreground',
                  column.truncate && 'min-w-0 max-w-0 overflow-hidden',
                  column.headClassName,
                )}
              >
                {column.header}
              </TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={bodyClassName}>
          {items.map((item) => {
            const itemId = getItemId(item);
            const isSelectable =
              selection !== undefined &&
              (selection.isRowSelectable?.(item) ?? true);
            const isSelected = isSelectable && selectedIdSet.has(itemId);
            const rowContext = {
              item,
              itemId,
              isSelected,
              isSelectionEnabled,
              isSelectionMode,
            };
            const isInteractive =
              onRowClick !== undefined && (isRowInteractive?.(item) ?? true);
            const canActivateRow =
              isInteractive || (isSelectable && isSelectionMode);

            return (
              <TableRow
                key={itemId}
                className={cn(
                  'group transition-colors',
                  resolveDataTableClassName(rowClassName, item, rowContext),
                  isSelected && selectedRowClassName,
                )}
                tabIndex={canActivateRow ? 0 : undefined}
                role={canActivateRow ? 'button' : undefined}
                onClick={() =>
                  handleRowActivation(
                    item,
                    rowContext,
                    isSelectable,
                    isInteractive,
                  )
                }
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) {
                    return;
                  }

                  if (event.key !== 'Enter' && event.key !== ' ') {
                    return;
                  }

                  event.preventDefault();
                  handleRowActivation(
                    item,
                    rowContext,
                    isSelectable,
                    isInteractive,
                  );
                }}
                {...getRowDataAttributes?.(item)}
              >
                {isSelectionEnabled ? (
                  <TableCell
                    className={cn(
                      'w-10 rounded-l-xl border-0 bg-card px-2 py-2 group-hover:bg-muted/50 sm:px-3 sm:py-3',
                      resolveDataTableClassName(
                        selectionCellClassName,
                        item,
                        rowContext,
                      ),
                    )}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <CheckBox
                      checked={isSelected}
                      disabled={!isSelectable}
                      onCheckedChange={(checked) =>
                        toggleRowSelection(item, checked === true)
                      }
                      aria-label={selection.getRowLabel(item)}
                      title={selection.getRowLabel(item)}
                    />
                  </TableCell>
                ) : null}
                {columns.map((column, columnIndex) => (
                  <TableCell
                    key={column.id}
                    className={cn(
                      'border-0 bg-card px-2 py-2 group-hover:bg-muted/50 sm:px-3 sm:py-3',
                      column.truncate && 'min-w-0 max-w-0 overflow-hidden',
                      !isSelectionEnabled &&
                        columnIndex === 0 &&
                        'rounded-l-xl',
                      columnIndex === columns.length - 1 && 'rounded-r-xl',
                      resolveDataTableClassName(
                        column.cellClassName,
                        item,
                        rowContext,
                      ),
                    )}
                    onClick={
                      column.preventRowClick
                        ? (event) => event.stopPropagation()
                        : undefined
                    }
                  >
                    {column.cell(item, rowContext)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { DataTable };
