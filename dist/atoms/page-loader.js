import { cn as e } from "../lib/utils/cn.js";
import { Spinner as t } from "./spinner.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/atoms/page-loader.tsx
function i({ label: i, className: a }) {
	return /* @__PURE__ */ r("div", {
		className: e("flex flex-col items-center gap-2", a),
		children: [/* @__PURE__ */ n(t, { className: "size-8" }), i && /* @__PURE__ */ n("p", {
			className: "text-sm text-muted-foreground",
			children: i
		})]
	});
}
//#endregion
export { i as PageLoader };
