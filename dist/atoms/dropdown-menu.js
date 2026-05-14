import { cn as e } from "../lib/utils/cn.js";
import { AI_KIND as t, getAiLabelFallback as n } from "../lib/ai-auto-attributes.js";
import { overlayLayerClassName as r, overlayMotionClassName as i, overlaySideAnimationClassName as a, overlaySolidSurfaceClassName as o, overlayStateAnimationClassName as s } from "../lib/overlay-styles.js";
import * as c from "react";
import { CheckIcon as l, ChevronRightIcon as u, CircleIcon as d } from "lucide-react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
import * as m from "@radix-ui/react-dropdown-menu";
//#region src/atoms/dropdown-menu.tsx
function h({ modal: e = !1, ...t }) {
	return /* @__PURE__ */ f(m.Root, {
		"data-slot": "dropdown-menu",
		modal: e,
		...t
	});
}
function g({ ...e }) {
	return /* @__PURE__ */ f(m.Portal, {
		"data-slot": "dropdown-menu-portal",
		...e
	});
}
function _({ className: r, children: i, "aria-label": a, title: o, "data-ai-kind": s, "data-ai-label": c, ...l }) {
	let u = n(c, typeof a == "string" ? a : void 0, typeof o == "string" ? o : void 0, void 0, void 0, i);
	return /* @__PURE__ */ f(m.Trigger, {
		className: e("focus-visible:outline-none", r),
		"data-slot": "dropdown-menu-trigger",
		"data-ai-kind": s ?? t.button,
		"data-ai-label": u,
		"aria-label": a,
		title: o,
		...l,
		children: i
	});
}
function v({ className: t, sideOffset: n = 4, ...c }, l) {
	return /* @__PURE__ */ f(m.Portal, { children: /* @__PURE__ */ f(m.Content, {
		ref: l,
		"data-slot": "dropdown-menu-content",
		sideOffset: n,
		className: e("min-w-[8rem] p-0.5 text-sm", o, r, "origin-(--radix-dropdown-menu-content-transform-origin)", s, a, i, t),
		...c
	}) });
}
function y({ ...e }) {
	return /* @__PURE__ */ f(m.Group, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function b({ className: r, children: i, "data-ai-kind": a, "data-ai-label": o, ...s }) {
	let c = n(o, void 0, void 0, void 0, void 0, i);
	return /* @__PURE__ */ f(m.Item, {
		"data-slot": "dropdown-menu-item",
		"data-ai-kind": a ?? t.button,
		"data-ai-label": c,
		className: e("relative flex min-h-8 cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5", "text-popover-foreground", "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground focus-visible:outline-none", "[&_svg]:shrink-0 [&_svg]:text-muted-foreground", r),
		...s,
		children: i
	});
}
function x({ className: r, children: i, checked: a, "data-ai-kind": o, "data-ai-label": s, ...c }) {
	let u = n(s, void 0, void 0, void 0, void 0, i);
	return /* @__PURE__ */ p(m.CheckboxItem, {
		"data-slot": "dropdown-menu-checkbox-item",
		"data-ai-kind": o ?? t.field,
		"data-ai-label": u,
		className: e("relative flex min-h-8 cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4", r),
		checked: a,
		...c,
		children: [/* @__PURE__ */ f("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ f(m.ItemIndicator, { children: /* @__PURE__ */ f(l, { className: "size-4" }) })
		}), i]
	});
}
function S({ ...e }) {
	return /* @__PURE__ */ f(m.RadioGroup, {
		"data-slot": "dropdown-menu-radio-group",
		...e
	});
}
function C({ className: r, children: i, "data-ai-kind": a, "data-ai-label": o, ...s }) {
	let c = n(o, void 0, void 0, void 0, void 0, i);
	return /* @__PURE__ */ p(m.RadioItem, {
		"data-slot": "dropdown-menu-radio-item",
		"data-ai-kind": a ?? t.field,
		"data-ai-label": c,
		className: e("relative flex min-h-8 cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4", r),
		...s,
		children: [/* @__PURE__ */ f("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ f(m.ItemIndicator, { children: /* @__PURE__ */ f(d, { className: "size-2 fill-current" }) })
		}), i]
	});
}
function w({ className: t, inset: n, ...r }) {
	return /* @__PURE__ */ f(m.Label, {
		"data-slot": "dropdown-menu-label",
		"data-inset": n,
		className: e("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", t),
		...r
	});
}
function T({ className: t, ...n }) {
	return /* @__PURE__ */ f(m.Separator, {
		"data-slot": "dropdown-menu-separator",
		className: e("bg-border -mx-1 my-1 h-px", t),
		...n
	});
}
function E({ className: t, ...n }) {
	return /* @__PURE__ */ f("span", {
		"data-slot": "dropdown-menu-shortcut",
		className: e("text-muted-foreground ml-auto text-xs tracking-widest", t),
		...n
	});
}
function D({ ...e }) {
	return /* @__PURE__ */ f(m.Sub, {
		"data-slot": "dropdown-menu-sub",
		...e
	});
}
function O({ className: t, inset: n, children: r, ...i }) {
	return /* @__PURE__ */ p(m.SubTrigger, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": n,
		className: e("flex min-h-8 cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[inset]:pl-8", "[&_svg]:text-muted-foreground", t),
		...i,
		children: [r, /* @__PURE__ */ f(u, { className: "ml-auto size-4 text-muted-foreground" })]
	});
}
function k({ className: t, ...n }) {
	return /* @__PURE__ */ f(m.SubContent, {
		"data-slot": "dropdown-menu-sub-content",
		className: e("min-w-[8rem] p-0.5", o, r, "origin-(--radix-dropdown-menu-content-transform-origin)", s, a, i, t),
		...n
	});
}
var A = c.forwardRef(v);
A.displayName = "DropdownMenuContent";
//#endregion
export { x as DropdownMenuCheckboxItem, A as DropdownMenuContent, y as DropdownMenuGroup, b as DropdownMenuItem, w as DropdownMenuLabel, g as DropdownMenuPortal, S as DropdownMenuRadioGroup, C as DropdownMenuRadioItem, h as DropdownMenuRoot, T as DropdownMenuSeparator, E as DropdownMenuShortcut, D as DropdownMenuSub, k as DropdownMenuSubContent, O as DropdownMenuSubTrigger, _ as DropdownMenuTrigger };
