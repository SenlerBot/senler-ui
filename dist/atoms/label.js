import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/atoms/label.tsx
var r = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("label", {
	ref: i,
	className: e("block font-medium text-foreground", t),
	...r
}));
r.displayName = "Label";
//#endregion
export { r as Label };
