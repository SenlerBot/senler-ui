import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { XIcon as n } from "lucide-react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import * as a from "@radix-ui/react-dialog";
//#region src/atoms/dialog.tsx
var o = { showCloseButton: !0 };
function s({ ...e }) {
	return /* @__PURE__ */ r(a.Root, {
		"data-slot": "dialog",
		"data-no-dnd": !0,
		...e
	});
}
function c({ ...e }) {
	return /* @__PURE__ */ r(a.Trigger, {
		"data-slot": "dialog-trigger",
		...e
	});
}
function l({ ...e }) {
	return /* @__PURE__ */ r(a.Portal, {
		"data-slot": "dialog-portal",
		...e
	});
}
function u({ ...e }) {
	return /* @__PURE__ */ r(a.Close, {
		"data-slot": "dialog-close",
		...e
	});
}
var d = t.forwardRef(({ className: t, ...n }, i) => /* @__PURE__ */ r(a.Overlay, {
	ref: i,
	"data-slot": "dialog-overlay",
	"data-no-dnd": !0,
	style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
	className: e("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50", t),
	...n
}));
d.displayName = a.Overlay.displayName;
var f = t.forwardRef(({ className: t, children: s, showCloseButton: c = o.showCloseButton, ...u }, f) => /* @__PURE__ */ i(l, {
	"data-slot": "dialog-portal",
	children: [/* @__PURE__ */ r(d, {}), /* @__PURE__ */ r(a.Content, {
		ref: f,
		"data-slot": "dialog-content",
		className: "fixed inset-0 z-50 overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",
		...u,
		children: /* @__PURE__ */ i("div", {
			className: "relative flex min-h-full items-center justify-center p-4",
			children: [/* @__PURE__ */ r(a.Close, {
				asChild: !0,
				children: /* @__PURE__ */ r("div", {
					className: "absolute inset-0",
					"aria-hidden": "true"
				})
			}), /* @__PURE__ */ i("div", {
				className: e("bg-background relative z-10 grid w-full gap-4 rounded-lg border p-4 shadow-lg sm:max-w-lg", t),
				children: [s, c && /* @__PURE__ */ r(a.Close, {
					"data-slot": "dialog-close",
					className: "absolute top-3 right-3 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none",
					asChild: !0,
					children: /* @__PURE__ */ i("button", {
						type: "button",
						className: "inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted",
						children: [/* @__PURE__ */ r(n, { className: "h-4 w-4" }), /* @__PURE__ */ r("span", {
							className: "sr-only",
							children: "Close"
						})]
					})
				})]
			})]
		})
	})]
}));
f.displayName = a.Content.displayName;
function p({ className: t, ...n }) {
	return /* @__PURE__ */ r("div", {
		"data-slot": "dialog-header",
		className: e("flex flex-col gap-2 text-center sm:text-left", t),
		...n
	});
}
function m({ className: t, ...n }) {
	return /* @__PURE__ */ r("div", {
		"data-slot": "dialog-footer",
		className: e("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", t),
		...n
	});
}
function h({ className: t, ...n }) {
	return /* @__PURE__ */ r(a.Title, {
		"data-slot": "dialog-title",
		className: e("text-lg leading-none font-medium", t),
		...n
	});
}
function g({ className: t, ...n }) {
	return /* @__PURE__ */ r(a.Description, {
		"data-slot": "dialog-description",
		className: e("text-muted-foreground text-sm", t),
		...n
	});
}
//#endregion
export { s as Dialog, u as DialogClose, f as DialogContent, g as DialogDescription, m as DialogFooter, p as DialogHeader, d as DialogOverlay, l as DialogPortal, h as DialogTitle, c as DialogTrigger, o as dialogContentDefaults };
