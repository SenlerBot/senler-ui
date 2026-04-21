import { cn as e } from "../lib/utils/cn.js";
import { buttonVariants as t } from "./button.js";
import * as n from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import * as a from "@radix-ui/react-alert-dialog";
//#region src/atoms/alert-dialog.tsx
var o = a.Root, s = a.Trigger, c = a.Portal, l = n.forwardRef(({ className: t, ...n }, i) => /* @__PURE__ */ r(a.Overlay, {
	className: e("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", t),
	...n,
	ref: i
}));
l.displayName = a.Overlay.displayName;
var u = n.forwardRef(({ className: t, ...n }, o) => /* @__PURE__ */ i(c, { children: [/* @__PURE__ */ r(l, {}), /* @__PURE__ */ r("div", {
	className: "fixed inset-0 z-50 overflow-y-auto",
	children: /* @__PURE__ */ r("div", {
		className: "flex min-h-full items-center justify-center p-4",
		children: /* @__PURE__ */ r(a.Content, {
			ref: o,
			className: e("relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", t),
			...n
		})
	})
})] }));
u.displayName = a.Content.displayName;
var d = ({ className: t, ...n }) => /* @__PURE__ */ r("div", {
	className: e("flex flex-col space-y-2 text-center sm:text-left", t),
	...n
});
d.displayName = "AlertDialogHeader";
var f = ({ className: t, ...n }) => /* @__PURE__ */ r("div", {
	className: e("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", t),
	...n
});
f.displayName = "AlertDialogFooter";
var p = n.forwardRef(({ className: t, ...n }, i) => /* @__PURE__ */ r(a.Title, {
	ref: i,
	className: e("text-lg font-semibold", t),
	...n
}));
p.displayName = a.Title.displayName;
var m = n.forwardRef(({ className: t, ...n }, i) => /* @__PURE__ */ r(a.Description, {
	ref: i,
	className: e("text-sm text-muted-foreground", t),
	...n
}));
m.displayName = a.Description.displayName;
var h = n.forwardRef(({ className: n, ...i }, o) => /* @__PURE__ */ r(a.Action, {
	ref: o,
	className: e(t(), n),
	...i
}));
h.displayName = a.Action.displayName;
var g = n.forwardRef(({ className: n, ...i }, o) => /* @__PURE__ */ r(a.Cancel, {
	ref: o,
	className: e(t({ variant: "outline" }), "mt-2 sm:mt-0", n),
	...i
}));
g.displayName = a.Cancel.displayName;
//#endregion
export { o as AlertDialog, h as AlertDialogAction, g as AlertDialogCancel, u as AlertDialogContent, m as AlertDialogDescription, f as AlertDialogFooter, d as AlertDialogHeader, l as AlertDialogOverlay, c as AlertDialogPortal, p as AlertDialogTitle, s as AlertDialogTrigger };
