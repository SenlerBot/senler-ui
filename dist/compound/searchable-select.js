import { cn as e } from "../lib/utils/cn.js";
import { Label as t } from "../atoms/label.js";
import { FieldDescription as n, FieldError as r } from "../atoms/field.js";
import { ChevronDown as i, XIcon as a } from "lucide-react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import c, { components as l } from "react-select";
import u from "react-select/async";
//#region src/compound/searchable-select.tsx
var d = {
	dropdownIndicator: !0,
	loadingMessage: "Loading...",
	noOptionsMessage: "No options",
	placeholder: "Select..."
};
function f() {
	return d.noOptionsMessage;
}
function p() {
	return d.loadingMessage;
}
function m(t, n) {
	return {
		clearIndicator: (t) => e("flex cursor-pointer items-center px-2 text-muted-foreground transition-colors hover:text-foreground", n?.clearIndicator?.(t)),
		container: (t) => e("w-full", n?.container?.(t)),
		control: (r) => e("min-h-10 rounded-md border border-input bg-background text-sm transition-colors", "focus-within:border-primary", r.isDisabled ? "cursor-not-allowed opacity-50" : "cursor-text", t ? "border-destructive focus-within:border-destructive" : null, n?.control?.(r)),
		dropdownIndicator: (t) => e("flex cursor-pointer items-center px-2 text-muted-foreground transition-colors hover:text-foreground", t.selectProps.menuIsOpen ? "rotate-180" : null, n?.dropdownIndicator?.(t)),
		group: (t) => e("px-1 py-1", n?.group?.(t)),
		groupHeading: (t) => e("px-2 py-1.5 text-xs font-medium text-muted-foreground", n?.groupHeading?.(t)),
		indicatorsContainer: (t) => e("shrink-0", n?.indicatorsContainer?.(t)),
		input: (t) => e("text-foreground", n?.input?.(t)),
		loadingIndicator: (t) => e("px-2 text-muted-foreground", n?.loadingIndicator?.(t)),
		loadingMessage: (t) => e("px-3 py-2 text-sm text-muted-foreground", n?.loadingMessage?.(t)),
		menu: (t) => e("z-50 mt-1 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md", n?.menu?.(t)),
		menuList: (t) => e("max-h-72 overflow-auto p-1", n?.menuList?.(t)),
		menuPortal: (t) => e("z-50", n?.menuPortal?.(t)),
		multiValue: (t) => e("m-0 flex h-[22px] items-center overflow-hidden rounded border border-border bg-background", n?.multiValue?.(t)),
		multiValueLabel: (t) => e("flex items-center px-1.5 text-xs text-foreground", n?.multiValueLabel?.(t)),
		multiValueRemove: (t) => e("flex h-full cursor-pointer items-center border-l border-border px-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", n?.multiValueRemove?.(t)),
		noOptionsMessage: (t) => e("px-3 py-2 text-sm text-muted-foreground", n?.noOptionsMessage?.(t)),
		option: (t) => e("cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-none transition-colors", t.isSelected ? "bg-primary text-primary-foreground" : "text-popover-foreground", !t.isSelected && t.isFocused ? "bg-accent text-accent-foreground" : null, t.isDisabled ? "cursor-not-allowed opacity-50" : null, n?.option?.(t)),
		placeholder: (t) => e("text-muted-foreground", n?.placeholder?.(t)),
		singleValue: (t) => e("text-foreground", n?.singleValue?.(t)),
		valueContainer: (t) => e("flex min-h-10 flex-1 items-center gap-1 px-3 py-1", n?.valueContainer?.(t))
	};
}
function h(e) {
	return /* @__PURE__ */ o(l.DropdownIndicator, {
		...e,
		children: /* @__PURE__ */ o(i, { className: "size-4" })
	});
}
function g(e) {
	return /* @__PURE__ */ o(l.ClearIndicator, {
		...e,
		children: /* @__PURE__ */ o(a, { className: "size-4" })
	});
}
function _(e) {
	return /* @__PURE__ */ o(l.MultiValueRemove, {
		...e,
		children: /* @__PURE__ */ o(a, { className: "size-3.5" })
	});
}
function v(e, t) {
	return {
		ClearIndicator: g,
		DropdownIndicator: e ? h : null,
		IndicatorSeparator: null,
		MultiValueRemove: _,
		...t
	};
}
function y({ children: e, error: i, helperText: a, inputId: c, label: l, wrapperProps: u }) {
	return /* @__PURE__ */ s("div", {
		"data-slot": "searchable-select-field",
		...u,
		children: [
			l ? /* @__PURE__ */ o(t, {
				htmlFor: c,
				className: "mb-1.5 text-sm",
				children: l
			}) : null,
			e,
			i && a ? /* @__PURE__ */ o(r, { children: a }) : null,
			!i && a ? /* @__PURE__ */ o(n, {
				className: "mt-1.5",
				children: a
			}) : null
		]
	});
}
function b({ classNames: e, components: t, dropdownIndicator: n = d.dropdownIndicator, error: r, helperText: i, inputId: a, label: s, loadingMessage: l, noOptionsMessage: u, placeholder: h, unstyled: g, wrapperProps: _, ...b }) {
	return /* @__PURE__ */ o(y, {
		error: r,
		helperText: i,
		inputId: a,
		label: s,
		wrapperProps: _,
		children: /* @__PURE__ */ o(c, {
			"aria-invalid": r || void 0,
			classNames: m(r, e),
			components: v(n, t),
			inputId: a,
			loadingMessage: l ?? p,
			noOptionsMessage: u ?? f,
			placeholder: h ?? d.placeholder,
			unstyled: g ?? !0,
			...b
		})
	});
}
function x({ classNames: e, components: t, dropdownIndicator: n = d.dropdownIndicator, error: r, helperText: i, inputId: a, label: s, loadingMessage: c, noOptionsMessage: l, placeholder: h, unstyled: g, wrapperProps: _, ...b }) {
	return /* @__PURE__ */ o(y, {
		error: r,
		helperText: i,
		inputId: a,
		label: s,
		wrapperProps: _,
		children: /* @__PURE__ */ o(u, {
			"aria-invalid": r || void 0,
			classNames: m(r, e),
			components: v(n, t),
			inputId: a,
			loadingMessage: c ?? p,
			noOptionsMessage: l ?? f,
			placeholder: h ?? d.placeholder,
			unstyled: g ?? !0,
			...b
		})
	});
}
//#endregion
export { x as AsyncSearchableSelect, b as SearchableSelect, d as searchableSelectDefaults };
