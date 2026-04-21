import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { CheckIcon as n, ChevronRightIcon as r, CircleIcon as i } from "lucide-react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import * as s from "@radix-ui/react-menubar";
//#region src/atoms/menubar.tsx
function c({ ...e }) {
	return /* @__PURE__ */ a(s.Root, {
		"data-slot": "menubar",
		...e
	});
}
function l({ ...e }) {
	return /* @__PURE__ */ a(s.Menu, {
		"data-slot": "menubar-menu",
		...e
	});
}
function u({ ...e }) {
	return /* @__PURE__ */ a(s.Group, {
		"data-slot": "menubar-group",
		...e
	});
}
function d({ ...e }) {
	return /* @__PURE__ */ a(s.Portal, {
		"data-slot": "menubar-portal",
		...e
	});
}
function f({ ...e }) {
	return /* @__PURE__ */ a(s.RadioGroup, {
		"data-slot": "menubar-radio-group",
		...e
	});
}
function p({ className: t, ...n }, r) {
	return /* @__PURE__ */ a(s.Trigger, {
		ref: r,
		"data-slot": "menubar-trigger",
		className: e("cursor-default bg-transparent", t),
		...n
	});
}
function m({ className: t, align: n = "center", sideOffset: r = 4, ...i }) {
	return /* @__PURE__ */ a(d, { children: /* @__PURE__ */ a(s.Content, {
		"data-slot": "menubar-content",
		align: n,
		sideOffset: r,
		className: e("bg-card rounded-[6px] shadow-[0px_16px_16px_rgba(0,0,0,0.16)] overflow-hidden py-1 border border-border will-change-transform will-change-opacity z-9999", t),
		...i
	}) });
}
function h({ className: t, ...n }) {
	return /* @__PURE__ */ a(s.Item, {
		"data-slot": "menubar-item",
		className: e("text-[13px] leading-none text-foreground rounded-[3px] flex items-center justify-between h-8 px-1.5 mx-1 relative select-none outline-none data-[highlighted]:bg-accent data-[highlighted]:[&_svg]:text-primary data-[disabled]:pointer-events-none", t),
		...n
	});
}
function g({ className: t, children: r, checked: i, ...c }) {
	return /* @__PURE__ */ o(s.CheckboxItem, {
		"data-slot": "menubar-checkbox-item",
		className: e("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", t),
		checked: i,
		...c,
		children: [/* @__PURE__ */ a("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ a(s.ItemIndicator, { children: /* @__PURE__ */ a(n, { className: "size-4" }) })
		}), r]
	});
}
function _({ className: t, children: n, ...r }) {
	return /* @__PURE__ */ o(s.RadioItem, {
		"data-slot": "menubar-radio-item",
		className: e("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", t),
		...r,
		children: [/* @__PURE__ */ a("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ a(s.ItemIndicator, { children: /* @__PURE__ */ a(i, { className: "size-2 fill-current" }) })
		}), n]
	});
}
function v({ className: t, inset: n, ...r }) {
	return /* @__PURE__ */ a(s.Label, {
		"data-slot": "menubar-label",
		"data-inset": n,
		className: e("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", t),
		...r
	});
}
function y({ className: t, ...n }) {
	return /* @__PURE__ */ a(s.Separator, {
		"data-slot": "menubar-separator",
		className: e("bg-border -mx-1 my-1 h-px", t),
		...n
	});
}
function b({ className: t, ...n }) {
	return /* @__PURE__ */ a("span", {
		"data-slot": "menubar-shortcut",
		className: e("text-muted-foreground ml-auto text-xs tracking-widest", t),
		...n
	});
}
function x({ ...e }) {
	return /* @__PURE__ */ a(s.Sub, {
		"data-slot": "menubar-sub",
		...e
	});
}
function S({ className: t, inset: n, children: i, ...c }) {
	return /* @__PURE__ */ o(s.SubTrigger, {
		"data-slot": "menubar-sub-trigger",
		"data-inset": n,
		className: e("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8", t),
		...c,
		children: [i, /* @__PURE__ */ a(r, { className: "ml-auto h-4 w-4" })]
	});
}
function C({ className: t, ...n }) {
	return /* @__PURE__ */ a(s.SubContent, {
		"data-slot": "menubar-sub-content",
		className: e("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg", t),
		...n
	});
}
var w = t.forwardRef(p);
//#endregion
export { w as ForwardedTrigger, c as Menubar, g as MenubarCheckboxItem, m as MenubarContent, u as MenubarGroup, h as MenubarItem, v as MenubarLabel, l as MenubarMenu, d as MenubarPortal, f as MenubarRadioGroup, _ as MenubarRadioItem, y as MenubarSeparator, b as MenubarShortcut, x as MenubarSub, C as MenubarSubContent, S as MenubarSubTrigger };
