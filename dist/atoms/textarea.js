import { cn as e } from "../lib/utils/cn.js";
import { AI_KIND as t, getAiLabelFallback as n } from "../lib/ai-auto-attributes.js";
import * as r from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/atoms/textarea.tsx
var a = r.forwardRef(({ className: r, placeholder: a, "aria-label": o, title: s, name: c, "data-ai-kind": l, "data-ai-label": u, ...d }, f) => {
	let p = n(u, typeof o == "string" ? o : void 0, typeof s == "string" ? s : void 0, a, c);
	return /* @__PURE__ */ i("textarea", {
		ref: f,
		"data-slot": "textarea",
		"data-ai-kind": l ?? t.field,
		"data-ai-label": p,
		placeholder: a,
		"aria-label": o,
		title: s,
		name: c,
		className: e("border-input resize-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 text-sm", r),
		...d
	});
});
a.displayName = "Textarea";
//#endregion
export { a as Textarea };
