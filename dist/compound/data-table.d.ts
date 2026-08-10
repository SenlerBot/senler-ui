import * as React from 'react';
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
export type DataTableClassName<TItem> = string | ((item: TItem, context: DataTableRowContext<TItem>) => string | undefined);
export interface DataTableColumn<TItem> {
    id: string;
    header?: React.ReactNode;
    cell: (item: TItem, context: DataTableRowContext<TItem>) => React.ReactNode;
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
declare function DataTable<TItem>({ items, columns, getItemId, selection, onRowClick, isRowInteractive, getRowDataAttributes, containerClassName, tableClassName, headClassName, bodyClassName, rowClassName, selectedRowClassName, selectionHeadCellClassName, selectionCellClassName, }: DataTableProps<TItem>): React.JSX.Element;
export { DataTable };
