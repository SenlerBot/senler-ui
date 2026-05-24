import { cn as e } from "../lib/utils/cn.js";
import { PageToolbar as t } from "./page-toolbar.js";
import "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/layout/page-list-layout.tsx
function i({ toolbar: i, toolbarClassName: a, toolbarContentClassName: o, contentClassName: s, className: c, children: l, ...u }) {
	let d = i != null && i !== !1;
	return /* @__PURE__ */ r("div", {
		className: e("flex min-w-0 max-w-full flex-1 flex-col px-3 pb-4 pt-4", c),
		...u,
		children: [d ? /* @__PURE__ */ n(t, {
			className: a,
			contentClassName: o,
			children: i
		}) : null, /* @__PURE__ */ n("div", {
			className: e("min-w-0 flex-1", d && "mt-4", s),
			children: l
		})]
	});
}
//#endregion
export { i as PageListLayout };
