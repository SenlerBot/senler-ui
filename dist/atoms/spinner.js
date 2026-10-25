import { cn as e } from "../lib/utils/cn.js";
import { Loader2Icon as t } from "lucide-react";
import { jsx as n } from "react/jsx-runtime";
//#region src/atoms/spinner.tsx
function r({ className: r, "aria-label": i = "Loading", ...a }) {
	return /* @__PURE__ */ n(t, {
		role: "status",
		"aria-label": i,
		className: e("size-4 animate-spin text-primary", r),
		...a
	});
}
//#endregion
export { r as Spinner };
