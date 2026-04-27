import { type ComponentProps, type ReactNode } from 'react';
import { ChevronDown, XIcon } from 'lucide-react';
import ReactSelect, {
  components as reactSelectComponents,
  type ClearIndicatorProps,
  type DropdownIndicatorProps,
  type GroupBase,
  type MultiValueRemoveProps,
  type Props as ReactSelectProps,
} from 'react-select';
import ReactAsyncSelect, {
  type AsyncProps as ReactAsyncSelectProps,
} from 'react-select/async';

import { FieldDescription, FieldError } from '../atoms/field';
import { Label } from '../atoms/label';
import {
  overlayLayerClassName,
  overlaySolidSurfaceClassName,
} from '../lib/overlay-styles';
import { cn } from '../lib/utils';

export const searchableSelectDefaults = {
  dropdownIndicator: true,
  loadingMessage: 'Loading...',
  noOptionsMessage: 'No options',
  placeholder: 'Select...',
} as const satisfies {
  dropdownIndicator: boolean;
  loadingMessage: string;
  noOptionsMessage: string;
  placeholder: string;
};

type ReactSelectClassNames<OptionType, IsMulti extends boolean> =
  ReactSelectProps<OptionType, IsMulti, GroupBase<OptionType>>['classNames'];

type SearchableSelectOwnProps = {
  dropdownIndicator?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  label?: ReactNode;
  wrapperProps?: ComponentProps<'div'>;
};

export type SearchableSelectProps<
  OptionType,
  IsMulti extends boolean = false,
> = ReactSelectProps<OptionType, IsMulti, GroupBase<OptionType>> &
  SearchableSelectOwnProps;

export type AsyncSearchableSelectProps<
  OptionType,
  IsMulti extends boolean = false,
> = ReactAsyncSelectProps<OptionType, IsMulti, GroupBase<OptionType>> &
  SearchableSelectOwnProps;

function getNoOptionsMessage() {
  return searchableSelectDefaults.noOptionsMessage;
}

function getLoadingMessage() {
  return searchableSelectDefaults.loadingMessage;
}

function buildSearchableSelectClassNames<
  OptionType,
  IsMulti extends boolean,
>(
  error: boolean | undefined,
  classNames: ReactSelectClassNames<OptionType, IsMulti>,
): ReactSelectClassNames<OptionType, IsMulti> {
  return {
    clearIndicator: (state) =>
      cn(
        'flex cursor-pointer items-center px-2 text-muted-foreground transition-colors hover:text-foreground',
        classNames?.clearIndicator?.(state),
      ),
    container: (state) => cn('w-full', classNames?.container?.(state)),
    control: (state) =>
      cn(
        'min-h-10 rounded-md border border-input bg-background text-sm transition-colors',
        'focus-within:border-primary',
        state.isDisabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-text',
        error ? 'border-destructive focus-within:border-destructive' : null,
        classNames?.control?.(state),
      ),
    dropdownIndicator: (state) =>
      cn(
        'flex cursor-pointer items-center px-2 text-muted-foreground transition-colors hover:text-foreground',
        state.selectProps.menuIsOpen ? 'rotate-180' : null,
        classNames?.dropdownIndicator?.(state),
      ),
    group: (state) => cn('px-1 py-1', classNames?.group?.(state)),
    groupHeading: (state) =>
      cn(
        'px-2 py-1.5 text-xs font-medium text-muted-foreground',
        classNames?.groupHeading?.(state),
      ),
    indicatorsContainer: (state) =>
      cn('shrink-0', classNames?.indicatorsContainer?.(state)),
    input: (state) => cn('text-foreground', classNames?.input?.(state)),
    loadingIndicator: (state) =>
      cn('px-2 text-muted-foreground', classNames?.loadingIndicator?.(state)),
    loadingMessage: (state) =>
      cn(
        'px-3 py-2 text-sm text-muted-foreground',
        classNames?.loadingMessage?.(state),
      ),
    menu: (state) =>
      cn(
        overlayLayerClassName,
        'mt-1',
        overlaySolidSurfaceClassName,
        classNames?.menu?.(state),
      ),
    menuList: (state) =>
      cn('max-h-72 overflow-auto p-1', classNames?.menuList?.(state)),
    menuPortal: (state) => cn('z-50', classNames?.menuPortal?.(state)),
    multiValue: (state) =>
      cn(
        'm-0 flex h-[22px] items-center overflow-hidden rounded border border-border bg-background',
        classNames?.multiValue?.(state),
      ),
    multiValueLabel: (state) =>
      cn(
        'flex items-center px-1.5 text-xs text-foreground',
        classNames?.multiValueLabel?.(state),
      ),
    multiValueRemove: (state) =>
      cn(
        'flex h-full cursor-pointer items-center border-l border-border px-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        classNames?.multiValueRemove?.(state),
      ),
    noOptionsMessage: (state) =>
      cn(
        'px-3 py-2 text-sm text-muted-foreground',
        classNames?.noOptionsMessage?.(state),
      ),
    option: (state) =>
      cn(
        'cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        state.isSelected
          ? 'bg-primary text-primary-foreground'
          : 'text-popover-foreground',
        !state.isSelected && state.isFocused
          ? 'bg-accent text-accent-foreground'
          : null,
        state.isDisabled ? 'cursor-not-allowed opacity-50' : null,
        classNames?.option?.(state),
      ),
    placeholder: (state) =>
      cn('text-muted-foreground', classNames?.placeholder?.(state)),
    singleValue: (state) =>
      cn('text-foreground', classNames?.singleValue?.(state)),
    valueContainer: (state) =>
      cn(
        'flex min-h-10 flex-1 items-center gap-1 px-3 py-1',
        classNames?.valueContainer?.(state),
      ),
  };
}

function SearchableSelectDropdownIndicator<
  OptionType,
  IsMulti extends boolean,
  Group extends GroupBase<OptionType>,
>(props: DropdownIndicatorProps<OptionType, IsMulti, Group>) {
  return (
    <reactSelectComponents.DropdownIndicator {...props}>
      <ChevronDown className='size-4' />
    </reactSelectComponents.DropdownIndicator>
  );
}

function SearchableSelectClearIndicator<
  OptionType,
  IsMulti extends boolean,
  Group extends GroupBase<OptionType>,
>(props: ClearIndicatorProps<OptionType, IsMulti, Group>) {
  return (
    <reactSelectComponents.ClearIndicator {...props}>
      <XIcon className='size-4' />
    </reactSelectComponents.ClearIndicator>
  );
}

function SearchableSelectMultiValueRemove<
  OptionType,
  IsMulti extends boolean,
  Group extends GroupBase<OptionType>,
>(props: MultiValueRemoveProps<OptionType, IsMulti, Group>) {
  return (
    <reactSelectComponents.MultiValueRemove {...props}>
      <XIcon className='size-3.5' />
    </reactSelectComponents.MultiValueRemove>
  );
}

function buildSearchableSelectComponents<
  OptionType,
  IsMulti extends boolean,
>(
  dropdownIndicator: boolean | undefined,
  components: SearchableSelectProps<OptionType, IsMulti>['components'],
) {
  return {
    ClearIndicator: SearchableSelectClearIndicator,
    DropdownIndicator: dropdownIndicator
      ? SearchableSelectDropdownIndicator
      : null,
    IndicatorSeparator: null,
    MultiValueRemove: SearchableSelectMultiValueRemove,
    ...components,
  } satisfies SearchableSelectProps<OptionType, IsMulti>['components'];
}

function SearchableSelectField({
  children,
  error,
  helperText,
  inputId,
  label,
  wrapperProps,
}: {
  children: ReactNode;
  error?: boolean;
  helperText?: ReactNode;
  inputId?: string;
  label?: ReactNode;
  wrapperProps?: ComponentProps<'div'>;
}) {
  return (
    <div data-slot='searchable-select-field' {...wrapperProps}>
      {label ? (
        <Label htmlFor={inputId} className='mb-1.5 text-sm'>
          {label}
        </Label>
      ) : null}

      {children}

      {error && helperText ? <FieldError>{helperText}</FieldError> : null}
      {!error && helperText ? (
        <FieldDescription className='mt-1.5'>{helperText}</FieldDescription>
      ) : null}
    </div>
  );
}

export function SearchableSelect<
  OptionType,
  IsMulti extends boolean = false,
>({
  classNames,
  components,
  dropdownIndicator = searchableSelectDefaults.dropdownIndicator,
  error,
  helperText,
  inputId,
  label,
  loadingMessage,
  noOptionsMessage,
  placeholder,
  unstyled,
  wrapperProps,
  ...props
}: SearchableSelectProps<OptionType, IsMulti>) {
  return (
    <SearchableSelectField
      error={error}
      helperText={helperText}
      inputId={inputId}
      label={label}
      wrapperProps={wrapperProps}
    >
      <ReactSelect
        aria-invalid={error || undefined}
        classNames={buildSearchableSelectClassNames(error, classNames)}
        components={buildSearchableSelectComponents(
          dropdownIndicator,
          components,
        )}
        inputId={inputId}
        loadingMessage={loadingMessage ?? getLoadingMessage}
        noOptionsMessage={noOptionsMessage ?? getNoOptionsMessage}
        placeholder={placeholder ?? searchableSelectDefaults.placeholder}
        unstyled={unstyled ?? true}
        {...props}
      />
    </SearchableSelectField>
  );
}

export function AsyncSearchableSelect<
  OptionType,
  IsMulti extends boolean = false,
>({
  classNames,
  components,
  dropdownIndicator = searchableSelectDefaults.dropdownIndicator,
  error,
  helperText,
  inputId,
  label,
  loadingMessage,
  noOptionsMessage,
  placeholder,
  unstyled,
  wrapperProps,
  ...props
}: AsyncSearchableSelectProps<OptionType, IsMulti>) {
  return (
    <SearchableSelectField
      error={error}
      helperText={helperText}
      inputId={inputId}
      label={label}
      wrapperProps={wrapperProps}
    >
      <ReactAsyncSelect
        aria-invalid={error || undefined}
        classNames={buildSearchableSelectClassNames(error, classNames)}
        components={buildSearchableSelectComponents(
          dropdownIndicator,
          components,
        )}
        inputId={inputId}
        loadingMessage={loadingMessage ?? getLoadingMessage}
        noOptionsMessage={noOptionsMessage ?? getNoOptionsMessage}
        placeholder={placeholder ?? searchableSelectDefaults.placeholder}
        unstyled={unstyled ?? true}
        {...props}
      />
    </SearchableSelectField>
  );
}
