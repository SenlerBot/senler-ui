import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/atoms/input.tsx
var r = t.forwardRef(({ className: t, type: r, ...i }, a) => /* @__PURE__ */ n("input", {
	ref: a,
	type: r,
	"data-slot": "input",
	className: e("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-primary", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", t),
	...i
}));
r.displayName = "Input";
//#endregion
export { r as Input };
