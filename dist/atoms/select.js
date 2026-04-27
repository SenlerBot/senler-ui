import { cn as e } from "../lib/utils/cn.js";
import { overlayLayerClassName as t, overlayMotionClassName as n, overlaySideAnimationClassName as r, overlaySolidSurfaceClassName as i, overlayStateAnimationClassName as a } from "../lib/overlay-styles.js";
import * as o from "react";
import { Check as s, ChevronDown as c, ChevronUp as l } from "lucide-react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
import * as f from "@radix-ui/react-select";
//#region src/atoms/select.tsx
var p = ["popper", "item-aligned"], m = { position: "popper" }, h = f.Root, g = f.Group, _ = f.Value, v = o.forwardRef(({ className: t, children: n, ...r }, i) => /* @__PURE__ */ d(f.Trigger, {
	ref: i,
	className: e("flex min-h-8 w-full cursor-pointer items-center justify-between gap-1 rounded-lg border border-input bg-background px-2 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", t),
	...r,
	children: [n, /* @__PURE__ */ u(f.Icon, {
		asChild: !0,
		children: /* @__PURE__ */ u(c, { className: "h-4 w-4 opacity-50" })
	})]
}));
v.displayName = f.Trigger.displayName;
var y = o.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ u(f.ScrollUpButton, {
	ref: r,
	className: e("flex cursor-default items-center justify-center py-1", t),
	...n,
	children: /* @__PURE__ */ u(l, { className: "h-4 w-4" })
}));
y.displayName = f.ScrollUpButton.displayName;
var b = o.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ u(f.ScrollDownButton, {
	ref: r,
	className: e("flex cursor-default items-center justify-center py-1", t),
	...n,
	children: /* @__PURE__ */ u(c, { className: "h-4 w-4" })
}));
b.displayName = f.ScrollDownButton.displayName;
var x = o.forwardRef(({ className: o, children: s, position: c = m.position, ...l }, p) => /* @__PURE__ */ u(f.Portal, { children: /* @__PURE__ */ d(f.Content, {
	ref: p,
	className: e("relative max-h-96 min-w-[8rem]", i, t, a, r, n, c === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", o),
	position: c,
	...l,
	children: [
		/* @__PURE__ */ u(y, {}),
		/* @__PURE__ */ u(f.Viewport, {
			className: e("p-1", c === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children: s
		}),
		/* @__PURE__ */ u(b, {})
	]
}) }));
x.displayName = f.Content.displayName;
var S = o.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ u(f.Label, {
	ref: r,
	className: e("px-2 py-1.5 text-xs font-medium text-muted-foreground", t),
	...n
}));
S.displayName = f.Label.displayName;
var C = o.forwardRef(({ className: t, children: n, ...r }, i) => /* @__PURE__ */ d(f.Item, {
	ref: i,
	className: e("relative flex min-h-8 w-full cursor-pointer select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", t),
	...r,
	children: [/* @__PURE__ */ u("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ u(f.ItemIndicator, { children: /* @__PURE__ */ u(s, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ u(f.ItemText, { children: n })]
}));
C.displayName = f.Item.displayName;
var w = o.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ u(f.Separator, {
	ref: r,
	className: e("-mx-0.5 my-1 h-px bg-border", t),
	...n
}));
w.displayName = f.Separator.displayName;
//#endregion
export { h as Select, x as SelectContent, g as SelectGroup, C as SelectItem, S as SelectLabel, b as SelectScrollDownButton, y as SelectScrollUpButton, w as SelectSeparator, v as SelectTrigger, _ as SelectValue, m as selectContentDefaults, p as selectContentPositionOptions };
