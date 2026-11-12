import { cn as e } from "../lib/utils/cn.js";
import { literalKeys as t } from "../lib/literal-keys.js";
import { AI_KIND as n, getAiLabelFallback as r } from "../lib/ai-auto-attributes.js";
import * as i from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { cva as s } from "class-variance-authority";
import * as c from "@radix-ui/react-tabs";
// src/atoms/tabs.tsx
var l = {
	default: "gap-[2px] rounded-full bg-muted px-1 py-1",
	underline: "gap-6 border-b border-border"
}, u = t(l), d = {
	small: "h-7",
	medium: "h-8",
	large: "h-10"
}, f = t(d), p = {
	variant: "default",
	size: "medium"
}, m = { variant: "default" }, h = {
	default: "data-[state=active]:bg-background box-border rounded-full px-[6px] py-1 text-[13px] font-medium leading-4 tracking-[-0.0325px] text-foreground",
	underline: "relative h-full pb-3 pt-0 px-0 text-[15px] font-normal text-muted-foreground data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary"
}, g = {
	small: "text-xs",
	medium: "text-[13px]",
	large: "text-sm"
}, _ = s("inline-flex items-center", {
	variants: {
		variant: l,
		size: d
	},
	defaultVariants: {
		variant: p.variant,
		size: p.size
	}
}), v = s("inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: h,
		size: g
	},
	compoundVariants: [
		{
			variant: "default",
			size: "small",
			className: "h-5"
		},
		{
			variant: "default",
			size: "medium",
			className: "h-6"
		},
		{
			variant: "default",
			size: "large",
			className: "h-8"
		}
	],
	defaultVariants: {
		variant: m.variant,
		size: p.size
	}
});
function y({ className: t, ...n }) {
	return /* @__PURE__ */ a(c.Root, {
		"data-slot": "tabs",
		className: e("flex flex-col", t),
		...n
	});
}
function b({ variant: t, count: s, className: l, children: u, "data-ai-kind": d, "data-ai-label": f, ...h }) {
	let g = i.useContext(x), _ = t || g?.variant || m.variant, y = g?.size || p.size, b = r(f, void 0, void 0, void 0, void 0, u);
	return /* @__PURE__ */ o(c.Trigger, {
		"data-slot": "tabs-trigger",
		"data-ai-kind": d ?? n.tab,
		"data-ai-label": b,
		className: e(v({
			variant: _,
			size: y
		}), l),
		...h,
		children: [u, s !== void 0 && s > 0 && /* @__PURE__ */ a("span", {
			className: "text-muted-foreground font-normal",
			children: s
		})]
	});
}
var x = i.createContext(null), S = i.forwardRef(({ size: t = p.size, variant: n = p.variant, className: r, children: i, ...o }, s) => /* @__PURE__ */ a(x.Provider, {
	value: {
		variant: n,
		size: t
	},
	children: /* @__PURE__ */ a(c.List, {
		ref: s,
		"data-slot": "tabs-list",
		"data-variant": n,
		className: e(_({
			size: t,
			variant: n
		}), "w-fit max-w-full self-start", r),
		...o,
		children: i
	})
}));
S.displayName = "TabsList";
function C({ className: t, ...n }) {
	return /* @__PURE__ */ a(c.Content, {
		"data-slot": "tabs-content",
		className: e("flex-1 outline-none w-full", t),
		...n
	});
}
export { C as TabsContent, S as TabsList, y as TabsRoot, b as TabsTrigger, p as tabsListDefaults, d as tabsListSizeClasses, f as tabsListSizeOptions, l as tabsListVariantClasses, u as tabsListVariantOptions, m as tabsTriggerDefaults, g as tabsTriggerSizeClasses, h as tabsTriggerVariantClasses };
