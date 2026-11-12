import { overlayGlassSurfaceClassName as e, overlayLayerClassName as t, overlayMotionClassName as n, overlaySideAnimationClassName as r, overlaySolidSurfaceClassName as i, overlayStateAnimationClassName as a } from "../lib/overlay-styles.js";
import { cn as o } from "../lib/utils/cn.js";
import "react";
import { jsx as s } from "react/jsx-runtime";
import * as c from "@radix-ui/react-popover";
// src/atoms/popover.tsx
function l({ ...e }) {
	return /* @__PURE__ */ s(c.Root, {
		"data-slot": "popover",
		...e
	});
}
function u({ className: e, ...t }) {
	return /* @__PURE__ */ s(c.Trigger, {
		"data-slot": "popover-trigger",
		className: o("cursor-pointer", e),
		...t
	});
}
function d({ className: l, align: u = "center", sideOffset: d = 4, surface: f = "solid", ...p }) {
	return /* @__PURE__ */ s(c.Portal, { children: /* @__PURE__ */ s(c.Content, {
		"data-slot": "popover-content",
		align: u,
		sideOffset: d,
		className: o(f === "glass" ? e : i, t, "origin-(--radix-popover-content-transform-origin)", a, r, n, l),
		...p
	}) });
}
function f({ ...e }) {
	return /* @__PURE__ */ s(c.Anchor, {
		"data-slot": "popover-anchor",
		...e
	});
}
export { l as Popover, f as PopoverAnchor, d as PopoverContent, u as PopoverTrigger };
