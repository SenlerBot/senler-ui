import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-avatar";
//#region src/atoms/avatar.tsx
function i({ className: n, ...i }) {
	return /* @__PURE__ */ t(r.Root, {
		"data-slot": "avatar",
		className: e("relative flex size-6 shrink-0 overflow-hidden rounded-full", n),
		...i
	});
}
function a({ className: n, ...i }) {
	return /* @__PURE__ */ t(r.Image, {
		"data-slot": "avatar-image",
		className: e("aspect-square size-full", n),
		...i
	});
}
function o({ className: n, ...i }) {
	return /* @__PURE__ */ t(r.Fallback, {
		"data-slot": "avatar-fallback",
		className: e("flex size-full items-center justify-center rounded-full bg-muted", n),
		...i
	});
}
function s({ src: e, alt: r, ...s }) {
	return /* @__PURE__ */ n(i, {
		...s,
		children: [/* @__PURE__ */ t(a, {
			src: e,
			alt: r
		}), r ? /* @__PURE__ */ t(o, { children: r.charAt(0).toUpperCase() }) : null]
	});
}
//#endregion
export { s as Avatar, o as AvatarFallback, a as AvatarImage, i as AvatarRoot };
