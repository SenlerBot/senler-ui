import { cn as e } from "../lib/utils/cn.js";
import { literalKeys as t } from "../lib/literal-keys.js";
import * as n from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { cva as a } from "class-variance-authority";
import * as o from "@radix-ui/react-tabs";
//#region src/atoms/tabs.tsx
var s = {
	default: "p-[2px] gap-[2px] rounded-[6px] bg-muted",
	underline: "gap-6 border-b border-border"
}, c = t(s), l = {
	small: "h-6",
	medium: "h-7",
	large: "h-8"
}, u = t(l), d = {
	variant: "default",
	size: "medium"
}, f = { variant: "default" }, p = {
	default: "data-[state=active]:bg-background box-border rounded-[4px] px-[6px] py-1 text-[13px] font-medium leading-4 tracking-[-0.0325px] text-foreground",
	underline: "relative pb-3 pt-0 px-0 text-[15px] font-normal text-muted-foreground data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary"
}, m = a("inline-flex items-center", {
	variants: {
		variant: s,
		size: l
	},
	defaultVariants: {
		variant: d.variant,
		size: d.size
	}
}), h = a("inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: { variant: p },
	defaultVariants: { variant: f.variant }
});
function g({ className: t, ...n }) {
	return /* @__PURE__ */ r(o.Root, {
		"data-slot": "tabs",
		className: e("flex flex-col", t),
		...n
	});
}
function _({ variant: t, count: a, className: s, children: c, ...l }) {
	let u = n.useContext(v), d = t || u?.variant || f.variant;
	return /* @__PURE__ */ i(o.Trigger, {
		"data-slot": "tabs-trigger",
		className: e(h({ variant: d }), s),
		...l,
		children: [c, a !== void 0 && a > 0 && /* @__PURE__ */ r("span", {
			className: "text-muted-foreground font-normal",
			children: a
		})]
	});
}
var v = n.createContext(null), y = n.forwardRef(({ size: t = d.size, variant: n = d.variant, className: i, children: a, ...s }, c) => /* @__PURE__ */ r(v.Provider, {
	value: { variant: n },
	children: /* @__PURE__ */ r(o.List, {
		ref: c,
		"data-slot": "tabs-list",
		"data-variant": n,
		className: e(m({
			size: t,
			variant: n
		}), "w-fit", i),
		...s,
		children: a
	})
}));
y.displayName = "TabsList";
function b({ className: t, ...n }) {
	return /* @__PURE__ */ r(o.Content, {
		"data-slot": "tabs-content",
		className: e("flex-1 outline-none w-full", t),
		...n
	});
}
//#endregion
export { b as TabsContent, y as TabsList, g as TabsRoot, _ as TabsTrigger, d as tabsListDefaults, l as tabsListSizeClasses, u as tabsListSizeOptions, s as tabsListVariantClasses, c as tabsListVariantOptions, f as tabsTriggerDefaults, p as tabsTriggerVariantClasses };
