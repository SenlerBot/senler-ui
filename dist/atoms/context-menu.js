import { cn as e } from "../lib/utils/cn.js";
import "react";
import { CheckIcon as t, ChevronRightIcon as n, CircleIcon as r } from "lucide-react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import * as o from "@radix-ui/react-context-menu";
//#region src/atoms/context-menu.tsx
function s({ ...e }) {
	return /* @__PURE__ */ i(o.Root, {
		"data-slot": "context-menu",
		...e
	});
}
function c({ className: t, ...n }) {
	return /* @__PURE__ */ i(o.Trigger, {
		"data-slot": "context-menu-trigger",
		className: e("data-[state=open]:bg-accent", t),
		...n
	});
}
function l({ ...e }) {
	return /* @__PURE__ */ i(o.Group, {
		"data-slot": "context-menu-group",
		...e
	});
}
function u({ ...e }) {
	return /* @__PURE__ */ i(o.Portal, {
		"data-slot": "context-menu-portal",
		...e
	});
}
function d({ ...e }) {
	return /* @__PURE__ */ i(o.Sub, {
		"data-slot": "context-menu-sub",
		...e
	});
}
function f({ ...e }) {
	return /* @__PURE__ */ i(o.RadioGroup, {
		"data-slot": "context-menu-radio-group",
		...e
	});
}
function p({ className: t, inset: r, children: s, ...c }) {
	return /* @__PURE__ */ a(o.SubTrigger, {
		"data-slot": "context-menu-sub-trigger",
		"data-inset": r,
		className: e("relative flex items-center h-8 px-2 py-1 m-1 rounded-sm text-sm", "text-foreground font-normal leading-none select-none outline-none", "data-[highlighted]:bg-accent data-[highlighted]:svg:text-primary", "data-[disabled]:pointer-events-none", t),
		...c,
		children: [s, /* @__PURE__ */ i(n, { className: "ml-auto" })]
	});
}
function m({ className: t, ...n }) {
	return /* @__PURE__ */ i(o.SubContent, {
		"data-slot": "context-menu-sub-content",
		className: e("min-w-[180px] bg-popover/95 backdrop-blur-md", "rounded-md border-border border p-1 z-[102] overflow-hidden", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", t),
		...n
	});
}
function h({ className: t, ...n }) {
	return /* @__PURE__ */ i(o.Portal, { children: /* @__PURE__ */ i(o.Content, {
		"data-slot": "context-menu-content",
		className: e("bg-popover/95 backdrop-blur-md backdrop-saturate-[190%] backdrop-brightness-[130%]", "rounded-md border-border border p-1 z-[102] overflow-hidden", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", t),
		...n
	}) });
}
function g({ className: t, inset: n, variant: r = "default", ...a }) {
	return /* @__PURE__ */ i(o.Item, {
		"data-slot": "context-menu-item",
		"data-inset": n,
		"data-variant": r,
		className: e("relative flex items-center h-8 px-2 py-1 m-1 rounded-sm text-sm", "text-foreground font-normal leading-none select-none outline-none", "data-[highlighted]:bg-accent data-[highlighted]:svg:text-primary", "data-[disabled]:pointer-events-none", t),
		...a
	});
}
function _({ className: n, children: r, checked: s, ...c }) {
	return /* @__PURE__ */ a(o.CheckboxItem, {
		"data-slot": "context-menu-checkbox-item",
		className: e("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", n),
		checked: s,
		...c,
		children: [/* @__PURE__ */ i("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ i(o.ItemIndicator, { children: /* @__PURE__ */ i(t, { className: "size-4" }) })
		}), r]
	});
}
function v({ className: t, children: n, ...s }) {
	return /* @__PURE__ */ a(o.RadioItem, {
		"data-slot": "context-menu-radio-item",
		className: e("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", t),
		...s,
		children: [/* @__PURE__ */ i("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ i(o.ItemIndicator, { children: /* @__PURE__ */ i(r, { className: "size-2 fill-current" }) })
		}), n]
	});
}
function y({ className: t, inset: n, ...r }) {
	return /* @__PURE__ */ i(o.Label, {
		"data-slot": "context-menu-label",
		"data-inset": n,
		className: e("text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", t),
		...r
	});
}
function b({ className: t, ...n }) {
	return /* @__PURE__ */ i(o.Separator, {
		"data-slot": "context-menu-separator",
		className: e("bg-border -mx-1 my-1 h-px", t),
		...n
	});
}
function x({ className: t, ...n }) {
	return /* @__PURE__ */ i("span", {
		"data-slot": "context-menu-shortcut",
		className: e("text-muted-foreground ml-auto text-xs tracking-widest", t),
		...n
	});
}
//#endregion
export { s as ContextMenu, _ as ContextMenuCheckboxItem, h as ContextMenuContent, l as ContextMenuGroup, g as ContextMenuItem, y as ContextMenuLabel, u as ContextMenuPortal, f as ContextMenuRadioGroup, v as ContextMenuRadioItem, b as ContextMenuSeparator, x as ContextMenuShortcut, d as ContextMenuSub, m as ContextMenuSubContent, p as ContextMenuSubTrigger, c as ContextMenuTrigger };
