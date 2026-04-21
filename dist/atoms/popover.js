import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
import * as n from "@radix-ui/react-popover";
//#region src/atoms/popover.tsx
function r({ ...e }) {
	return /* @__PURE__ */ t(n.Root, {
		"data-slot": "popover",
		...e
	});
}
function i({ ...e }) {
	return /* @__PURE__ */ t(n.Trigger, {
		"data-slot": "popover-trigger",
		...e
	});
}
function a({ className: r, align: i = "center", sideOffset: a = 4, ...o }) {
	return /* @__PURE__ */ t(n.Portal, { children: /* @__PURE__ */ t(n.Content, {
		"data-slot": "popover-content",
		align: i,
		sideOffset: a,
		className: e("outline-none rounded-md", "shadow-[0px_3px_12px_rgba(0,0,0,0.09)]", "border-[0.5px] border-border", "backdrop-blur-[6px] backdrop-saturate-[190%] backdrop-contrast-[50%] backdrop-brightness-[130%]", "bg-popover/50", "z-[99]", "duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]", "will-change-transform,opacity", "data-[state=open]:data-[side=top]:animate-[slideDownAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]", "data-[state=open]:data-[side=right]:animate-[slideLeftAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]", "data-[state=open]:data-[side=bottom]:animate-[slideUpAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]", "data-[state=open]:data-[side=left]:animate-[slideRightAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]", r),
		...o
	}) });
}
function o({ ...e }) {
	return /* @__PURE__ */ t(n.Anchor, {
		"data-slot": "popover-anchor",
		...e
	});
}
//#endregion
export { r as Popover, o as PopoverAnchor, a as PopoverContent, i as PopoverTrigger };
