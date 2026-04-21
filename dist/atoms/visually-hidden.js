import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/atoms/visually-hidden.tsx
var r = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("span", {
	ref: i,
	className: e("absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0", t),
	style: {
		clip: "rect(0, 0, 0, 0)",
		clipPath: "inset(50%)"
	},
	...r
}));
r.displayName = "VisuallyHidden";
//#endregion
export { r as VisuallyHidden };
