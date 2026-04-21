import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { jsx as n } from "react/jsx-runtime";
import { cva as r } from "class-variance-authority";
//#region src/atoms/link.tsx
var i = r("flex items-center gap-1.5 leading-normal cursor-default text-primary text-sm transition-colors", {
	variants: {
		hover: {
			text: "hover:text-accent-foreground",
			block: "hover:bg-accent hover:text-accent-foreground rounded-md",
			none: ""
		},
		disabled: { true: "text-muted-foreground pointer-events-none opacity-70 [&_svg]:text-muted-foreground" },
		underline: { true: "underline" },
		color: {
			main: "text-primary [&_svg]:text-primary",
			none: "text-inherit"
		}
	},
	defaultVariants: {
		color: "main",
		hover: "text"
	}
}), a = t.forwardRef(({ className: t, hover: r, disabled: a, underline: o, color: s, ...c }, l) => /* @__PURE__ */ n("a", {
	className: e(i({
		hover: r,
		disabled: a,
		underline: o,
		color: s,
		className: t
	})),
	ref: l,
	...c
}));
a.displayName = "Link";
//#endregion
export { a as Link, i as linkVariants };
