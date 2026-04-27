import { cn as e } from "../lib/utils/cn.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { cva as r } from "class-variance-authority";
//#region src/atoms/chip.tsx
var i = r("inline-flex items-center rounded-full font-medium transition-colors", {
	variants: {
		color: {
			primary: "",
			secondary: "",
			success: "",
			error: "",
			info: "",
			default: ""
		},
		size: {
			small: "px-2 py-0.5 text-xs",
			medium: "px-3 py-1 text-sm"
		},
		variant: {
			filled: "",
			outlined: "border bg-transparent"
		}
	},
	compoundVariants: [
		{
			variant: "filled",
			color: "primary",
			className: "bg-primary text-primary-foreground"
		},
		{
			variant: "filled",
			color: "secondary",
			className: "bg-secondary text-secondary-foreground"
		},
		{
			variant: "filled",
			color: "success",
			className: "bg-green-500/15 text-green-700 dark:text-green-400"
		},
		{
			variant: "filled",
			color: "error",
			className: "bg-red-500/15 text-red-700 dark:text-red-400"
		},
		{
			variant: "filled",
			color: "info",
			className: "bg-blue-500/15 text-blue-700 dark:text-blue-400"
		},
		{
			variant: "filled",
			color: "default",
			className: "bg-muted text-foreground"
		},
		{
			variant: "outlined",
			color: "primary",
			className: "border-primary text-primary"
		},
		{
			variant: "outlined",
			color: "secondary",
			className: "border-secondary text-secondary-foreground"
		},
		{
			variant: "outlined",
			color: "success",
			className: "border-green-500/40 text-green-700 dark:text-green-400"
		},
		{
			variant: "outlined",
			color: "error",
			className: "border-red-500/40 text-red-700 dark:text-red-400"
		},
		{
			variant: "outlined",
			color: "info",
			className: "border-blue-500/40 text-blue-700 dark:text-blue-400"
		},
		{
			variant: "outlined",
			color: "default",
			className: "border-border text-muted-foreground"
		}
	],
	defaultVariants: {
		color: "default",
		size: "medium",
		variant: "filled"
	}
});
function a({ label: r, color: a, size: o, variant: s, className: c, icon: l }) {
	return /* @__PURE__ */ n("span", {
		className: e(i({
			color: a,
			size: o,
			variant: s
		}), c),
		children: [l ? /* @__PURE__ */ t("span", {
			className: "mr-1 flex items-center",
			children: l
		}) : null, r]
	});
}
//#endregion
export { a as Chip, i as chipVariants };
