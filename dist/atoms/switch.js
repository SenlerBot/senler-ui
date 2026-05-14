import { cn as e } from "../lib/utils/cn.js";
import { literalKeys as t } from "../lib/literal-keys.js";
import { AI_KIND as n, getAiLabelFallback as r } from "../lib/ai-auto-attributes.js";
import * as i from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { cva as c } from "class-variance-authority";
//#region src/atoms/switch.tsx
var l = {
	xs: "h-3.5 w-5.5 p-0.5",
	tiny: "h-4 w-[26px] p-0.5",
	small: "h-5 w-7.5 p-0.75"
}, u = t(l), d = {
	size: "small",
	value: "on"
}, f = {
	xs: "size-2.5 data-[state=checked]:translate-x-2",
	tiny: "size-3 data-[state=checked]:translate-x-2.5",
	small: "size-4 data-[state=checked]:translate-x-2"
}, p = c("peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", {
	variants: { size: l },
	defaultVariants: { size: d.size }
}), m = c("pointer-events-none block rounded-full ring-0 transition-transform", {
	variants: { size: f },
	defaultVariants: { size: d.size }
}), h = {
	position: "absolute",
	width: "1px",
	height: "1px",
	margin: "0",
	padding: "0",
	opacity: "0",
	pointerEvents: "none"
};
function g(e) {
	return e ? "checked" : "unchecked";
}
var _ = i.forwardRef(({ checked: t, defaultChecked: c = !1, onCheckedChange: l, disabled: u = !1, required: f = !1, name: _, value: v = d.value, form: y, className: b, size: x, onClick: S, "aria-label": C, title: w, "data-ai-kind": T, "data-ai-label": E, ...D }, O) => {
	let k = t !== void 0, [A, j] = i.useState(c), M = t ?? A, N = g(M), P = !!_ || f || !!y, F = r(E, typeof C == "string" ? C : void 0, typeof w == "string" ? w : void 0, void 0, _), I = i.useCallback((e) => {
		if (S?.(e), e.defaultPrevented || u) return;
		let t = !M;
		k || j(t), l?.(t);
	}, [
		M,
		u,
		k,
		l,
		S
	]);
	return /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o("button", {
		...D,
		ref: O,
		type: "button",
		role: "switch",
		"aria-checked": M,
		"aria-required": f,
		disabled: u,
		"data-slot": "switch",
		"data-ai-kind": T ?? n.field,
		"data-ai-label": F,
		"data-state": N,
		"data-disabled": u ? "" : void 0,
		"aria-label": C,
		title: w,
		className: e(p({
			size: x,
			className: b
		}), "bg-input", "focus-visible:border-ring focus-visible:ring-ring/50", "hover:bg-muted", "focus:bg-muted", "data-[state=checked]:bg-primary", "data-[state=checked]:hover:bg-primary/90", "data-[state=checked]:focus:bg-primary/90"),
		onClick: I,
		children: /* @__PURE__ */ o("span", {
			"data-slot": "switch-thumb",
			"data-state": N,
			"data-disabled": u ? "" : void 0,
			className: e(m({ size: x }), "bg-background shadow-md", "data-[state=unchecked]:translate-x-0")
		})
	}), P ? /* @__PURE__ */ o("input", {
		"aria-hidden": "true",
		type: "checkbox",
		tabIndex: -1,
		name: _,
		form: y,
		value: v,
		checked: M,
		required: f,
		disabled: u,
		readOnly: !0,
		style: h
	}) : null] });
});
_.displayName = "Switch";
//#endregion
export { _ as Switch, d as switchDefaults, l as switchSizeClasses, u as switchSizeOptions, f as switchThumbSizeClasses };
