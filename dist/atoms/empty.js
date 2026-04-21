import { cn as e } from "../lib/utils/cn.js";
import { jsx as t } from "react/jsx-runtime";
import { cva as n } from "class-variance-authority";
//#region src/atoms/empty.tsx
function r({ className: n, ...r }) {
	return /* @__PURE__ */ t("div", {
		"data-slot": "empty",
		className: e("flex min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-lg border-dashed p-6 text-center text-balance md:p-12", n),
		...r
	});
}
function i({ className: n, ...r }) {
	return /* @__PURE__ */ t("div", {
		"data-slot": "empty-header",
		className: e("flex max-w-sm flex-col items-center gap-2 text-center", n),
		...r
	});
}
var a = n("flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: { variant: {
		default: "bg-transparent",
		icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"
	} },
	defaultVariants: { variant: "default" }
});
function o({ className: n, variant: r = "default", ...i }) {
	return /* @__PURE__ */ t("div", {
		"data-slot": "empty-icon",
		"data-variant": r,
		className: e(a({
			variant: r,
			className: n
		})),
		...i
	});
}
function s({ className: n, ...r }) {
	return /* @__PURE__ */ t("div", {
		"data-slot": "empty-title",
		className: e("text-md font-medium tracking-tight", n),
		...r
	});
}
function c({ className: n, ...r }) {
	return /* @__PURE__ */ t("div", {
		"data-slot": "empty-description",
		className: e("text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4", n),
		...r
	});
}
function l({ className: n, ...r }) {
	return /* @__PURE__ */ t("div", {
		"data-slot": "empty-content",
		className: e("flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance", n),
		...r
	});
}
//#endregion
export { r as Empty, l as EmptyContent, c as EmptyDescription, i as EmptyHeader, o as EmptyMedia, s as EmptyTitle };
