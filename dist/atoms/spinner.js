import { cn as e } from "../lib/utils/cn.js";
import { Loader2Icon as t } from "lucide-react";
import { jsx as n } from "react/jsx-runtime";
//#region src/atoms/spinner.tsx
function r({ className: r, ...i }) {
	return /* @__PURE__ */ n(t, {
		role: "status",
		"aria-label": "Loading",
		className: e("size-4 animate-spin text-primary", r),
		...i
	});
}
//#endregion
export { r as Spinner };
