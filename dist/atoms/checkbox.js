import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { Check as n } from "lucide-react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import * as a from "@radix-ui/react-checkbox";
//#region src/atoms/checkbox.tsx
function o({ className: o, label: s, tooltip: c, id: l, ...u }) {
	let d = t.useId(), f = l || d;
	return /* @__PURE__ */ i("div", {
		className: "flex items-center",
		children: [/* @__PURE__ */ i("div", {
			className: "flex",
			children: [/* @__PURE__ */ r(a.Root, {
				id: f,
				"data-slot": "checkbox",
				className: e("peer size-4 shrink-0 rounded border shadow-xs transition-all outline-none cursor-pointer", "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary", "data-[state=unchecked]:bg-muted data-[state=unchecked]:border-border", "hover:border-primary", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "disabled:cursor-not-allowed disabled:opacity-50", o),
				...u,
				children: /* @__PURE__ */ r(a.Indicator, {
					"data-slot": "checkbox-indicator",
					className: "flex items-center justify-center text-current",
					children: /* @__PURE__ */ r(n, { className: "size-3.5 stroke-[3]" })
				})
			}), s && /* @__PURE__ */ r("label", {
				htmlFor: f,
				className: "ml-2 text-sm leading-4 cursor-pointer select-none",
				children: s
			})]
		}), c && /* @__PURE__ */ r("div", {
			className: "ml-2",
			children: c
		})]
	});
}
//#endregion
export { o as CheckBox };
