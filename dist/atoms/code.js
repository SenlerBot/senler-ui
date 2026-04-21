import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
import { Highlight as n } from "prism-react-renderer";
//#region src/atoms/code.tsx
function r({ theme: r = i, language: a = "json", code: o = "", ...s }) {
	return /* @__PURE__ */ t(n, {
		code: o,
		language: a,
		theme: r,
		...s,
		children: ({ className: n, style: r, tokens: i, getLineProps: a, getTokenProps: o }) => /* @__PURE__ */ t("pre", {
			className: e(n, "p-4 overflow-auto rounded-lg bg-muted/50", "font-mono text-sm leading-relaxed"),
			style: r,
			children: i.map((e, n) => /* @__PURE__ */ t("div", {
				...a({ line: e }),
				children: e.map((e, r) => /* @__PURE__ */ t("span", { ...o({ token: e }) }, `token-${n}-${r}`))
			}, `line-${n}`))
		})
	});
}
var i = {
	plain: {
		color: "hsl(var(--foreground))",
		backgroundColor: "inherit"
	},
	styles: [
		{
			types: [
				"comment",
				"block-comment",
				"prolog",
				"doctype",
				"cdata"
			],
			style: {
				color: "hsl(var(--muted-foreground))",
				fontStyle: "italic"
			}
		},
		{
			types: [
				"keyword",
				"control",
				"directive",
				"unit"
			],
			style: { color: "#8F2CE7" }
		},
		{
			types: [
				"string",
				"char",
				"template-string",
				"attr-value"
			],
			style: { color: "#006656" }
		},
		{
			types: [
				"number",
				"boolean",
				"constant"
			],
			style: { color: "#1F66A3" }
		},
		{
			types: ["function", "builtin"],
			style: { color: "#B5500B" }
		},
		{
			types: [
				"tag",
				"selector",
				"attr-name"
			],
			style: { color: "#8F2CE7" }
		},
		{
			types: ["variable", "property"],
			style: { color: "#C24100" }
		},
		{
			types: [
				"operator",
				"punctuation",
				"symbol"
			],
			style: { color: "hsl(var(--foreground))" }
		},
		{
			types: ["class-name", "maybe-class-name"],
			style: { color: "#1F66A3" }
		}
	]
};
//#endregion
export { r as CodeBlock };
