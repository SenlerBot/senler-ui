import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { Circle as n } from "lucide-react";
import { jsx as r } from "react/jsx-runtime";
import * as i from "@radix-ui/react-radio-group";
//#region src/atoms/radio-group.tsx
var a = t.forwardRef(({ className: t, ...n }, a) => /* @__PURE__ */ r(i.Root, {
	className: e("grid gap-2", t),
	...n,
	ref: a
}));
a.displayName = i.Root.displayName;
var o = t.forwardRef(({ className: t, ...a }, o) => /* @__PURE__ */ r(i.Item, {
	ref: o,
	className: e("aspect-square h-4 w-4 rounded-full border border-border text-primary ring-offset-background", "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50", t),
	...a,
	children: /* @__PURE__ */ r(i.Indicator, {
		className: "flex items-center justify-center",
		children: /* @__PURE__ */ r(n, { className: "h-2.5 w-2.5 fill-current text-current" })
	})
}));
o.displayName = i.Item.displayName;
//#endregion
export { a as RadioGroup, o as RadioGroupItem };
