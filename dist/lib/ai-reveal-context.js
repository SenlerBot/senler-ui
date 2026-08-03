import * as e from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/lib/ai-reveal-context.tsx
var n = e.createContext(null);
function r(t) {
	let n = /* @__PURE__ */ new Set();
	function r(t) {
		e.Children.forEach(t, (t) => {
			if (!e.isValidElement(t)) return;
			let i = t.props["data-ai-context-id"]?.trim();
			i && n.add(i), r(t.props.children);
		});
	}
	return r(t), Array.from(n);
}
function i(e, t) {
	let n = new Set(e?.split(/\s+/u).map((e) => e.trim()).filter(Boolean) ?? []);
	return t.forEach((e) => {
		let t = e.trim();
		t && n.add(t);
	}), n.size > 0 ? Array.from(n).join(" ") : void 0;
}
function a({ children: i, contextIds: a }) {
	let o = e.useMemo(() => a ?? r(i), [i, a]), s = e.useMemo(() => ({ contextIds: o }), [o]);
	return /* @__PURE__ */ t(n.Provider, {
		value: s,
		children: i
	});
}
function o(t, r, a = []) {
	let o = i(t, [...e.useContext(n)?.contextIds ?? [], ...a]);
	return {
		"data-ai-reveals-context-id": o,
		"data-ai-reveal-action": o ? r ?? "click" : void 0
	};
}
//#endregion
export { a as AiRevealContextProvider, r as collectAiContextIds, i as mergeAiRevealContextIds, o as useAiRevealAttributes };
