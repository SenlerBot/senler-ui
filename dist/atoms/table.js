import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/atoms/table.tsx
function n({ className: n, ...r }) {
	return /* @__PURE__ */ t("table", {
		className: e("table w-full table-fixed border-collapse border-spacing-0 overflow-hidden", n),
		...r
	});
}
function r({ className: n, ...r }) {
	return /* @__PURE__ */ t("tbody", {
		className: e("table-row-group overflow-y-auto", n),
		...r
	});
}
function i({ className: n, ...r }) {
	return /* @__PURE__ */ t("td", {
		className: e("table-cell align-inherit text-left py-1.5 font-normal border-b border-border", n),
		...r
	});
}
function a({ className: n, ...r }) {
	return /* @__PURE__ */ t("div", {
		className: e("bg-card", n),
		...r
	});
}
function o({ className: n, ...r }) {
	return /* @__PURE__ */ t("thead", {
		className: e("table-header-group", n),
		...r
	});
}
function s({ className: n, ...r }) {
	return /* @__PURE__ */ t("th", {
		className: e("table-cell align-inherit text-left py-1.5 font-normal border-b border-border", n),
		...r
	});
}
function c({ className: n, ...r }) {
	return /* @__PURE__ */ t("tr", {
		className: e("table-row align-middle outline-none", n),
		...r
	});
}
//#endregion
export { n as Table, r as TableBody, i as TableCell, a as TableContainer, o as TableHead, s as TableHeadCell, c as TableRow };
