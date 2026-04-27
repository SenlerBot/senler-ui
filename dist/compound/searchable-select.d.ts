import { type ComponentProps, type ReactNode } from 'react';
import { type GroupBase, type Props as ReactSelectProps } from 'react-select';
import { type AsyncProps as ReactAsyncSelectProps } from 'react-select/async';
export declare const searchableSelectDefaults: {
    readonly dropdownIndicator: true;
    readonly loadingMessage: "Loading...";
    readonly noOptionsMessage: "No options";
    readonly placeholder: "Select...";
};
type SearchableSelectOwnProps = {
    dropdownIndicator?: boolean;
    error?: boolean;
    helperText?: ReactNode;
    label?: ReactNode;
    wrapperProps?: ComponentProps<'div'>;
};
export type SearchableSelectProps<OptionType, IsMulti extends boolean = false> = ReactSelectProps<OptionType, IsMulti, GroupBase<OptionType>> & SearchableSelectOwnProps;
export type AsyncSearchableSelectProps<OptionType, IsMulti extends boolean = false> = ReactAsyncSelectProps<OptionType, IsMulti, GroupBase<OptionType>> & SearchableSelectOwnProps;
export declare function SearchableSelect<OptionType, IsMulti extends boolean = false>({ classNames, components, dropdownIndicator, error, helperText, inputId, label, loadingMessage, noOptionsMessage, placeholder, unstyled, wrapperProps, ...props }: SearchableSelectProps<OptionType, IsMulti>): import("react/jsx-runtime").JSX.Element;
export declare function AsyncSearchableSelect<OptionType, IsMulti extends boolean = false>({ classNames, components, dropdownIndicator, error, helperText, inputId, label, loadingMessage, noOptionsMessage, placeholder, unstyled, wrapperProps, ...props }: AsyncSearchableSelectProps<OptionType, IsMulti>): import("react/jsx-runtime").JSX.Element;
export {};
