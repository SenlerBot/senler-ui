import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { jsx as n } from "react/jsx-runtime";
import { Root as r } from "@radix-ui/react-form";
//#region src/atoms/form.tsx
var i = t.forwardRef(({ className: t, ...i }, a) => /* @__PURE__ */ n(r, {
	ref: a,
	className: e("flex flex-col", t),
	...i
}));
i.displayName = "Form";
//#endregion
export { i as Form };
