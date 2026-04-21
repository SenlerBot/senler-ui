import { cn as e } from "../lib/utils/cn.js";
import { literalKeys as t } from "../lib/literal-keys.js";
import "react";
import { jsx as n } from "react/jsx-runtime";
import { cva as r } from "class-variance-authority";
//#region src/atoms/badge.tsx
var i = {
	default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
	secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
	destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
	outline: "text-foreground",
	success: "border-transparent bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25",
	warning: "border-transparent bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/25",
	error: "border-transparent bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/25",
	info: "border-transparent bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25",
	purple: "border-transparent bg-purple-500/15 text-purple-700 dark:text-purple-400 hover:bg-purple-500/25",
	cyan: "border-transparent bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-500/25",
	teal: "border-transparent bg-teal-500/15 text-teal-700 dark:text-teal-400 hover:bg-teal-500/25",
	orange: "border-transparent bg-orange-500/15 text-orange-700 dark:text-orange-400 hover:bg-orange-500/25",
	indigo: "border-transparent bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-500/25",
	violet: "border-transparent bg-violet-500/15 text-violet-700 dark:text-violet-400 hover:bg-violet-500/25",
	pink: "border-transparent bg-pink-500/15 text-pink-700 dark:text-pink-400 hover:bg-pink-500/25"
}, a = t(i), o = { variant: "default" }, s = r("inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: i },
	defaultVariants: { variant: o.variant }
});
function c({ className: t, variant: r, ...i }) {
	return /* @__PURE__ */ n("div", {
		className: e(s({ variant: r }), t),
		...i
	});
}
//#endregion
export { c as Badge, o as badgeDefaults, i as badgeVariantClasses, a as badgeVariantOptions, s as badgeVariants };
