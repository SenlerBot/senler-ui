import { cn as e } from "../lib/utils/cn.js";
import { AI_KIND as t, getAiLabelFallback as n } from "../lib/ai-auto-attributes.js";
import { overlayLayerClassName as r, overlayMotionClassName as i, overlaySideAnimationClassName as a, overlaySolidSurfaceClassName as o, overlayStateAnimationClassName as s } from "../lib/overlay-styles.js";
import * as c from "react";
import { Check as l, ChevronDown as u, ChevronUp as d } from "lucide-react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
import * as m from "@radix-ui/react-select";
//#region src/atoms/select.tsx
var h = ["popper", "item-aligned"], g = { position: "popper" }, _ = m.Root, v = m.Group, y = m.Value, b = c.forwardRef(({ className: r, children: i, "aria-label": a, title: o, "data-ai-kind": s, "data-ai-label": c, ...l }, d) => {
	let h = n(c, typeof a == "string" ? a : void 0, typeof o == "string" ? o : void 0, void 0, void 0, i);
	return /* @__PURE__ */ p(m.Trigger, {
		ref: d,
		className: e("flex min-h-8 w-full cursor-pointer items-center justify-between gap-1 rounded-lg border border-input bg-background px-2 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", r),
		"data-ai-kind": s ?? t.field,
		"data-ai-label": h,
		"aria-label": a,
		title: o,
		...l,
		children: [i, /* @__PURE__ */ f(m.Icon, {
			asChild: !0,
			children: /* @__PURE__ */ f(u, { className: "h-4 w-4 opacity-50" })
		})]
	});
});
b.displayName = m.Trigger.displayName;
var x = c.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ f(m.ScrollUpButton, {
	ref: r,
	className: e("flex cursor-default items-center justify-center py-1", t),
	...n,
	children: /* @__PURE__ */ f(d, { className: "h-4 w-4" })
}));
x.displayName = m.ScrollUpButton.displayName;
var S = c.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ f(m.ScrollDownButton, {
	ref: r,
	className: e("flex cursor-default items-center justify-center py-1", t),
	...n,
	children: /* @__PURE__ */ f(u, { className: "h-4 w-4" })
}));
S.displayName = m.ScrollDownButton.displayName;
var C = c.forwardRef(({ className: t, children: n, position: c = g.position, ...l }, u) => /* @__PURE__ */ f(m.Portal, { children: /* @__PURE__ */ p(m.Content, {
	ref: u,
	className: e("relative max-h-96 min-w-[8rem]", o, r, s, a, i, c === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", t),
	position: c,
	...l,
	children: [
		/* @__PURE__ */ f(x, {}),
		/* @__PURE__ */ f(m.Viewport, {
			className: e("p-1", c === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children: n
		}),
		/* @__PURE__ */ f(S, {})
	]
}) }));
C.displayName = m.Content.displayName;
var w = c.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ f(m.Label, {
	ref: r,
	className: e("px-2 py-1.5 text-xs font-medium text-muted-foreground", t),
	...n
}));
w.displayName = m.Label.displayName;
var T = c.forwardRef(({ className: r, children: i, "data-ai-kind": a, "data-ai-label": o, ...s }, c) => {
	let u = n(o, void 0, void 0, void 0, void 0, i);
	return /* @__PURE__ */ p(m.Item, {
		ref: c,
		className: e("relative flex min-h-8 w-full cursor-pointer select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", r),
		"data-ai-kind": a ?? t.listItem,
		"data-ai-label": u,
		...s,
		children: [/* @__PURE__ */ f("span", {
			className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
			children: /* @__PURE__ */ f(m.ItemIndicator, { children: /* @__PURE__ */ f(l, { className: "h-4 w-4" }) })
		}), /* @__PURE__ */ f(m.ItemText, { children: i })]
	});
});
T.displayName = m.Item.displayName;
var E = c.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ f(m.Separator, {
	ref: r,
	className: e("-mx-0.5 my-1 h-px bg-border", t),
	...n
}));
E.displayName = m.Separator.displayName;
//#endregion
export { _ as Select, C as SelectContent, v as SelectGroup, T as SelectItem, w as SelectLabel, S as SelectScrollDownButton, x as SelectScrollUpButton, E as SelectSeparator, b as SelectTrigger, y as SelectValue, g as selectContentDefaults, h as selectContentPositionOptions };
