import { cn as e } from "../lib/utils/cn.js";
import { overlayLayerClassName as t, overlayMotionClassName as n, overlaySideAnimationClassName as r, overlaySolidSurfaceClassName as i, overlayStateAnimationClassName as a } from "../lib/overlay-styles.js";
import * as o from "react";
import { CheckIcon as s, ChevronRightIcon as c, CircleIcon as l } from "lucide-react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
import * as f from "@radix-ui/react-dropdown-menu";
//#region src/atoms/dropdown-menu.tsx
function p({ modal: e = !1, ...t }) {
	return /* @__PURE__ */ u(f.Root, {
		"data-slot": "dropdown-menu",
		modal: e,
		...t
	});
}
function m({ ...e }) {
	return /* @__PURE__ */ u(f.Portal, {
		"data-slot": "dropdown-menu-portal",
		...e
	});
}
function h({ className: t, ...n }) {
	return /* @__PURE__ */ u(f.Trigger, {
		className: e("focus-visible:outline-none", t),
		"data-slot": "dropdown-menu-trigger",
		...n
	});
}
function g({ className: o, sideOffset: s = 4, ...c }, l) {
	return /* @__PURE__ */ u(f.Portal, { children: /* @__PURE__ */ u(f.Content, {
		ref: l,
		"data-slot": "dropdown-menu-content",
		sideOffset: s,
		className: e("min-w-[8rem] p-0.5 text-sm", i, t, "origin-(--radix-dropdown-menu-content-transform-origin)", a, r, n, o),
		...c
	}) });
}
function _({ ...e }) {
	return /* @__PURE__ */ u(f.Group, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function v({ className: t, ...n }) {
	return /* @__PURE__ */ u(f.Item, {
		"data-slot": "dropdown-menu-item",
		className: e("relative flex min-h-8 cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5", "text-popover-foreground", "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground focus-visible:outline-none", "[&_svg]:shrink-0 [&_svg]:text-muted-foreground", t),
		...n
	});
}
function y({ className: t, children: n, checked: r, ...i }) {
	return /* @__PURE__ */ d(f.CheckboxItem, {
		"data-slot": "dropdown-menu-checkbox-item",
		className: e("relative flex min-h-8 cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4", t),
		checked: r,
		...i,
		children: [/* @__PURE__ */ u("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ u(f.ItemIndicator, { children: /* @__PURE__ */ u(s, { className: "size-4" }) })
		}), n]
	});
}
function b({ ...e }) {
	return /* @__PURE__ */ u(f.RadioGroup, {
		"data-slot": "dropdown-menu-radio-group",
		...e
	});
}
function x({ className: t, children: n, ...r }) {
	return /* @__PURE__ */ d(f.RadioItem, {
		"data-slot": "dropdown-menu-radio-item",
		className: e("relative flex min-h-8 cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4", t),
		...r,
		children: [/* @__PURE__ */ u("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ u(f.ItemIndicator, { children: /* @__PURE__ */ u(l, { className: "size-2 fill-current" }) })
		}), n]
	});
}
function S({ className: t, inset: n, ...r }) {
	return /* @__PURE__ */ u(f.Label, {
		"data-slot": "dropdown-menu-label",
		"data-inset": n,
		className: e("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", t),
		...r
	});
}
function C({ className: t, ...n }) {
	return /* @__PURE__ */ u(f.Separator, {
		"data-slot": "dropdown-menu-separator",
		className: e("bg-border -mx-1 my-1 h-px", t),
		...n
	});
}
function w({ className: t, ...n }) {
	return /* @__PURE__ */ u("span", {
		"data-slot": "dropdown-menu-shortcut",
		className: e("text-muted-foreground ml-auto text-xs tracking-widest", t),
		...n
	});
}
function T({ ...e }) {
	return /* @__PURE__ */ u(f.Sub, {
		"data-slot": "dropdown-menu-sub",
		...e
	});
}
function E({ className: t, inset: n, children: r, ...i }) {
	return /* @__PURE__ */ d(f.SubTrigger, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": n,
		className: e("flex min-h-8 cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[inset]:pl-8", "[&_svg]:text-muted-foreground", t),
		...i,
		children: [r, /* @__PURE__ */ u(c, { className: "ml-auto size-4 text-muted-foreground" })]
	});
}
function D({ className: o, ...s }) {
	return /* @__PURE__ */ u(f.SubContent, {
		"data-slot": "dropdown-menu-sub-content",
		className: e("min-w-[8rem] p-0.5", i, t, "origin-(--radix-dropdown-menu-content-transform-origin)", a, r, n, o),
		...s
	});
}
var O = o.forwardRef(g);
O.displayName = "DropdownMenuContent";
//#endregion
export { y as DropdownMenuCheckboxItem, O as DropdownMenuContent, _ as DropdownMenuGroup, v as DropdownMenuItem, S as DropdownMenuLabel, m as DropdownMenuPortal, b as DropdownMenuRadioGroup, x as DropdownMenuRadioItem, p as DropdownMenuRoot, C as DropdownMenuSeparator, w as DropdownMenuShortcut, T as DropdownMenuSub, D as DropdownMenuSubContent, E as DropdownMenuSubTrigger, h as DropdownMenuTrigger };
