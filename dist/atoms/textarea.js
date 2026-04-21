import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/atoms/textarea.tsx
var r = t.forwardRef(({ className: t, ...r }, i) => /* @__PURE__ */ n("textarea", {
	ref: i,
	"data-slot": "textarea",
	className: e("border-input resize-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 text-sm", t),
	...r
}));
r.displayName = "Textarea";
//#endregion
export { r as Textarea };
