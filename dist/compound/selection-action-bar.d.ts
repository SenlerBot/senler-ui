import * as React from 'react';
export interface SelectionActionBarProps {
    selectedCount: number;
    selectedCountLabel: React.ReactNode;
    selectAllChecked: boolean | 'indeterminate';
    selectAllLabel: string;
    clearLabel: string;
    onSelectAllChange: (checked: boolean | 'indeterminate') => void;
    onClear: () => void;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    controlsDisabled?: boolean;
    minTop?: number;
    className?: string;
    toolbarClassName?: string;
    actionsClassName?: string;
}
declare function SelectionActionBar({ selectedCount, selectedCountLabel, selectAllChecked, selectAllLabel, clearLabel, onSelectAllChange, onClear, actions, children, controlsDisabled, minTop, className, toolbarClassName, actionsClassName, }: SelectionActionBarProps): import("react/jsx-runtime").JSX.Element;
export { SelectionActionBar };
