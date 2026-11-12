import { overlayLayerClassName as e, overlayMotionClassName as t, overlaySideAnimationClassName as n, overlaySolidSurfaceClassName as r, overlayStateAnimationClassName as i } from "../lib/overlay-styles.js";
import { AI_KIND as a, getAiLabelFallback as o } from "../lib/ai-auto-attributes.js";
import { cn as s } from "../lib/utils/cn.js";
import * as c from "react";
import { Check as l, ChevronDown as u, ChevronUp as d } from "lucide-react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
import * as m from "@radix-ui/react-select";
// src/atoms/select.tsx
var h = ["popper", "item-aligned"], g = { position: "popper" }, _ = m.Root, v = m.Group, y = m.Value, b = c.forwardRef(({ className: e, children: t, "aria-label": n, title: r, "data-ai-kind": i, "data-ai-label": c, ...l }, d) => {
	let h = o(c, typeof n == "string" ? n : void 0, typeof r == "string" ? r : void 0, void 0, void 0, t);
	return /* @__PURE__ */ p(m.Trigger, {
		ref: d,
		className: s("flex min-h-8 w-full cursor-pointer items-center justify-between gap-1 rounded-lg border border-input bg-background px-2 py-1.5 text-sm placeholder:text-muted-foreground outline-none transition-[color,border-color,box-shadow] focus:border-primary focus-visible:border-primary data-[state=open]:border-primary aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", e),
		"data-ai-kind": i ?? a.field,
		"data-ai-label": h,
		"aria-label": n,
		title: r,
		...l,
		children: [t, /* @__PURE__ */ f(m.Icon, {
			asChild: !0,
			children: /* @__PURE__ */ f(u, { className: "h-4 w-4 opacity-50" })
		})]
	});
});
b.displayName = m.Trigger.displayName;
var x = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(m.ScrollUpButton, {
	ref: n,
	className: s("flex cursor-pointer items-center justify-center py-1", e),
	...t,
	children: /* @__PURE__ */ f(d, { className: "h-4 w-4" })
}));
x.displayName = m.ScrollUpButton.displayName;
var S = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(m.ScrollDownButton, {
	ref: n,
	className: s("flex cursor-pointer items-center justify-center py-1", e),
	...t,
	children: /* @__PURE__ */ f(u, { className: "h-4 w-4" })
}));
S.displayName = m.ScrollDownButton.displayName;
var C = c.forwardRef(({ className: a, children: o, position: c = g.position, ...l }, u) => /* @__PURE__ */ f(m.Portal, { children: /* @__PURE__ */ p(m.Content, {
	ref: u,
	className: s("relative max-h-96 min-w-[8rem]", r, e, i, n, t, c === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", a),
	position: c,
	...l,
	children: [
		/* @__PURE__ */ f(x, {}),
		/* @__PURE__ */ f(m.Viewport, {
			className: s("p-1", c === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children: o
		}),
		/* @__PURE__ */ f(S, {})
	]
}) }));
C.displayName = m.Content.displayName;
var w = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(m.Label, {
	ref: n,
	className: s("px-2 py-1.5 text-xs font-medium text-muted-foreground", e),
	...t
}));
w.displayName = m.Label.displayName;
var T = c.forwardRef(({ className: e, children: t, "data-ai-kind": n, "data-ai-label": r, ...i }, c) => {
	let u = o(r, void 0, void 0, void 0, void 0, t);
	return /* @__PURE__ */ p(m.Item, {
		ref: c,
		className: s("relative flex min-h-8 w-full cursor-pointer select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", e),
		"data-ai-kind": n ?? a.listItem,
		"data-ai-label": u,
		...i,
		children: [/* @__PURE__ */ f("span", {
			className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
			children: /* @__PURE__ */ f(m.ItemIndicator, { children: /* @__PURE__ */ f(l, { className: "h-4 w-4" }) })
		}), /* @__PURE__ */ f(m.ItemText, { children: t })]
	});
});
T.displayName = m.Item.displayName;
var E = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(m.Separator, {
	ref: n,
	className: s("-mx-0.5 my-1 h-px bg-border", e),
	...t
}));
E.displayName = m.Separator.displayName;
export { _ as Select, C as SelectContent, v as SelectGroup, T as SelectItem, w as SelectLabel, S as SelectScrollDownButton, x as SelectScrollUpButton, E as SelectSeparator, b as SelectTrigger, y as SelectValue, g as selectContentDefaults, h as selectContentPositionOptions };
