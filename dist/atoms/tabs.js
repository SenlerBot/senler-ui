import { cn as e } from "../lib/utils/cn.js";
import { literalKeys as t } from "../lib/literal-keys.js";
import { AI_KIND as n, getAiLabelFallback as r } from "../lib/ai-auto-attributes.js";
import * as i from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { cva as s } from "class-variance-authority";
import * as c from "@radix-ui/react-tabs";
//#region src/atoms/tabs.tsx
var l = {
	default: "p-[2px] gap-[2px] rounded-[6px] bg-muted",
	underline: "gap-6 border-b border-border"
}, u = t(l), d = {
	small: "h-6",
	medium: "h-7",
	large: "h-8"
}, f = t(d), p = {
	variant: "default",
	size: "medium"
}, m = { variant: "default" }, h = {
	default: "data-[state=active]:bg-background box-border rounded-[4px] px-[6px] py-1 text-[13px] font-medium leading-4 tracking-[-0.0325px] text-foreground",
	underline: "relative pb-3 pt-0 px-0 text-[15px] font-normal text-muted-foreground data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary"
}, g = s("inline-flex items-center", {
	variants: {
		variant: l,
		size: d
	},
	defaultVariants: {
		variant: p.variant,
		size: p.size
	}
}), _ = s("inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: { variant: h },
	defaultVariants: { variant: m.variant }
});
function v({ className: t, ...n }) {
	return /* @__PURE__ */ a(c.Root, {
		"data-slot": "tabs",
		className: e("flex flex-col", t),
		...n
	});
}
function y({ variant: t, count: s, className: l, children: u, "data-ai-kind": d, "data-ai-label": f, ...p }) {
	let h = i.useContext(b), g = t || h?.variant || m.variant, v = r(f, void 0, void 0, void 0, void 0, u);
	return /* @__PURE__ */ o(c.Trigger, {
		"data-slot": "tabs-trigger",
		"data-ai-kind": d ?? n.tab,
		"data-ai-label": v,
		className: e(_({ variant: g }), l),
		...p,
		children: [u, s !== void 0 && s > 0 && /* @__PURE__ */ a("span", {
			className: "text-muted-foreground font-normal",
			children: s
		})]
	});
}
var b = i.createContext(null), x = i.forwardRef(({ size: t = p.size, variant: n = p.variant, className: r, children: i, ...o }, s) => /* @__PURE__ */ a(b.Provider, {
	value: { variant: n },
	children: /* @__PURE__ */ a(c.List, {
		ref: s,
		"data-slot": "tabs-list",
		"data-variant": n,
		className: e(g({
			size: t,
			variant: n
		}), "w-fit", r),
		...o,
		children: i
	})
}));
x.displayName = "TabsList";
function S({ className: t, ...n }) {
	return /* @__PURE__ */ a(c.Content, {
		"data-slot": "tabs-content",
		className: e("flex-1 outline-none w-full", t),
		...n
	});
}
//#endregion
export { S as TabsContent, x as TabsList, v as TabsRoot, y as TabsTrigger, p as tabsListDefaults, d as tabsListSizeClasses, f as tabsListSizeOptions, l as tabsListVariantClasses, u as tabsListVariantOptions, m as tabsTriggerDefaults, h as tabsTriggerVariantClasses };
