import * as e from "react";
//#region src/lib/ai-auto-attributes.ts
var t = {
	button: "button",
	field: "field",
	tab: "tab",
	listItem: "list-item"
}, n = { save: "save" };
function r(e) {
	let t = e?.replace(/\s+/g, " ").trim();
	return t && t.length > 0 ? t : void 0;
}
function i(t) {
	return r(e.Children.toArray(t).map((t) => typeof t == "string" || typeof t == "number" ? String(t) : e.isValidElement(t) ? i(t.props.children) ?? "" : "").filter(Boolean).join(" "));
}
function a(e, t, n, a, o, s) {
	return r(e) ?? r(t) ?? r(n) ?? r(a) ?? r(o) ?? i(s);
}
//#endregion
export { n as AI_ACTION, t as AI_KIND, a as getAiLabelFallback, i as getAiTextFromReactNode };
