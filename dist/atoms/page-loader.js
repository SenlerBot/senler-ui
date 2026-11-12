import { Spinner as e } from "./spinner.js";
import { cn as t } from "../lib/utils/cn.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
// src/atoms/page-loader.tsx
function i({ label: i, className: a, "aria-label": o = i }) {
	return /* @__PURE__ */ r("div", {
		className: t("flex flex-col items-center gap-2", a),
		children: [/* @__PURE__ */ n(e, {
			className: "size-8",
			"aria-label": o
		}), i && /* @__PURE__ */ n("p", {
			className: "text-sm text-muted-foreground",
			children: i
		})]
	});
}
export { i as PageLoader };
