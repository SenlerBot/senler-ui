"use client";
import { cn as e } from "../lib/utils/cn.js";
import "react";
import { XIcon as t } from "lucide-react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import * as i from "@radix-ui/react-dialog";
//#region src/atoms/sheet.tsx
function a({ ...e }) {
	return /* @__PURE__ */ n(i.Root, {
		"data-slot": "sheet",
		...e
	});
}
function o({ ...e }) {
	return /* @__PURE__ */ n(i.Trigger, {
		"data-slot": "sheet-trigger",
		...e
	});
}
function s({ ...e }) {
	return /* @__PURE__ */ n(i.Close, {
		"data-slot": "sheet-close",
		...e
	});
}
function c({ ...e }) {
	return /* @__PURE__ */ n(i.Portal, {
		"data-slot": "sheet-portal",
		...e
	});
}
function l({ className: t, ...r }) {
	return /* @__PURE__ */ n(i.Overlay, {
		"data-slot": "sheet-overlay",
		className: e("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", t),
		...r
	});
}
function u({ className: a, children: o, side: s = "right", showCloseButton: u = !0, ...d }) {
	return /* @__PURE__ */ r(c, { children: [/* @__PURE__ */ n(l, {}), /* @__PURE__ */ r(i.Content, {
		"data-slot": "sheet-content",
		className: e("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg overflow-y-auto transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500", s === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", s === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm", s === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b", s === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t", a),
		...d,
		children: [o, u && /* @__PURE__ */ r(i.Close, {
			className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
			children: [/* @__PURE__ */ n(t, { className: "size-4" }), /* @__PURE__ */ n("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function d({ className: t, ...r }) {
	return /* @__PURE__ */ n("div", {
		"data-slot": "sheet-header",
		className: e("flex flex-col gap-1.5 p-4", t),
		...r
	});
}
function f({ className: t, ...r }) {
	return /* @__PURE__ */ n("div", {
		"data-slot": "sheet-footer",
		className: e("mt-auto flex flex-col gap-2 p-4", t),
		...r
	});
}
function p({ className: t, ...r }) {
	return /* @__PURE__ */ n(i.Title, {
		"data-slot": "sheet-title",
		className: e("text-foreground font-semibold", t),
		...r
	});
}
function m({ className: t, ...r }) {
	return /* @__PURE__ */ n(i.Description, {
		"data-slot": "sheet-description",
		className: e("text-muted-foreground text-sm", t),
		...r
	});
}
//#endregion
export { a as Sheet, s as SheetClose, u as SheetContent, m as SheetDescription, f as SheetFooter, d as SheetHeader, p as SheetTitle, o as SheetTrigger };
