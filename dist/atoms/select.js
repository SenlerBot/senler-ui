import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { Check as n, ChevronDown as r, ChevronUp as i } from "lucide-react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import * as s from "@radix-ui/react-select";
//#region src/atoms/select.tsx
var c = ["popper", "item-aligned"], l = { position: "popper" }, u = s.Root, d = s.Group, f = s.Value, p = t.forwardRef(({ className: t, children: n, ...i }, c) => /* @__PURE__ */ o(s.Trigger, {
	ref: c,
	className: e("flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", t),
	...i,
	children: [n, /* @__PURE__ */ a(s.Icon, {
		asChild: !0,
		children: /* @__PURE__ */ a(r, { className: "h-4 w-4 opacity-50" })
	})]
}));
p.displayName = s.Trigger.displayName;
var m = t.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ a(s.ScrollUpButton, {
	ref: r,
	className: e("flex cursor-default items-center justify-center py-1", t),
	...n,
	children: /* @__PURE__ */ a(i, { className: "h-4 w-4" })
}));
m.displayName = s.ScrollUpButton.displayName;
var h = t.forwardRef(({ className: t, ...n }, i) => /* @__PURE__ */ a(s.ScrollDownButton, {
	ref: i,
	className: e("flex cursor-default items-center justify-center py-1", t),
	...n,
	children: /* @__PURE__ */ a(r, { className: "h-4 w-4" })
}));
h.displayName = s.ScrollDownButton.displayName;
var g = t.forwardRef(({ className: t, children: n, position: r = l.position, ...i }, c) => /* @__PURE__ */ a(s.Portal, { children: /* @__PURE__ */ o(s.Content, {
	ref: c,
	className: e("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", r === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", t),
	position: r,
	...i,
	children: [
		/* @__PURE__ */ a(m, {}),
		/* @__PURE__ */ a(s.Viewport, {
			className: e("p-1", r === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children: n
		}),
		/* @__PURE__ */ a(h, {})
	]
}) }));
g.displayName = s.Content.displayName;
var _ = t.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ a(s.Label, {
	ref: r,
	className: e("py-1.5 pl-8 pr-2 text-sm font-semibold", t),
	...n
}));
_.displayName = s.Label.displayName;
var v = t.forwardRef(({ className: t, children: r, ...i }, c) => /* @__PURE__ */ o(s.Item, {
	ref: c,
	className: e("relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", t),
	...i,
	children: [/* @__PURE__ */ a("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ a(s.ItemIndicator, { children: /* @__PURE__ */ a(n, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ a(s.ItemText, { children: r })]
}));
v.displayName = s.Item.displayName;
var y = t.forwardRef(({ className: t, ...n }, r) => /* @__PURE__ */ a(s.Separator, {
	ref: r,
	className: e("-mx-1 my-1 h-px bg-muted", t),
	...n
}));
y.displayName = s.Separator.displayName;
//#endregion
export { u as Select, g as SelectContent, d as SelectGroup, v as SelectItem, _ as SelectLabel, h as SelectScrollDownButton, m as SelectScrollUpButton, y as SelectSeparator, p as SelectTrigger, f as SelectValue, l as selectContentDefaults, c as selectContentPositionOptions };
