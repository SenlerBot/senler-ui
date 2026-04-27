import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { CheckIcon as n, ChevronRightIcon as r, CircleIcon as i } from "lucide-react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import * as s from "@radix-ui/react-dropdown-menu";
//#region src/atoms/dropdown-menu.tsx
function c({ modal: e = !1, ...t }) {
	return /* @__PURE__ */ a(s.Root, {
		"data-slot": "dropdown-menu",
		modal: e,
		...t
	});
}
function l({ ...e }) {
	return /* @__PURE__ */ a(s.Portal, {
		"data-slot": "dropdown-menu-portal",
		...e
	});
}
function u({ className: t, ...n }) {
	return /* @__PURE__ */ a(s.Trigger, {
		className: e("focus-visible:outline-none", t),
		"data-slot": "dropdown-menu-trigger",
		...n
	});
}
function d({ className: t, sideOffset: n = 4, ...r }, i) {
	return /* @__PURE__ */ a(s.Portal, { children: /* @__PURE__ */ a(s.Content, {
		ref: i,
		"data-slot": "dropdown-menu-content",
		sideOffset: n,
		className: e("min-w-[8rem] rounded-lg p-1 shadow-md text-sm", "border border-border bg-popover text-popover-foreground z-[1100] overflow-hidden", "origin-(--radix-dropdown-menu-content-transform-origin)", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", "duration-200 ease-out", "will-change-transform focus-visible:outline-none", t),
		...r
	}) });
}
function f({ ...e }) {
	return /* @__PURE__ */ a(s.Group, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function p({ className: t, ...n }) {
	return /* @__PURE__ */ a(s.Item, {
		"data-slot": "dropdown-menu-item",
		className: e("flex items-center gap-2 min-h-[32px] px-2 relative select-none cursor-pointer", "text-popover-foreground rounded-md", "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground focus-visible:outline-none", "[&_svg]:shrink-0 [&_svg]:text-muted-foreground", t),
		...n
	});
}
function m({ className: t, children: r, checked: i, ...c }) {
	return /* @__PURE__ */ o(s.CheckboxItem, {
		"data-slot": "dropdown-menu-checkbox-item",
		className: e("focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4", t),
		checked: i,
		...c,
		children: [/* @__PURE__ */ a("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ a(s.ItemIndicator, { children: /* @__PURE__ */ a(n, { className: "size-4" }) })
		}), r]
	});
}
function h({ ...e }) {
	return /* @__PURE__ */ a(s.RadioGroup, {
		"data-slot": "dropdown-menu-radio-group",
		...e
	});
}
function g({ className: t, children: n, ...r }) {
	return /* @__PURE__ */ o(s.RadioItem, {
		"data-slot": "dropdown-menu-radio-item",
		className: e("focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4", t),
		...r,
		children: [/* @__PURE__ */ a("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ a(s.ItemIndicator, { children: /* @__PURE__ */ a(i, { className: "size-2 fill-current" }) })
		}), n]
	});
}
function _({ className: t, inset: n, ...r }) {
	return /* @__PURE__ */ a(s.Label, {
		"data-slot": "dropdown-menu-label",
		"data-inset": n,
		className: e("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", t),
		...r
	});
}
function v({ className: t, ...n }) {
	return /* @__PURE__ */ a(s.Separator, {
		"data-slot": "dropdown-menu-separator",
		className: e("bg-border -mx-1 my-1 h-px", t),
		...n
	});
}
function y({ className: t, ...n }) {
	return /* @__PURE__ */ a("span", {
		"data-slot": "dropdown-menu-shortcut",
		className: e("text-muted-foreground ml-auto text-xs tracking-widest", t),
		...n
	});
}
function b({ ...e }) {
	return /* @__PURE__ */ a(s.Sub, {
		"data-slot": "dropdown-menu-sub",
		...e
	});
}
function x({ className: t, inset: n, children: i, ...c }) {
	return /* @__PURE__ */ o(s.SubTrigger, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": n,
		className: e("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8", "[&_svg]:text-muted-foreground", t),
		...c,
		children: [i, /* @__PURE__ */ a(r, { className: "ml-auto size-4 text-muted-foreground" })]
	});
}
function S({ className: t, ...n }) {
	return /* @__PURE__ */ a(s.SubContent, {
		"data-slot": "dropdown-menu-sub-content",
		className: e("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg", t),
		...n
	});
}
var C = t.forwardRef(d);
C.displayName = "DropdownMenuContent";
//#endregion
export { m as DropdownMenuCheckboxItem, C as DropdownMenuContent, f as DropdownMenuGroup, p as DropdownMenuItem, _ as DropdownMenuLabel, l as DropdownMenuPortal, h as DropdownMenuRadioGroup, g as DropdownMenuRadioItem, c as DropdownMenuRoot, v as DropdownMenuSeparator, y as DropdownMenuShortcut, b as DropdownMenuSub, S as DropdownMenuSubContent, x as DropdownMenuSubTrigger, u as DropdownMenuTrigger };
