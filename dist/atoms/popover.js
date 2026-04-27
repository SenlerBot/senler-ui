import { cn as e } from "../lib/utils/cn.js";
import { overlayGlassSurfaceClassName as t, overlayLayerClassName as n, overlayMotionClassName as r, overlaySideAnimationClassName as i, overlaySolidSurfaceClassName as a, overlayStateAnimationClassName as o } from "../lib/overlay-styles.js";
import "react";
import { jsx as s } from "react/jsx-runtime";
import * as c from "@radix-ui/react-popover";
//#region src/atoms/popover.tsx
function l({ ...e }) {
	return /* @__PURE__ */ s(c.Root, {
		"data-slot": "popover",
		...e
	});
}
function u({ ...e }) {
	return /* @__PURE__ */ s(c.Trigger, {
		"data-slot": "popover-trigger",
		...e
	});
}
function d({ className: l, align: u = "center", sideOffset: d = 4, surface: f = "solid", ...p }) {
	return /* @__PURE__ */ s(c.Portal, { children: /* @__PURE__ */ s(c.Content, {
		"data-slot": "popover-content",
		align: u,
		sideOffset: d,
		className: e(f === "glass" ? t : a, n, "origin-(--radix-popover-content-transform-origin)", o, i, r, l),
		...p
	}) });
}
function f({ ...e }) {
	return /* @__PURE__ */ s(c.Anchor, {
		"data-slot": "popover-anchor",
		...e
	});
}
//#endregion
export { l as Popover, f as PopoverAnchor, d as PopoverContent, u as PopoverTrigger };
