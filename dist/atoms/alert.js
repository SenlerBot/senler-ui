import { literalKeys as e } from "../lib/literal-keys.js";
import { cn as t } from "../lib/utils/cn.js";
import "react";
import { jsx as n } from "react/jsx-runtime";
import { cva as r } from "class-variance-authority";
// src/atoms/alert.tsx
var i = {
	default: "bg-card text-card-foreground",
	destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
}, a = e(i), o = { variant: "default" }, s = r("relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
	variants: { variant: i },
	defaultVariants: { variant: o.variant }
});
function c({ className: e, variant: r, ...i }) {
	return /* @__PURE__ */ n("div", {
		"data-slot": "alert",
		role: "alert",
		className: t(s({ variant: r }), e),
		...i
	});
}
function l({ className: e, ...r }) {
	return /* @__PURE__ */ n("div", {
		"data-slot": "alert-title",
		className: t("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", e),
		...r
	});
}
function u({ className: e, ...r }) {
	return /* @__PURE__ */ n("div", {
		"data-slot": "alert-description",
		className: t("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", e),
		...r
	});
}
export { c as Alert, u as AlertDescription, l as AlertTitle, o as alertDefaults, i as alertVariantClasses, a as alertVariantOptions };
