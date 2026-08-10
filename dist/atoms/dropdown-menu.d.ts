import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { type AiDataAttributes } from '../lib/ai-auto-attributes';
type DropdownMenuItemType = {
    label: string;
    isLoading?: boolean;
    subItems?: DropdownMenuItemType[];
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    divider?: boolean;
};
declare function DropdownMenuRoot({ modal, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>): React.JSX.Element;
declare function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>): React.JSX.Element;
declare function DropdownMenuTrigger({ className, children, 'aria-label': ariaLabel, title, 'data-ai-kind': dataAiKind, 'data-ai-label': dataAiLabel, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> & AiDataAttributes): React.JSX.Element;
declare function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>): React.JSX.Element;
declare function DropdownMenuItem({ className, children, 'data-ai-kind': dataAiKind, 'data-ai-label': dataAiLabel, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & AiDataAttributes): React.JSX.Element;
declare function DropdownMenuCheckboxItem({ className, children, checked, 'data-ai-kind': dataAiKind, 'data-ai-label': dataAiLabel, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & AiDataAttributes): React.JSX.Element;
declare function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>): React.JSX.Element;
declare function DropdownMenuRadioItem({ className, children, 'data-ai-kind': dataAiKind, 'data-ai-label': dataAiLabel, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & AiDataAttributes): React.JSX.Element;
declare function DropdownMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
}): React.JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>): React.JSX.Element;
declare function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element;
declare function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>): React.JSX.Element;
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): React.JSX.Element;
declare function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>): React.JSX.Element;
declare const DropdownMenuContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { DropdownMenuRoot, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, type DropdownMenuItemType, };
