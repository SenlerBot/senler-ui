import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-scroll-area";
//#region src/atoms/scroll-area.tsx
function i({ className: i, children: o, ...s }) {
	return /* @__PURE__ */ n(r.Root, {
		"data-slot": "scroll-area",
		className: e("relative", i),
		...s,
		children: [
			/* @__PURE__ */ t(r.Viewport, {
				"data-slot": "scroll-area-viewport",
				className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
				children: o
			}),
			/* @__PURE__ */ t(a, {}),
			/* @__PURE__ */ t(r.Corner, {})
		]
	});
}
function a({ className: n, orientation: i = "vertical", ...a }) {
	return /* @__PURE__ */ t(r.ScrollAreaScrollbar, {
		"data-slot": "scroll-area-scrollbar",
		orientation: i,
		className: e("flex touch-none p-px transition-colors select-none", i === "vertical" && "h-full w-2.5 border-l border-l-transparent", i === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", n),
		...a,
		children: /* @__PURE__ */ t(r.ScrollAreaThumb, {
			"data-slot": "scroll-area-thumb",
			className: "bg-border relative flex-1 rounded-full"
		})
	});
}
//#endregion
export { i as ScrollArea, a as ScrollBar };
