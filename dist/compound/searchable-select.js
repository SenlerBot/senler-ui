import { cn as e } from "../lib/utils/cn.js";
import { overlayLayerClassName as t, overlaySolidSurfaceClassName as n } from "../lib/overlay-styles.js";
import { Label as r } from "../atoms/label.js";
import { FieldDescription as i, FieldError as a } from "../atoms/field.js";
import { ChevronDown as o, XIcon as s } from "lucide-react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import u, { components as d } from "react-select";
import f from "react-select/async";
//#region src/compound/searchable-select.tsx
var p = {
	dropdownIndicator: !0,
	loadingMessage: "Loading...",
	noOptionsMessage: "No options",
	placeholder: "Select..."
};
function m() {
	return p.noOptionsMessage;
}
function h() {
	return p.loadingMessage;
}
function g(r, i) {
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
		menuPortal: (t) => e("z-50", i?.menuPortal?.(t)),
		multiValue: (t) => e("m-0 flex h-[22px] items-center overflow-hidden rounded border border-border bg-background", i?.multiValue?.(t)),
		multiValueLabel: (t) => e("flex items-center px-1.5 text-xs text-foreground", i?.multiValueLabel?.(t)),
		multiValueRemove: (t) => e("flex h-full cursor-pointer items-center border-l border-border px-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", i?.multiValueRemove?.(t)),
		noOptionsMessage: (t) => e("px-3 py-2 text-sm text-muted-foreground", i?.noOptionsMessage?.(t)),
		option: (t) => e("cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-none transition-colors", t.isSelected ? "bg-primary text-primary-foreground" : "text-popover-foreground", !t.isSelected && t.isFocused ? "bg-accent text-accent-foreground" : null, t.isDisabled ? "cursor-not-allowed opacity-50" : null, i?.option?.(t)),
		placeholder: (t) => e("text-muted-foreground", i?.placeholder?.(t)),
		singleValue: (t) => e("text-foreground", i?.singleValue?.(t)),
		valueContainer: (t) => e("flex min-h-10 flex-1 items-center gap-1 px-3 py-1", i?.valueContainer?.(t))
	};
}
function _(e) {
	return /* @__PURE__ */ c(d.DropdownIndicator, {
		...e,
		children: /* @__PURE__ */ c(o, { className: "size-4" })
	});
}
function v(e) {
	return /* @__PURE__ */ c(d.ClearIndicator, {
		...e,
		children: /* @__PURE__ */ c(s, { className: "size-4" })
	});
}
function y(e) {
	return /* @__PURE__ */ c(d.MultiValueRemove, {
		...e,
		children: /* @__PURE__ */ c(s, { className: "size-3.5" })
	});
}
function b(e, t) {
	return {
		ClearIndicator: v,
		DropdownIndicator: e ? _ : null,
		IndicatorSeparator: null,
		MultiValueRemove: y,
		...t
	};
}
function x({ children: e, error: t, helperText: n, inputId: o, label: s, wrapperProps: u }) {
	return /* @__PURE__ */ l("div", {
		"data-slot": "searchable-select-field",
		...u,
		children: [
			s ? /* @__PURE__ */ c(r, {
				htmlFor: o,
				className: "mb-1.5 text-sm",
				children: s
			}) : null,
			e,
			t && n ? /* @__PURE__ */ c(a, { children: n }) : null,
			!t && n ? /* @__PURE__ */ c(i, {
				className: "mt-1.5",
				children: n
			}) : null
		]
	});
}
function S({ classNames: e, components: t, dropdownIndicator: n = p.dropdownIndicator, error: r, helperText: i, inputId: a, label: o, loadingMessage: s, noOptionsMessage: l, placeholder: d, unstyled: f, wrapperProps: _, ...v }) {
	return /* @__PURE__ */ c(x, {
		error: r,
		helperText: i,
		inputId: a,
		label: o,
		wrapperProps: _,
		children: /* @__PURE__ */ c(u, {
			"aria-invalid": r || void 0,
			classNames: g(r, e),
			components: b(n, t),
			inputId: a,
			loadingMessage: s ?? h,
			noOptionsMessage: l ?? m,
			placeholder: d ?? p.placeholder,
			unstyled: f ?? !0,
			...v
		})
	});
}
function C({ classNames: e, components: t, dropdownIndicator: n = p.dropdownIndicator, error: r, helperText: i, inputId: a, label: o, loadingMessage: s, noOptionsMessage: l, placeholder: u, unstyled: d, wrapperProps: _, ...v }) {
	return /* @__PURE__ */ c(x, {
		error: r,
		helperText: i,
		inputId: a,
		label: o,
		wrapperProps: _,
		children: /* @__PURE__ */ c(f, {
			"aria-invalid": r || void 0,
			classNames: g(r, e),
			components: b(n, t),
			inputId: a,
			loadingMessage: s ?? h,
			noOptionsMessage: l ?? m,
			placeholder: u ?? p.placeholder,
			unstyled: d ?? !0,
			...v
		})
	});
}
//#endregion
export { C as AsyncSearchableSelect, S as SearchableSelect, p as searchableSelectDefaults };
