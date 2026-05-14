import { cn as e } from "../lib/utils/cn.js";
import { literalKeys as t } from "../lib/literal-keys.js";
import { AI_ACTION as n, AI_KIND as r, getAiLabelFallback as i } from "../lib/ai-auto-attributes.js";
import { Loader2Icon as a } from "lucide-react";
import { jsx as o } from "react/jsx-runtime";
import { cva as s } from "class-variance-authority";
import { Slot as c } from "@radix-ui/react-slot";
//#region src/atoms/button.tsx
var l = {
	default: "bg-primary text-primary-foreground hover:bg-primary/90",
	destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
	outline: "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
	secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
	ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
	link: "text-primary underline-offset-4 hover:underline"
}, u = t(l), d = {
	default: "h-7 px-2 py-2 gap-1",
	sm: "h-8 rounded-md gap-1 px-2",
	lg: "h-10 rounded-md px-3",
	icon: "size-7",
	icon_sm: "size-6",
	none: "p-0 h-auto"
}, f = t(d), p = [
	"button",
	"submit",
	"reset"
], m = {
	variant: "default",
	size: "default",
	type: "button",
	asChild: !1,
	loading: !1,
	disabled: !1
}, h = s("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
	variants: {
		variant: l,
		size: d
	},
	defaultVariants: {
		variant: m.variant,
		size: m.size
	}
});
function g({ className: t, variant: s, size: l, ref: u, asChild: d = m.asChild, type: f = m.type, loading: p, disabled: g, children: _, "aria-label": v, title: y, name: b, "data-ai-kind": x, "data-ai-label": S, "data-ai-action": C, ...w }) {
	let T = d ? c : "button", E = i(S, typeof v == "string" ? v : void 0, typeof y == "string" ? y : void 0, void 0, b, _);
	return /* @__PURE__ */ o(T, {
		ref: u,
		type: f,
		"data-slot": "button",
		"data-ai-kind": x ?? r.button,
		"data-ai-action": C ?? (f === "submit" ? n.save : void 0),
		"data-ai-label": E,
		"aria-label": v,
		title: y,
		name: b,
		disabled: g || p,
		className: e(h({
			variant: s,
			size: l,
			className: t
		})),
		...w,
		children: p && !d ? /* @__PURE__ */ o(a, { className: "size-4 animate-spin" }) : _
	});
}
//#endregion
export { g as Button, m as buttonDefaults, d as buttonSizeClasses, f as buttonSizeOptions, p as buttonTypeOptions, l as buttonVariantClasses, u as buttonVariantOptions, h as buttonVariants };
