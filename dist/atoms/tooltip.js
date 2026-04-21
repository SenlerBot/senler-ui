import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
import * as n from "@radix-ui/react-tooltip";
//#region src/atoms/tooltip.tsx
function r({ delayDuration: e = 350, ...r }) {
	return /* @__PURE__ */ t(n.Provider, {
		"data-slot": "tooltip-provider",
		delayDuration: e,
		...r
	});
}
function i({ ...e }) {
	return /* @__PURE__ */ t(r, { children: /* @__PURE__ */ t(n.Root, {
		"data-slot": "tooltip",
		...e
	}) });
}
function a({ ...e }) {
	return /* @__PURE__ */ t(n.Trigger, {
		"data-slot": "tooltip-trigger",
		...e
	});
}
function o({ className: r, sideOffset: i = 5, children: a, ...o }) {
	return /* @__PURE__ */ t(n.Portal, { children: /* @__PURE__ */ t(n.Content, {
		"data-slot": "tooltip-content",
		sideOffset: i,
		className: e("max-w-[320px] rounded-lg px-2 py-1 leading-6 text-xs", "bg-card border border-border", "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]", "duration-100 ease-[cubic-bezier(0.16,1,0.3,1)]", "will-change-transform,opacity z-[9999]", "animate-in fade-in-0 zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", r),
		...o,
		children: a
	}) });
}
//#endregion
export { i as Tooltip, o as TooltipContent, r as TooltipProvider, a as TooltipTrigger };
