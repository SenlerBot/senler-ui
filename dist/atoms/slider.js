import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import * as i from "@radix-ui/react-slider";
//#region src/atoms/slider.tsx
var a = t.forwardRef(({ className: t, ...a }, o) => /* @__PURE__ */ r(i.Root, {
	ref: o,
	className: e("relative flex w-full touch-none select-none items-center", t),
	...a,
	children: [/* @__PURE__ */ n(i.Track, {
		className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",
		children: /* @__PURE__ */ n(i.Range, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ n(i.Thumb, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })]
}));
a.displayName = i.Root.displayName;
//#endregion
export { a as Slider };
