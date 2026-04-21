import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
import { cva as n } from "class-variance-authority";
//#region src/atoms/svg-icon.tsx
var r = n("select-none inline-flex flex-shrink-0 align-middle w-full h-full", {
	variants: {
		color: {
			none: "text-inherit [&>svg]:text-inherit",
			primary: "text-primary [&>svg]:text-primary",
			secondary: "text-muted-foreground [&>svg]:text-muted-foreground",
			tertiary: "text-muted-foreground [&>svg]:text-muted-foreground"
		},
		size: {
			xs: "w-3 h-3",
			sm: "w-4 h-4",
			md: "w-[18px] h-[18px]",
			lg: "w-6 h-6"
		}
	},
	defaultVariants: {
		size: "sm",
		color: "secondary"
	}
});
function i({ className: n, color: i, size: a, children: o, ...s }) {
	return /* @__PURE__ */ t("span", {
		className: e(r({
			color: i,
			size: a,
			className: n
		}), "[&>svg]:w-full [&>svg]:h-full [&>svg]:min-w-full [&>svg]:min-h-full"),
		...s,
		children: o
	});
}
//#endregion
export { i as SvgIcon };
