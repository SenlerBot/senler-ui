import { SENLER_BROWSER_COMPATIBILITY_BROWSERS as e, SENLER_JS_COMPATIBILITY_TARGET as t } from "./browser-support.js";
import { DEFAULT_CSS_COMPATIBILITY_BROWSERS as n, applyCssCompatibilityToBundle as r, createCssCompatibilityPlugin as i, normalizeBrowserCompatibleCss as a, transformCssForBrowserCompatibility as o } from "./vite-css-compat.js";
//#region src/vite-browser-compat.ts
var s = (e, t) => t.includes("mdast-util-gfm-autolink-literal") ? e.split("(?<=^|\\s|\\p{P}|\\p{S})").join("") : t.includes("@lexical/markdown") ? e.replace(/\(\?<([=!])[^)]*\)/g, "") : e, c = () => ({
	name: "dependency-syntax-compatibility",
	enforce: "pre",
	transform(e, t) {
		let n = s(e, t);
		return n === e ? null : {
			code: n,
			map: null
		};
	}
}), l = (e = {}) => {
	let t = [i(e.css)];
	return e.dependencySyntaxPatches !== !1 && t.unshift(c()), t;
}, u = {
	browsers: e,
	jsTarget: t,
	createPlugins: l
};
//#endregion
export { n as DEFAULT_CSS_COMPATIBILITY_BROWSERS, e as SENLER_BROWSER_COMPATIBILITY_BROWSERS, t as SENLER_JS_COMPATIBILITY_TARGET, u as SENLER_VITE_BROWSER_COMPATIBILITY, r as applyCssCompatibilityToBundle, l as createBrowserCompatibilityPlugins, i as createCssCompatibilityPlugin, c as createDependencySyntaxCompatibilityPlugin, a as normalizeBrowserCompatibleCss, o as transformCssForBrowserCompatibility };
