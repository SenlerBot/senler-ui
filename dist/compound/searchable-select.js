import { FieldDescription as e, FieldError as t } from "../atoms/field.js";
import { Label as n } from "../atoms/label.js";
import { overlayLayerClassName as r, overlaySolidSurfaceClassName as i } from "../lib/overlay-styles.js";
import { cn as a } from "../lib/utils/cn.js";
import { Check as o, ChevronDown as s, XIcon as c } from "lucide-react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
import d, { components as f } from "react-select";
import p from "react-select/async";
// src/compound/searchable-select.tsx
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
function _(e, t) {
	return {
		clearIndicator: (e) => a("flex cursor-pointer items-center px-2 text-muted-foreground transition-colors hover:text-foreground", t?.clearIndicator?.(e)),
		container: (e) => a("w-full", t?.container?.(e)),
		control: (n) => a("min-h-10 rounded-md border border-input bg-background text-sm transition-colors", "focus-within:border-primary", n.isDisabled ? "cursor-not-allowed opacity-50" : "cursor-text", e ? "border-destructive focus-within:border-destructive" : null, t?.control?.(n)),
		dropdownIndicator: (e) => a("flex cursor-pointer items-center px-2 text-muted-foreground transition-colors hover:text-foreground", e.selectProps.menuIsOpen ? "rotate-180" : null, t?.dropdownIndicator?.(e)),
		group: (e) => a("px-1 py-1", t?.group?.(e)),
		groupHeading: (e) => a("px-2 py-1.5 text-xs font-medium text-muted-foreground", t?.groupHeading?.(e)),
		indicatorsContainer: (e) => a("shrink-0", t?.indicatorsContainer?.(e)),
		input: (e) => a("text-foreground", t?.input?.(e)),
		loadingIndicator: (e) => a("px-2 text-muted-foreground", t?.loadingIndicator?.(e)),
		loadingMessage: (e) => a("px-3 py-2 text-sm text-muted-foreground", t?.loadingMessage?.(e)),
		menu: (e) => a(r, "mt-1", i, t?.menu?.(e)),
		menuList: (e) => a("max-h-72 overflow-auto p-1", t?.menuList?.(e)),
		menuPortal: (e) => a(r, t?.menuPortal?.(e)),
		multiValue: (e) => a("m-0 flex h-[22px] items-center overflow-hidden rounded border border-border bg-background", t?.multiValue?.(e)),
		multiValueLabel: (e) => a("flex items-center px-1.5 text-xs text-foreground", t?.multiValueLabel?.(e)),
		multiValueRemove: (e) => a("flex h-full cursor-pointer items-center border-l border-border px-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", t?.multiValueRemove?.(e)),
		noOptionsMessage: (e) => a("px-3 py-2 text-sm text-muted-foreground", t?.noOptionsMessage?.(e)),
		option: (e) => a("relative cursor-pointer rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors", e.isSelected || e.isFocused ? "bg-accent/50 text-accent-foreground" : "text-popover-foreground", e.isDisabled ? "cursor-not-allowed opacity-50" : null, t?.option?.(e)),
		placeholder: (e) => a("text-muted-foreground", t?.placeholder?.(e)),
		singleValue: (e) => a("text-foreground", t?.singleValue?.(e)),
		valueContainer: (e) => a("flex min-h-10 flex-1 items-center gap-1 px-3 py-1", t?.valueContainer?.(e))
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
function C({ children: r, error: i, helperText: a, inputId: o, label: s, wrapperProps: c }) {
	return /* @__PURE__ */ u("div", {
		"data-slot": "searchable-select-field",
		...c,
		children: [
			s ? /* @__PURE__ */ l(n, {
				htmlFor: o,
				className: "mb-1.5 text-sm",
				children: s
			}) : null,
			r,
			i && a ? /* @__PURE__ */ l(t, { children: a }) : null,
			!i && a ? /* @__PURE__ */ l(e, {
				className: "mt-1.5",
				children: a
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
export { T as AsyncSearchableSelect, w as SearchableSelect, m as searchableSelectDefaults };
