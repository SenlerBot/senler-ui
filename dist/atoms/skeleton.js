import { cn as e } from "../lib/utils/cn.js";
import { jsx as t } from "react/jsx-runtime";
// src/atoms/skeleton.tsx
function n({ className: n, ...r }) {
	return /* @__PURE__ */ t("div", {
		"data-slot": "skeleton",
		className: e("bg-accent animate-pulse rounded-md", n),
		...r
	});
}
export { n as Skeleton };
