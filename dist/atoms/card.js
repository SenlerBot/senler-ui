import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/atoms/card.tsx
var r = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("div", {
	ref: i,
	className: e("rounded-lg border bg-card text-card-foreground shadow-none", t),
	...r
}));
r.displayName = "Card";
var i = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("div", {
	ref: i,
	className: e("flex flex-col space-y-1.5 p-4", t),
	...r
}));
i.displayName = "CardHeader";
var a = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("div", {
	ref: i,
	className: e("text-lg font-semibold leading-none tracking-tight", t),
	...r
}));
a.displayName = "CardTitle";
var o = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("div", {
	ref: i,
	className: e("text-sm text-muted-foreground", t),
	...r
}));
o.displayName = "CardDescription";
var s = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("div", {
	ref: i,
	className: e("p-4 pt-0", t),
	...r
}));
s.displayName = "CardContent";
var c = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("div", {
	ref: i,
	className: e("flex items-center p-4 pt-0", t),
	...r
}));
c.displayName = "CardFooter";
//#endregion
export { r as Card, s as CardContent, o as CardDescription, c as CardFooter, i as CardHeader, a as CardTitle };
