import { cn as e } from "../lib/utils/cn.js";
import { overlayLayerClassName as t, overlaySolidSurfaceClassName as n } from "../lib/overlay-styles.js";
import { Label as r } from "../atoms/label.js";
import { FieldDescription as i, FieldError as a } from "../atoms/field.js";
import { Check as o, ChevronDown as s, XIcon as c } from "lucide-react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
import d, { components as f } from "react-select";
import p from "react-select/async";
//#region src/compound/searchable-select.tsx
var m = {
	dropdownIndicator: !0,
	loadingMessage: "Loading...",
	noOptionsMessage: "No options",
	placeholder: "Select..."
};
function h() {
	return m.noOptionsMessage;
}
function g() {
	return m.loadingMessage;
}
function _(r, i) {
	return {
		clearIndicator: (t) => e("flex cursor-pointer items-center px-2 text-muted-foreground transition-colors hover:text-foreground", i?.clearIndicator?.(t)),
		container: (t) => e("w-full", i?.container?.(t)),
		control: (t) => e("min-h-10 rounded-md border border-input bg-background text-sm transition-colors", "focus-within:border-primary", t.isDisabled ? "cursor-not-allowed opacity-50" : "cursor-text", r ? "border-destructive focus-within:border-destructive" : null, i?.control?.(t)),
		dropdownIndicator: (t) => e("flex cursor-pointer items-center px-2 text-muted-foreground transition-colors hover:text-foreground", t.selectProps.menuIsOpen ? "rotate-180" : null, i?.dropdownIndicator?.(t)),
		group: (t) => e("px-1 py-1", i?.group?.(t)),
		groupHeading: (t) => e("px-2 py-1.5 text-xs font-medium text-muted-foreground", i?.groupHeading?.(t)),
		indicatorsContainer: (t) => e("shrink-0", i?.indicatorsContainer?.(t)),
		input: (t) => e("text-foreground", i?.input?.(t)),
		loadingIndicator: (t) => e("px-2 text-muted-foreground", i?.loadingIndicator?.(t)),
		loadingMessage: (t) => e("px-3 py-2 text-sm text-muted-foreground", i?.loadingMessage?.(t)),
		menu: (r) => e(t, "mt-1", n, i?.menu?.(r)),
		menuList: (t) => e("max-h-72 overflow-auto p-1", i?.menuList?.(t)),
		menuPortal: (n) => e(t, i?.menuPortal?.(n)),
		multiValue: (t) => e("m-0 flex h-[22px] items-center overflow-hidden rounded border border-border bg-background", i?.multiValue?.(t)),
		multiValueLabel: (t) => e("flex items-center px-1.5 text-xs text-foreground", i?.multiValueLabel?.(t)),
		multiValueRemove: (t) => e("flex h-full cursor-pointer items-center border-l border-border px-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", i?.multiValueRemove?.(t)),
		noOptionsMessage: (t) => e("px-3 py-2 text-sm text-muted-foreground", i?.noOptionsMessage?.(t)),
		option: (t) => e("relative cursor-pointer rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors", t.isSelected || t.isFocused ? "bg-accent/50 text-accent-foreground" : "text-popover-foreground", t.isDisabled ? "cursor-not-allowed opacity-50" : null, i?.option?.(t)),
		placeholder: (t) => e("text-muted-foreground", i?.placeholder?.(t)),
		singleValue: (t) => e("text-foreground", i?.singleValue?.(t)),
		valueContainer: (t) => e("flex min-h-10 flex-1 items-center gap-1 px-3 py-1", i?.valueContainer?.(t))
	};
}
function v(e) {
	return /* @__PURE__ */ u(f.Option, {
		...e,
		children: [e.isSelected ? /* @__PURE__ */ l("span", {
			className: "absolute inset-y-0 left-2 flex items-center",
			"aria-hidden": "true",
			children: /* @__PURE__ */ l(o, { className: "size-4" })
		}) : null, e.children]
	});
}
function y(e) {
	return /* @__PURE__ */ l(f.DropdownIndicator, {
		...e,
		children: /* @__PURE__ */ l(s, { className: "size-4" })
	});
}
function b(e) {
	return /* @__PURE__ */ l(f.ClearIndicator, {
		...e,
		children: /* @__PURE__ */ l(c, { className: "size-4" })
	});
}
function x(e) {
	return /* @__PURE__ */ l(f.MultiValueRemove, {
		...e,
		children: /* @__PURE__ */ l(c, { className: "size-3.5" })
	});
}
function S(e, t) {
	return {
		ClearIndicator: b,
		DropdownIndicator: e ? y : null,
		IndicatorSeparator: null,
		MultiValueRemove: x,
		Option: v,
		...t
	};
}
function C({ children: e, error: t, helperText: n, inputId: o, label: s, wrapperProps: c }) {
	return /* @__PURE__ */ u("div", {
		"data-slot": "searchable-select-field",
		...c,
		children: [
			s ? /* @__PURE__ */ l(r, {
				htmlFor: o,
				className: "mb-1.5 text-sm",
				children: s
			}) : null,
			e,
			t && n ? /* @__PURE__ */ l(a, { children: n }) : null,
			!t && n ? /* @__PURE__ */ l(i, {
				className: "mt-1.5",
				children: n
			}) : null
		]
	});
}
function w({ classNames: e, components: t, dropdownIndicator: n = m.dropdownIndicator, error: r, helperText: i, inputId: a, label: o, loadingMessage: s, noOptionsMessage: c, placeholder: u, unstyled: f, wrapperProps: p, ...v }) {
	return /* @__PURE__ */ l(C, {
		error: r,
		helperText: i,
		inputId: a,
		label: o,
		wrapperProps: p,
		children: /* @__PURE__ */ l(d, {
			"aria-invalid": r || void 0,
			classNames: _(r, e),
			components: S(n, t),
			inputId: a,
			loadingMessage: s ?? g,
			noOptionsMessage: c ?? h,
			placeholder: u ?? m.placeholder,
			unstyled: f ?? !0,
			...v
		})
	});
}
function T({ classNames: e, components: t, dropdownIndicator: n = m.dropdownIndicator, error: r, helperText: i, inputId: a, label: o, loadingMessage: s, noOptionsMessage: c, placeholder: u, unstyled: d, wrapperProps: f, ...v }) {
	return /* @__PURE__ */ l(C, {
		error: r,
		helperText: i,
		inputId: a,
		label: o,
		wrapperProps: f,
		children: /* @__PURE__ */ l(p, {
			"aria-invalid": r || void 0,
			classNames: _(r, e),
			components: S(n, t),
			inputId: a,
			loadingMessage: s ?? g,
			noOptionsMessage: c ?? h,
			placeholder: u ?? m.placeholder,
			unstyled: d ?? !0,
			...v
		})
	});
}
//#endregion
export { T as AsyncSearchableSelect, w as SearchableSelect, m as searchableSelectDefaults };
