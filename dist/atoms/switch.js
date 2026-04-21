import { cn as e } from "../lib/utils/cn.js";
import { literalKeys as t } from "../lib/literal-keys.js";
import * as n from "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { cva as o } from "class-variance-authority";
//#region src/atoms/switch.tsx
var s = {
	xs: "h-3.5 w-5.5 p-0.5",
	tiny: "h-4 w-[26px] p-0.5",
	small: "h-5 w-7.5 p-0.75"
}, c = t(s), l = {
	size: "small",
	value: "on"
}, u = {
	xs: "size-2.5 data-[state=checked]:translate-x-2",
	tiny: "size-3 data-[state=checked]:translate-x-2.5",
	small: "size-4 data-[state=checked]:translate-x-2"
}, d = o("peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", {
	variants: { size: s },
	defaultVariants: { size: l.size }
}), f = o("pointer-events-none block rounded-full ring-0 transition-transform", {
	variants: { size: u },
	defaultVariants: { size: l.size }
}), p = {
	position: "absolute",
	width: "1px",
	height: "1px",
	margin: "0",
	padding: "0",
	opacity: "0",
	pointerEvents: "none"
};
function m(e) {
	return e ? "checked" : "unchecked";
}
var h = n.forwardRef(({ checked: t, defaultChecked: o = !1, onCheckedChange: s, disabled: c = !1, required: u = !1, name: h, value: g = l.value, form: _, className: v, size: y, onClick: b, ...x }, S) => {
	let C = t !== void 0, [w, T] = n.useState(o), E = t ?? w, D = m(E), O = !!h || u || !!_, k = n.useCallback((e) => {
		if (b?.(e), e.defaultPrevented || c) return;
		let t = !E;
		C || T(t), s?.(t);
	}, [
		E,
		c,
		C,
		s,
		b
	]);
	return /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i("button", {
		...x,
		ref: S,
		type: "button",
		role: "switch",
		"aria-checked": E,
		"aria-required": u,
		disabled: c,
		"data-slot": "switch",
		"data-state": D,
		"data-disabled": c ? "" : void 0,
		className: e(d({
			size: y,
			className: v
		}), "bg-input", "focus-visible:border-ring focus-visible:ring-ring/50", "hover:bg-muted", "focus:bg-muted", "data-[state=checked]:bg-primary", "data-[state=checked]:hover:bg-primary/90", "data-[state=checked]:focus:bg-primary/90"),
		onClick: k,
		children: /* @__PURE__ */ i("span", {
			"data-slot": "switch-thumb",
			"data-state": D,
			"data-disabled": c ? "" : void 0,
			className: e(f({ size: y }), "bg-background shadow-md", "data-[state=unchecked]:translate-x-0")
		})
	}), O ? /* @__PURE__ */ i("input", {
		"aria-hidden": "true",
		type: "checkbox",
		tabIndex: -1,
		name: h,
		form: _,
		value: g,
		checked: E,
		required: u,
		disabled: c,
		readOnly: !0,
		style: p
	}) : null] });
});
h.displayName = "Switch";
//#endregion
export { h as Switch, l as switchDefaults, s as switchSizeClasses, c as switchSizeOptions, u as switchThumbSizeClasses };
