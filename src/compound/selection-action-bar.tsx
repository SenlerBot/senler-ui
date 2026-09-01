import * as React from 'react';
import { X } from 'lucide-react';

import { Button } from '../atoms/button';
import { CheckBox } from '../atoms/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../atoms/tooltip';
import { cn } from '../lib/utils';

interface SelectionActionBarRect {
  top: number;
  left: number;
  width: number;
}

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
  placement?: 'anchor' | 'viewport-bottom';
  className?: string;
  toolbarClassName?: string;
  actionsClassName?: string;
}

function SelectionActionBar({
  selectedCount,
  selectedCountLabel,
  selectAllChecked,
  selectAllLabel,
  clearLabel,
  onSelectAllChange,
  onClear,
  actions,
  children,
  controlsDisabled,
  minTop = 0,
  placement = 'anchor',
  className,
  toolbarClassName,
  actionsClassName,
}: SelectionActionBarProps) {
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  const toolbarRef = React.useRef<HTMLDivElement | null>(null);
  const isOpen = selectedCount > 0;
  const [fixedRect, setFixedRect] =
    React.useState<SelectionActionBarRect | null>(null);
  const [toolbarHeight, setToolbarHeight] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    if (!isOpen) {
      setFixedRect(null);
      return;
    }

    const anchorElement = anchorRef.current;

    if (!anchorElement) {
      return;
    }

    const updateFixedRect = () => {
      const rect = anchorElement.getBoundingClientRect();
      const nextRect = {
        top: placement === 'anchor' ? Math.max(rect.top, minTop) : 0,
        left: rect.left,
        width: rect.width,
      };

      setFixedRect((currentRect) => {
        if (
          currentRect &&
          currentRect.top === nextRect.top &&
          currentRect.left === nextRect.left &&
          currentRect.width === nextRect.width
        ) {
          return currentRect;
        }

        return nextRect;
      });
    };

    updateFixedRect();

    const resizeObserver =
      'ResizeObserver' in window ? new ResizeObserver(updateFixedRect) : null;
    resizeObserver?.observe(anchorElement);
    window.addEventListener('resize', updateFixedRect);
    window.addEventListener('scroll', updateFixedRect, true);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateFixedRect);
      window.removeEventListener('scroll', updateFixedRect, true);
    };
  }, [isOpen, minTop, placement]);

  React.useLayoutEffect(() => {
    if (!isOpen || placement === 'viewport-bottom') {
      setToolbarHeight(null);
      return;
    }

    const toolbarElement = toolbarRef.current;

    if (!toolbarElement) {
      return;
    }

    const updateToolbarHeight = () => {
      const nextHeight = Math.ceil(
        toolbarElement.getBoundingClientRect().height,
      );

      setToolbarHeight((currentHeight) =>
        currentHeight === nextHeight ? currentHeight : nextHeight,
      );
    };

    updateToolbarHeight();

    const resizeObserver =
      'ResizeObserver' in window
        ? new ResizeObserver(updateToolbarHeight)
        : null;
    resizeObserver?.observe(toolbarElement);
    window.addEventListener('resize', updateToolbarHeight);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateToolbarHeight);
    };
  }, [fixedRect?.width, isOpen, placement]);

  return (
    <div
      ref={anchorRef}
      className={cn('min-h-10', className)}
      style={
        isOpen && toolbarHeight && placement === 'anchor'
          ? { minHeight: toolbarHeight }
          : undefined
      }
    >
      {isOpen && fixedRect ? (
        <div
          ref={toolbarRef}
          className={cn(
            'fixed z-30 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-background px-2 py-1 shadow-lg backdrop-blur',
            toolbarClassName,
          )}
          style={{
            left: fixedRect.left,
            width: fixedRect.width,
            ...(placement === 'viewport-bottom'
              ? {
                  bottom: 'calc(1rem + var(--app-safe-area-bottom, 0px))',
                }
              : { top: fixedRect.top }),
          }}
        >
          <div className="flex min-w-0 items-center gap-2">
            <CheckBox
              checked={selectAllChecked}
              onCheckedChange={onSelectAllChange}
              disabled={controlsDisabled}
              aria-label={selectAllLabel}
              title={selectAllLabel}
            />
            <div
              className="min-w-0 truncate text-sm font-medium"
              aria-live="polite"
            >
              {selectedCountLabel}
            </div>
          </div>

          <div
            className={cn(
              'flex flex-wrap items-center justify-end gap-2',
              actionsClassName,
            )}
          >
            {actions}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon_sm"
                  onClick={onClear}
                  disabled={controlsDisabled}
                  aria-label={clearLabel}
                  title={clearLabel}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{clearLabel}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      ) : null}
      {!isOpen || placement === 'viewport-bottom' ? children : null}
    </div>
  );
}

export { SelectionActionBar };
