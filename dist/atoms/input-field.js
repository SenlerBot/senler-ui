import { Input as e } from "./input.js";
import { Field as t, FieldDescription as n, FieldError as r, FieldLabel as i } from "./field.js";
import { cn as a } from "../lib/utils/cn.js";
import { forwardRef as o, useId as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
// src/atoms/input-field.tsx
var u = o(({ label: o, startAdornment: u, endAdornment: d, error: f, helperText: p, ...m }, h) => {
	let g = s();
	return /* @__PURE__ */ l(t, {
		className: "gap-1",
		children: [
			o && /* @__PURE__ */ c(i, {
				htmlFor: g,
				children: o
			}),
			/* @__PURE__ */ l("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ c(e, {
						id: g,
						ref: h,
						...m,
						className: a({
							"ps-9": u,
							"pe-9": d
						}, m.className)
					}),
					u && /* @__PURE__ */ c("span", {
						className: "pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50",
						children: u
					}),
					d && /* @__PURE__ */ c("span", {
						className: "pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50",
						children: d
					})
				]
			}),
			f && p && /* @__PURE__ */ c(r, { children: p }),
			!f && p && /* @__PURE__ */ c(n, { children: p })
		]
	});
});
u.displayName = "InputField";
export { u as InputField };
