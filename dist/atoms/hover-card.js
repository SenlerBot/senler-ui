import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
import * as n from "@radix-ui/react-hover-card";
//#region src/atoms/hover-card.tsx
function r({ ...e }) {
	return /* @__PURE__ */ t(n.Root, {
		"data-slot": "hover-card",
		...e
	});
}
function i({ ...e }) {
	return /* @__PURE__ */ t(n.Trigger, {
		"data-slot": "hover-card-trigger",
		...e
	});
}
function a({ className: r, align: i = "center", sideOffset: a = 4, ...o }) {
	return /* @__PURE__ */ t(n.Portal, {
		"data-slot": "hover-card-portal",
		children: /* @__PURE__ */ t(n.Content, {
			"data-slot": "hover-card-content",
			align: i,
			sideOffset: a,
			className: e("z-[10000] w-64 origin-[--radix-hover-card-content-transform-origin]", "rounded-lg p-2 border border-border bg-popover", "shadow-md outline-hidden", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2", "data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2", "data-[side=top]:slide-in-from-bottom-2", "duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]", "will-change-transform,opacity", r),
			...o
		})
	});
}
//#endregion
export { a as HoverCardContent, r as HoverCardRoot, i as HoverCardTrigger };
