import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
import { cva as n } from "class-variance-authority";
import * as r from "@radix-ui/react-announce";
//#region src/atoms/announce.tsx
var i = n("rounded-md text-sm/4 font-medium", {
	variants: {
		color: {
			grey: "bg-secondary",
			error: "border text-destructive border-border"
		},
		size: { small: "px-2 py-2" }
	},
	defaultVariants: {
		color: "grey",
		size: "small"
	}
});
function a({ className: n, color: a, size: o, asChild: s = !1, ...c }) {
	return /* @__PURE__ */ t(r.Root, {
		asChild: s,
		"data-slot": "announce",
		className: e(i({
			color: a,
			size: o,
			className: n
		})),
		...c
	});
}
//#endregion
export { a as Announce, i as announceVariants };
