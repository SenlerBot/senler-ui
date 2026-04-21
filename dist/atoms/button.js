import { cn as e } from "../lib/utils/cn.js";
import { literalKeys as t } from "../lib/literal-keys.js";
import { Loader2Icon as n } from "lucide-react";
import { jsx as r } from "react/jsx-runtime";
import { cva as i } from "class-variance-authority";
import { Slot as a } from "@radix-ui/react-slot";
//#region src/atoms/button.tsx
var o = {
	default: "bg-primary text-primary-foreground hover:bg-primary/90",
	destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
	outline: "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
	secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
	ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
	link: "text-primary underline-offset-4 hover:underline"
}, s = t(o), c = {
	default: "h-7 px-2 py-2 gap-1",
	sm: "h-8 rounded-md gap-1 px-2",
	lg: "h-10 rounded-md px-3",
	icon: "size-7",
	icon_sm: "size-6",
	none: "p-0 h-auto"
}, l = t(c), u = [
	"button",
	"submit",
	"reset"
], d = {
	variant: "default",
	size: "default",
	type: "button",
	asChild: !1,
	loading: !1,
	disabled: !1
}, f = i("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
	variants: {
		variant: o,
		size: c
	},
	defaultVariants: {
		variant: d.variant,
		size: d.size
	}
});
function p({ className: t, variant: i, size: o, ref: s, asChild: c = d.asChild, type: l = d.type, loading: u, disabled: p, children: m, ...h }) {
	return /* @__PURE__ */ r(c ? a : "button", {
		ref: s,
		type: l,
		"data-slot": "button",
		disabled: p || u,
		className: e(f({
			variant: i,
			size: o,
			className: t
		})),
		...h,
		children: u && !c ? /* @__PURE__ */ r(n, { className: "size-4 animate-spin" }) : m
	});
}
//#endregion
export { p as Button, d as buttonDefaults, c as buttonSizeClasses, l as buttonSizeOptions, u as buttonTypeOptions, o as buttonVariantClasses, s as buttonVariantOptions, f as buttonVariants };
