import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { literalKeys } from '../lib/literal-keys';
import { cn } from '../lib/utils';

export const switchSizeClasses = {
  xs: 'h-3.5 w-5.5 p-0.5',
  tiny: 'h-4 w-[26px] p-0.5',
  small: 'h-5 w-7.5 p-0.75',
} as const;

export const switchSizeOptions = literalKeys(switchSizeClasses);

export type SwitchSize = (typeof switchSizeOptions)[number];

export const switchDefaults = {
  size: 'small',
  value: 'on',
} as const satisfies {
  size: SwitchSize;
  value: string;
};

export const switchThumbSizeClasses = {
  xs: 'size-2.5 data-[state=checked]:translate-x-2',
  tiny: 'size-3 data-[state=checked]:translate-x-2.5',
  small: 'size-4 data-[state=checked]:translate-x-2',
} as const;

const switchRootVariants = cva(
  'peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: switchSizeClasses,
    },
    defaultVariants: {
      size: switchDefaults.size,
    },
  }
);

const switchThumbVariants = cva(
  'pointer-events-none block rounded-full ring-0 transition-transform',
  {
    variants: {
      size: switchThumbSizeClasses,
    },
    defaultVariants: {
      size: switchDefaults.size,
    },
  }
);

const hiddenInputStyle = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '0',
  padding: '0',
  opacity: '0',
  pointerEvents: 'none',
} as const;

type BaseButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'defaultValue' | 'onChange' | 'type' | 'value'
>;

interface SwitchProps extends BaseButtonProps, VariantProps<typeof switchRootVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  required?: boolean;
  name?: string;
  value?: string;
  form?: string;
  size?: SwitchSize;
}

function getSwitchState(checked: boolean): 'checked' | 'unchecked' {
  return checked ? 'checked' : 'unchecked';
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      required = false,
      name,
      value = switchDefaults.value,
      form,
      className,
      size,
      onClick,
      ...props
    },
    ref
  ) => {
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const currentChecked = checked ?? internalChecked;
    const switchState = getSwitchState(currentChecked);
    const shouldRenderInput = Boolean(name) || required || Boolean(form);

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        const nextChecked = !currentChecked;

        if (!isControlled) {
          setInternalChecked(nextChecked);
        }

        onCheckedChange?.(nextChecked);
      },
      [currentChecked, disabled, isControlled, onCheckedChange, onClick]
    );

    return (
      <>
        <button
          {...props}
          ref={ref}
          type="button"
          role="switch"
          aria-checked={currentChecked}
          aria-required={required}
          disabled={disabled}
          data-slot="switch"
          data-state={switchState}
          data-disabled={disabled ? '' : undefined}
          className={cn(
            switchRootVariants({ size, className }),
            'bg-input',
            'focus-visible:border-ring focus-visible:ring-ring/50',
            'hover:bg-muted',
            'focus:bg-muted',
            'data-[state=checked]:bg-primary',
            'data-[state=checked]:hover:bg-primary/90',
            'data-[state=checked]:focus:bg-primary/90'
          )}
          onClick={handleClick}
        >
          <span
            data-slot="switch-thumb"
            data-state={switchState}
            data-disabled={disabled ? '' : undefined}
            className={cn(
              switchThumbVariants({ size }),
              'bg-background shadow-md',
              'data-[state=unchecked]:translate-x-0'
            )}
          />
        </button>
        {shouldRenderInput ? (
          <input
            aria-hidden="true"
            type="checkbox"
            tabIndex={-1}
            name={name}
            form={form}
            value={value}
            checked={currentChecked}
            required={required}
            disabled={disabled}
            readOnly
            style={hiddenInputStyle}
          />
        ) : null}
      </>
    );
  }
);

Switch.displayName = 'Switch';

export type { SwitchProps };
