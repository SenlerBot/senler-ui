import { cn as e } from "../lib/utils/cn.js";
import { AI_KIND as t, getAiLabelFallback as n } from "../lib/ai-auto-attributes.js";
import * as r from "react";
import { Check as i } from "lucide-react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import * as s from "@radix-ui/react-checkbox";
//#region src/atoms/checkbox.tsx
function c({ className: c, label: l, tooltip: u, id: d, "aria-label": f, title: p, name: m, "data-ai-kind": h, "data-ai-label": g, ..._ }) {
	let v = r.useId(), y = d || v, b = n(g, typeof f == "string" ? f : void 0, typeof p == "string" ? p : void 0, void 0, m, l);
	return /* @__PURE__ */ o("div", {
		className: "flex items-center",
		children: [/* @__PURE__ */ o("div", {
			className: "flex",
			children: [/* @__PURE__ */ a(s.Root, {
				id: y,
				"data-slot": "checkbox",
				"data-ai-kind": h ?? t.field,
				"data-ai-label": b,
				"aria-label": f,
				title: p,
				name: m,
				className: e("peer size-4 shrink-0 rounded border shadow-xs transition-all outline-none cursor-pointer", "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary", "data-[state=unchecked]:bg-muted data-[state=unchecked]:border-border", "hover:border-primary", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "disabled:cursor-not-allowed disabled:opacity-50", c),
				..._,
				children: /* @__PURE__ */ a(s.Indicator, {
					"data-slot": "checkbox-indicator",
					className: "flex items-center justify-center text-current",
					children: /* @__PURE__ */ a(i, { className: "size-3.5 stroke-[3]" })
				})
			}), l && /* @__PURE__ */ a("label", {
				htmlFor: y,
				className: "ml-2 text-sm leading-4 cursor-pointer select-none",
				children: l
			})]
		}), u && /* @__PURE__ */ a("div", {
			className: "ml-2",
			children: u
		})]
	});
}
//#endregion
export { c as CheckBox };
