import * as React from 'react';

import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { cn } from '../lib/utils';

interface TextFieldBaseProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  maxRows?: number;
}

type InputTextFieldProps = TextFieldBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    multiline?: false;
    rows?: never;
  };

type MultilineTextFieldProps = TextFieldBaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
    rows?: number;
  };

export type TextFieldProps = InputTextFieldProps | MultilineTextFieldProps;

function setForwardedRef<T>(
  ref: React.ForwardedRef<T>,
  value: T | null
): void {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

const sizeClasses = {
  small: 'h-9 text-sm',
  medium: 'h-10 text-base',
};

const TextField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>((props, ref) => {
  const {
    label,
    error,
    helperText,
    fullWidth,
    size = 'medium',
    startAdornment,
    endAdornment,
    className,
    maxRows,
  } = props;

  const containerClass = cn(fullWidth && 'w-full', className);
  const fieldClass = cn(
    sizeClasses[size],
    error && 'border-destructive focus-visible:ring-destructive',
    startAdornment && 'pl-10',
    endAdornment && 'pr-12'
  );

  const renderField = () => {
    if (props.multiline) {
      const {
        multiline: _multiline,
        label: _label,
        error: _error,
        helperText: _helperText,
        fullWidth: _fullWidth,
        size: _size,
        startAdornment: _startAdornment,
        endAdornment: _endAdornment,
        maxRows: _maxRows,
        className: _className,
        rows,
        ...textareaProps
      } = props;

      return (
        <Textarea
          ref={(node) => setForwardedRef(ref, node)}
          rows={rows}
          className={cn(fieldClass, maxRows && 'resize-none overflow-auto')}
          style={maxRows ? { maxHeight: `${maxRows * 1.5}em` } : undefined}
          {...textareaProps}
        />
      );
    }

    const {
      multiline: _multiline,
      label: _label,
      error: _error,
      helperText: _helperText,
      fullWidth: _fullWidth,
      size: _size,
      startAdornment: _startAdornment,
      endAdornment: _endAdornment,
      maxRows: _maxRows,
      className: _className,
      ...inputProps
    } = props;

    return (
      <Input
        ref={(node) => setForwardedRef(ref, node)}
        className={fieldClass}
        {...inputProps}
      />
    );
  };

  return (
    <div className={containerClass}>
      {label ? (
        <Label className={cn('mb-1.5', error && 'text-destructive')}>
          {label}
        </Label>
      ) : null}

      {startAdornment || endAdornment ? (
        <div className='relative'>
          {renderField()}

          {startAdornment ? (
            <div className='pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center'>
              {startAdornment}
            </div>
          ) : null}

          {endAdornment ? (
            <div className='absolute right-1 top-1/2 flex -translate-y-1/2 items-center'>
              {endAdornment}
            </div>
          ) : null}
        </div>
      ) : (
        renderField()
      )}

      {helperText ? (
        <p
          className={cn(
            'mt-1.5 text-xs',
            error ? 'text-destructive' : 'text-muted-foreground'
          )}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

TextField.displayName = 'TextField';

export { TextField };
