import { AI_KIND as e, getAiLabelFallback as t } from "../lib/ai-auto-attributes.js";
import { AiRevealContextProvider as n, useAiRevealAttributes as r } from "../lib/ai-reveal-context.js";
import { cn as i } from "../lib/utils/cn.js";
import "react";
import * as a from "@radix-ui/react-accordion";
import { ChevronDownIcon as o } from "lucide-react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/atoms/accordion.tsx
function l({ ...e }) {
	return /* @__PURE__ */ s(a.Root, {
		"data-slot": "accordion",
		...e
	});
}
function u({ className: e, variant: t = "list", children: r, ...o }) {
	return /* @__PURE__ */ s(n, { children: /* @__PURE__ */ s(a.Item, {
		"data-slot": "accordion-item",
		className: i(t === "card" ? "rounded-lg border" : "border-b last:border-b-0", e),
		...o,
		children: r
	}) });
}
function d({ className: n, children: l, "aria-label": u, title: d, "data-ai-kind": f, "data-ai-label": p, "data-ai-reveals-context-id": m, "data-ai-reveal-action": h, ...g }) {
	let _ = r(m, h), v = t(p, typeof u == "string" ? u : void 0, typeof d == "string" ? d : void 0, void 0, void 0, l);
	return /* @__PURE__ */ s(a.Header, {
		className: "flex",
		children: /* @__PURE__ */ c(a.Trigger, {
			"data-slot": "accordion-trigger",
			"data-ai-kind": f ?? e.button,
			"data-ai-label": v,
			"aria-label": u,
			title: d,
			..._,
			className: i("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", n),
			...g,
			children: [l, /* @__PURE__ */ s(o, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 self-center transition-transform duration-200" })]
		})
	});
}
function f({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ s(a.Content, {
		"data-slot": "accordion-content",
		className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
		...n,
		children: /* @__PURE__ */ s("div", {
			className: i("pt-0 pb-4", e),
			children: t
		})
	});
}
//#endregion
export { l as Accordion, f as AccordionContent, u as AccordionItem, d as AccordionTrigger };
