import { cn as e } from "../lib/utils/cn.js";
import "react";
import * as t from "@radix-ui/react-accordion";
import { ChevronDownIcon as n } from "lucide-react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/atoms/accordion.tsx
function a({ ...e }) {
	return /* @__PURE__ */ r(t.Root, {
		"data-slot": "accordion",
		...e
	});
}
function o({ className: n, ...i }) {
	return /* @__PURE__ */ r(t.Item, {
		"data-slot": "accordion-item",
		className: e("border-b last:border-b-0", n),
		...i
	});
}
function s({ className: a, children: o, ...s }) {
	return /* @__PURE__ */ r(t.Header, {
		className: "flex",
		children: /* @__PURE__ */ i(t.Trigger, {
			"data-slot": "accordion-trigger",
			className: e("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", a),
			...s,
			children: [o, /* @__PURE__ */ r(n, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })]
		})
	});
}
function c({ className: n, children: i, ...a }) {
	return /* @__PURE__ */ r(t.Content, {
		"data-slot": "accordion-content",
		className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
		...a,
		children: /* @__PURE__ */ r("div", {
			className: e("pt-0 pb-4", n),
			children: i
		})
	});
}
//#endregion
export { a as Accordion, c as AccordionContent, o as AccordionItem, s as AccordionTrigger };
