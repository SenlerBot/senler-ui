import { AI_KIND as e, getAiLabelFallback as t } from "../lib/ai-auto-attributes.js";
import { cn as n } from "../lib/utils/cn.js";
import { literalKeys as r } from "../lib/literal-keys.js";
import * as i from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { cva as s } from "class-variance-authority";
import * as c from "@radix-ui/react-tabs";
//#region src/atoms/tabs.tsx
var l = {
	default: "gap-[2px] rounded-full bg-muted px-1 py-1",
	underline: "gap-6 border-b border-border"
}, u = r(l), d = {
	small: "h-6",
	medium: "h-8",
	large: "h-8"
}, f = r(d), p = {
	variant: "default",
	size: "medium"
}, m = { variant: "default" }, h = {
	default: "data-[state=active]:bg-background box-border rounded-full px-[6px] py-1 text-[13px] font-medium leading-4 tracking-[-0.0325px] text-foreground",
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
function v({ className: e, ...t }) {
	return /* @__PURE__ */ a(c.Root, {
		"data-slot": "tabs",
		className: n("flex flex-col", e),
		...t
	});
}
function y({ variant: r, count: s, className: l, children: u, "data-ai-kind": d, "data-ai-label": f, ...p }) {
	let h = i.useContext(b), g = r || h?.variant || m.variant, v = t(f, void 0, void 0, void 0, void 0, u);
	return /* @__PURE__ */ o(c.Trigger, {
		"data-slot": "tabs-trigger",
		"data-ai-kind": d ?? e.tab,
		"data-ai-label": v,
		className: n(_({ variant: g }), l),
		...p,
		children: [u, s !== void 0 && s > 0 && /* @__PURE__ */ a("span", {
			className: "text-muted-foreground font-normal",
			children: s
		})]
	});
}
var b = i.createContext(null), x = i.forwardRef(({ size: e = p.size, variant: t = p.variant, className: r, children: i, ...o }, s) => /* @__PURE__ */ a(b.Provider, {
	value: { variant: t },
	children: /* @__PURE__ */ a(c.List, {
		ref: s,
		"data-slot": "tabs-list",
		"data-variant": t,
		className: n(g({
			size: e,
			variant: t
		}), "w-fit", r),
		...o,
		children: i
	})
}));
x.displayName = "TabsList";
function S({ className: e, ...t }) {
	return /* @__PURE__ */ a(c.Content, {
		"data-slot": "tabs-content",
		className: n("flex-1 outline-none w-full", e),
		...t
	});
}
//#endregion
export { S as TabsContent, x as TabsList, v as TabsRoot, y as TabsTrigger, p as tabsListDefaults, d as tabsListSizeClasses, f as tabsListSizeOptions, l as tabsListVariantClasses, u as tabsListVariantOptions, m as tabsTriggerDefaults, h as tabsTriggerVariantClasses };
