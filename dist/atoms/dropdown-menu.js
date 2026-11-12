import { overlayLayerClassName as e, overlayMotionClassName as t, overlaySideAnimationClassName as n, overlaySolidSurfaceClassName as r, overlayStateAnimationClassName as i } from "../lib/overlay-styles.js";
import { AI_KIND as a, getAiLabelFallback as o } from "../lib/ai-auto-attributes.js";
import { cn as s } from "../lib/utils/cn.js";
import * as c from "react";
import { CheckIcon as l, ChevronRightIcon as u, CircleIcon as d } from "lucide-react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
import * as m from "@radix-ui/react-dropdown-menu";
// src/atoms/dropdown-menu.tsx
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
function _({ className: e, children: t, "aria-label": n, title: r, "data-ai-kind": i, "data-ai-label": c, ...l }) {
	let u = o(c, typeof n == "string" ? n : void 0, typeof r == "string" ? r : void 0, void 0, void 0, t);
	return /* @__PURE__ */ f(m.Trigger, {
		className: s("cursor-pointer focus-visible:outline-none", e),
		"data-slot": "dropdown-menu-trigger",
		"data-ai-kind": i ?? a.button,
		"data-ai-label": u,
		"aria-label": n,
		title: r,
		...l,
		children: t
	});
}
function v({ className: a, sideOffset: o = 4, ...c }, l) {
	return /* @__PURE__ */ f(m.Portal, { children: /* @__PURE__ */ f(m.Content, {
		ref: l,
		"data-slot": "dropdown-menu-content",
		sideOffset: o,
		className: s("min-w-[8rem] p-0.5 text-sm", r, e, "origin-(--radix-dropdown-menu-content-transform-origin)", i, n, t, a),
		...c
	}) });
}
function y({ ...e }) {
	return /* @__PURE__ */ f(m.Group, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function b({ className: e, children: t, "data-ai-kind": n, "data-ai-label": r, ...i }) {
	let c = o(r, void 0, void 0, void 0, void 0, t);
	return /* @__PURE__ */ f(m.Item, {
		"data-slot": "dropdown-menu-item",
		"data-ai-kind": n ?? a.button,
		"data-ai-label": c,
		className: s("relative flex min-h-8 cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5", "text-popover-foreground", "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground focus-visible:outline-none", "[&_svg]:shrink-0 [&_svg]:text-muted-foreground", e),
		...i,
		children: t
	});
}
function x({ className: e, children: t, checked: n, "data-ai-kind": r, "data-ai-label": i, ...c }) {
	let u = o(i, void 0, void 0, void 0, void 0, t);
	return /* @__PURE__ */ p(m.CheckboxItem, {
		"data-slot": "dropdown-menu-checkbox-item",
		"data-ai-kind": r ?? a.field,
		"data-ai-label": u,
		className: s("relative flex min-h-8 cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4", e),
		checked: n,
		...c,
		children: [/* @__PURE__ */ f("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ f(m.ItemIndicator, { children: /* @__PURE__ */ f(l, { className: "size-4" }) })
		}), t]
	});
}
function S({ ...e }) {
	return /* @__PURE__ */ f(m.RadioGroup, {
		"data-slot": "dropdown-menu-radio-group",
		...e
	});
}
function C({ className: e, children: t, "data-ai-kind": n, "data-ai-label": r, ...i }) {
	let c = o(r, void 0, void 0, void 0, void 0, t);
	return /* @__PURE__ */ p(m.RadioItem, {
		"data-slot": "dropdown-menu-radio-item",
		"data-ai-kind": n ?? a.field,
		"data-ai-label": c,
		className: s("relative flex min-h-8 cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4", e),
		...i,
		children: [/* @__PURE__ */ f("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ f(m.ItemIndicator, { children: /* @__PURE__ */ f(d, { className: "size-2 fill-current" }) })
		}), t]
	});
}
function w({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ f(m.Label, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: s("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", e),
		...n
	});
}
function T({ className: e, ...t }) {
	return /* @__PURE__ */ f(m.Separator, {
		"data-slot": "dropdown-menu-separator",
		className: s("bg-border -mx-1 my-1 h-px", e),
		...t
	});
}
function E({ className: e, ...t }) {
	return /* @__PURE__ */ f("span", {
		"data-slot": "dropdown-menu-shortcut",
		className: s("text-muted-foreground ml-auto text-xs tracking-widest", e),
		...t
	});
}
function D({ ...e }) {
	return /* @__PURE__ */ f(m.Sub, {
		"data-slot": "dropdown-menu-sub",
		...e
	});
}
function O({ className: e, inset: t, children: n, ...r }) {
	return /* @__PURE__ */ p(m.SubTrigger, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": t,
		className: s("flex min-h-8 cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[inset]:pl-8", "[&_svg]:text-muted-foreground", e),
		...r,
		children: [n, /* @__PURE__ */ f(u, { className: "ml-auto size-4 text-muted-foreground" })]
	});
}
function k({ className: a, ...o }) {
	return /* @__PURE__ */ f(m.SubContent, {
		"data-slot": "dropdown-menu-sub-content",
		className: s("min-w-[8rem] p-0.5", r, e, "origin-(--radix-dropdown-menu-content-transform-origin)", i, n, t, a),
		...o
	});
}
var A = c.forwardRef(v);
A.displayName = "DropdownMenuContent";
export { x as DropdownMenuCheckboxItem, A as DropdownMenuContent, y as DropdownMenuGroup, b as DropdownMenuItem, w as DropdownMenuLabel, g as DropdownMenuPortal, S as DropdownMenuRadioGroup, C as DropdownMenuRadioItem, h as DropdownMenuRoot, T as DropdownMenuSeparator, E as DropdownMenuShortcut, D as DropdownMenuSub, k as DropdownMenuSubContent, O as DropdownMenuSubTrigger, _ as DropdownMenuTrigger };
