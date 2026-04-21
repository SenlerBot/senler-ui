import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
type DropdownMenuItemType = {
    label: string;
    isLoading?: boolean;
    subItems?: DropdownMenuItemType[];
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    divider?: boolean;
};
declare function DropdownMenuRoot({ modal, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuTrigger({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuItem({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuCheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>): import("react/jsx-runtime").JSX.Element;
declare const ForwardedContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { DropdownMenuRoot, DropdownMenuPortal, DropdownMenuTrigger, ForwardedContent as DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, type DropdownMenuItemType, };
