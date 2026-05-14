import { cn as e } from "../lib/utils/cn.js";
import { AI_KIND as t, getAiLabelFallback as n } from "../lib/ai-auto-attributes.js";
import * as r from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/atoms/input.tsx
var a = r.forwardRef(({ className: r, type: a, placeholder: o, "aria-label": s, title: c, name: l, "data-ai-kind": u, "data-ai-label": d, ...f }, p) => {
	let m = n(d, typeof s == "string" ? s : void 0, typeof c == "string" ? c : void 0, o, l);
	return /* @__PURE__ */ i("input", {
		ref: p,
		type: a,
		"data-slot": "input",
		"data-ai-kind": u ?? t.field,
		"data-ai-label": m,
		placeholder: o,
		"aria-label": s,
		title: c,
		name: l,
		className: e("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-primary", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", r),
		...f
	});
});
a.displayName = "Input";
//#endregion
export { a as Input };
