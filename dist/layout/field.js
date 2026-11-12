import { cn as e } from "../lib/utils/cn.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
// src/layout/field.tsx
function r({ left: r, children: i, alignHorizontal: a = "start", ...o }) {
	let { className: s, ...c } = o;
	return /* @__PURE__ */ n("div", {
		className: e(`flex flex-col gap-3 sm:flex-row sm:justify-between ${a === "start" ? "sm:items-start" : a === "center" ? "sm:items-center" : "sm:items-end"}`, s),
		...c,
		children: [/* @__PURE__ */ t("div", {
			className: "sm:basis-[35%] sm:min-w-[35%]",
			children: r
		}), /* @__PURE__ */ t("div", {
			className: "flex grow h-fit sm:justify-end",
			children: i
		})]
	});
}
export { r as LayoutField };
