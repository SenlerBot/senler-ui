import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
import * as n from "@radix-ui/react-separator";
//#region src/atoms/separator.tsx
function r({ className: r, orientation: i = "horizontal", decorative: a = !0, ...o }) {
	return /* @__PURE__ */ t(n.Root, {
		"data-slot": "separator",
		decorative: a,
		orientation: i,
		className: e("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", r),
		...o
	});
}
//#endregion
export { r as Separator };
