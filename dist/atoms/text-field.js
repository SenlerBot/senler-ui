import { cn as e } from "../lib/utils/cn.js";
import { Label as t } from "./label.js";
import { Input as n } from "./input.js";
import { Textarea as r } from "./textarea.js";
import * as i from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/atoms/text-field.tsx
function s(e, t) {
	if (typeof e == "function") {
		e(t);
		return;
	}
	e && (e.current = t);
}
var c = {
	small: "h-9 text-sm",
	medium: "h-10 text-base"
}, l = i.forwardRef((i, l) => {
	let { label: u, error: d, helperText: f, fullWidth: p, size: m = "medium", startAdornment: h, endAdornment: g, className: _, maxRows: v } = i, y = e(p && "w-full", _), b = e(c[m], d && "border-destructive focus-visible:ring-destructive", h && "pl-10", g && "pr-12"), x = () => {
		if (i.multiline) {
			let { multiline: t, label: n, error: o, helperText: c, fullWidth: u, size: d, startAdornment: f, endAdornment: p, maxRows: m, className: h, rows: g, ..._ } = i;
			return /* @__PURE__ */ a(r, {
				ref: (e) => s(l, e),
				rows: g,
				className: e(b, v && "resize-none overflow-auto"),
				style: v ? { maxHeight: `${v * 1.5}em` } : void 0,
				..._
			});
		}
		let { multiline: t, label: o, error: c, helperText: u, fullWidth: d, size: f, startAdornment: p, endAdornment: m, maxRows: h, className: g, ..._ } = i;
		return /* @__PURE__ */ a(n, {
			ref: (e) => s(l, e),
			className: b,
			..._
		});
	};
	return /* @__PURE__ */ o("div", {
		className: y,
		children: [
			u ? /* @__PURE__ */ a(t, {
				className: e("mb-1.5", d && "text-destructive"),
				children: u
			}) : null,
			h || g ? /* @__PURE__ */ o("div", {
				className: "relative",
				children: [
					x(),
					h ? /* @__PURE__ */ a("div", {
						className: "pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center",
						children: h
					}) : null,
					g ? /* @__PURE__ */ a("div", {
						className: "absolute right-1 top-1/2 flex -translate-y-1/2 items-center",
						children: g
					}) : null
				]
			}) : x(),
			f ? /* @__PURE__ */ a("p", {
				className: e("mt-1.5 text-xs", d ? "text-destructive" : "text-muted-foreground"),
				children: f
			}) : null
		]
	});
});
l.displayName = "TextField";
//#endregion
export { l as TextField };
