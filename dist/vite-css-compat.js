import { SENLER_BROWSER_COMPATIBILITY_BROWSERS as e } from "./browser-support.js";
import { Features as t, browserslistToTargets as n, transform as r } from "lightningcss";
//#region src/vite-css-compat.ts
var i = [...e], a = t.Colors | t.LogicalProperties | t.Selectors | t.VendorPrefixes, o = /-[A-Za-z0-9_-]{8}(?=\.css$)/, s = "@supports not (color: color-mix(in lab, red, red))", c = /@supports\s+not\s*\(\s*color\s*:\s*color-mix\(in\s+lab\s*,\s*red\s*,\s*red\s*\)\s*\)/, l = /\.css(?:$|\?)/, u = (e, t) => {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; --r) n += 1;
	return n % 2 == 1;
}, d = (e, t) => {
	let n = 0, r = "", i = !1;
	for (let a = t; a < e.length; a += 1) {
		let t = e[a], o = e[a + 1];
		if (i) {
			t === "*" && o === "/" && (i = !1, a += 1);
			continue;
		}
		if (r) {
			if (t === "\\") {
				a += 1;
				continue;
			}
			t === r && (r = "");
			continue;
		}
		if (t === "/" && o === "*") {
			i = !0, a += 1;
			continue;
		}
		if ((t === "\"" || t === "'") && !u(e, a)) {
			r = t;
			continue;
		}
		if (t === "{") {
			n += 1;
			continue;
		}
		if (t === "}" && (--n, n === 0)) return a;
	}
	return -1;
}, f = (e, t) => {
	for (let n = t; n < e.length; n += 1) {
		let t = e[n];
		if (t === "{") return {
			type: "block",
			index: n
		};
		if (t === ";") return {
			type: "statement",
			index: n
		};
	}
	return null;
}, p = (e) => {
	let t = "", n = 0;
	for (; n < e.length;) {
		let r = e.indexOf("@layer", n);
		if (r === -1) {
			t += e.slice(n);
			break;
		}
		t += e.slice(n, r);
		let i = f(e, r + 6);
		if (!i) {
			t += e.slice(r);
			break;
		}
		if (i.type === "statement") {
			n = i.index + 1;
			continue;
		}
		let a = d(e, i.index);
		if (a === -1) {
			t += e.slice(r);
			break;
		}
		t += e.slice(i.index + 1, a), n = a + 1;
	}
	return t;
}, m = (e) => Math.max(0, Math.min(255, Math.round(e))), h = (e) => {
	let t = Number(e);
	return Number.isFinite(t) ? String(Math.max(0, Math.min(100, t)) / 100) : "1";
}, g = (e) => {
	let t = e.trim();
	if (!t.startsWith("#")) return null;
	let n = t.slice(1);
	if (n.length === 3 || n.length === 4) {
		let [e, t, r] = n.slice(0, 3).split("").map((e) => Number.parseInt(`${e}${e}`, 16));
		return {
			red: e,
			green: t,
			blue: r
		};
	}
	return n.length === 6 || n.length === 8 ? {
		red: Number.parseInt(n.slice(0, 2), 16),
		green: Number.parseInt(n.slice(2, 4), 16),
		blue: Number.parseInt(n.slice(4, 6), 16)
	} : null;
}, _ = (e) => {
	let t = e.trim();
	return t.endsWith("%") ? m(Number(t.slice(0, -1)) / 100 * 255) : m(Number(t));
}, v = (e) => {
	let t = e.trim().match(/^rgba?\(\s*([^)]+)\)$/i);
	if (!t) return null;
	let n = t[1].replace(/\s*\/\s*[^, ]+$/, "").split(/(?:\s*,\s*)|\s+/).filter(Boolean);
	return n.length < 3 ? null : {
		red: _(n[0]),
		green: _(n[1]),
		blue: _(n[2])
	};
}, y = (e, t, n) => {
	let r = (e % 360 + 360) % 360, i = Math.max(0, Math.min(100, t)) / 100, a = Math.max(0, Math.min(100, n)) / 100, o = (1 - Math.abs(2 * a - 1)) * i, s = o * (1 - Math.abs(r / 60 % 2 - 1)), c = a - o / 2, l = 0, u = 0, d = 0;
	return r < 60 ? (l = o, u = s) : r < 120 ? (l = s, u = o) : r < 180 ? (u = o, d = s) : r < 240 ? (u = s, d = o) : r < 300 ? (l = s, d = o) : (l = o, d = s), {
		red: m((l + c) * 255),
		green: m((u + c) * 255),
		blue: m((d + c) * 255)
	};
}, b = (e) => {
	let t = e.trim().match(/^hsla?\(\s*([^)]+)\)$/i);
	if (!t) return null;
	let n = t[1].replace(/\s*\/\s*[^, ]+$/, "").split(/(?:\s*,\s*)|\s+/).filter(Boolean);
	return n.length < 3 ? null : y(Number(n[0].replace(/deg$/i, "")), Number(n[1].replace("%", "")), Number(n[2].replace("%", "")));
}, x = (e, t, n = /* @__PURE__ */ new Set()) => {
	if (!e) return null;
	let r = e.trim(), i = r.match(/^var\((--[A-Za-z0-9_-]+)\)$/);
	if (i) {
		let e = i[1];
		return n.has(e) ? null : (n.add(e), x(t.get(e), t, n));
	}
	return g(r) ?? v(r) ?? b(r);
}, S = (e, t) => {
	let n = /(--[A-Za-z0-9_-]+)\s*:\s*([^;{}]+)\s*;?/g, r = n.exec(e);
	for (; r;) t.set(r[1], r[2].trim()), r = n.exec(e);
}, C = (e) => {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = 0;
	for (; r < e.length;) {
		let i = e.indexOf("{", r);
		if (i === -1) break;
		let a = e.slice(r, i).trim(), o = d(e, i);
		if (o === -1) break;
		let s = e.slice(i + 1, o);
		if (!a.startsWith("@")) {
			let e = a.split(",").map((e) => e.trim());
			(e.includes(":root") || e.includes(":host")) && S(s, t), e.includes(".dark") && S(s, n);
		}
		r = o + 1;
	}
	return {
		rootVariables: t,
		darkVariables: n
	};
}, w = (e) => {
	let t = [], n = /([^{}@][^{}]*)\{([^{}]*color-mix\(in oklab,\s*var\(--[A-Za-z0-9_-]+\)\s+[0-9.]+%,\s*transparent\)[^{}]*)\}/g, r = n.exec(e);
	for (; r;) {
		let i = r[1].trim(), a = r[2], o = /([A-Za-z-]+|--[A-Za-z0-9_-]+)\s*:\s*color-mix\(in oklab,\s*var\((--[A-Za-z0-9_-]+)\)\s+([0-9.]+)%,\s*transparent\)/g, s = o.exec(a);
		for (; s;) t.push({
			selector: i,
			property: s[1],
			variableName: s[2],
			alpha: h(s[3])
		}), s = o.exec(a);
		r = n.exec(e);
	}
	return t;
}, T = (e) => `${e.red}, ${e.green}, ${e.blue}`, E = (e, t, n) => {
	let r = n.map((e) => {
		let n = x(t.get(e), t);
		return n ? `${e}-rgb:${T(n)}` : "";
	}).filter(Boolean);
	return r.length > 0 ? `${e}{${r.join(";")}}` : "";
}, D = (e) => {
	if (c.test(e)) return e;
	let t = w(e);
	if (t.length === 0) return e;
	let { rootVariables: n, darkVariables: r } = C(e), i = new Map([...n, ...r]), a = [...new Set(t.map((e) => e.variableName))].filter((e) => x(n.get(e), n)), o = E(":root,:host", n, a), l = E(".dark", i, a);
	if (!o) return e;
	let u = /* @__PURE__ */ new Map();
	for (let e of t) u.set(`${e.selector}|${e.property}|${e.variableName}|${e.alpha}`, e);
	return `${o}${l}${s}{${[...u.values()].map((e) => `${e.selector}{${e.property}:rgba(var(${e.variableName}-rgb), ${e.alpha})}`).join("")}}${e}`;
}, O = (e) => e.replace(/(--tw-gradient-position:[^;{}]*?)\s+in\s+oklab(?=[;{}])/g, "$1"), k = (e) => D(O(p(e))), A = (e, t) => {
	let n = M(t);
	return o.test(e) ? e.replace(o, `-${n}`) : e.replace(/\.css$/, `-${n}.css`);
}, j = (e, t) => {
	let n = e;
	for (let [e, r] of t) {
		let t = e.split("/").pop(), i = r.split("/").pop();
		n = n.split(e).join(r), t && i && t !== e && (n = n.split(t).join(i));
	}
	return n;
}, M = (e) => {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return (t >>> 0).toString(16).padStart(8, "0");
}, N = (e) => n(e.browsers ?? i), P = (e) => e.split("?")[0] ?? e, F = (e, t, n = {}, i = !0) => {
	let o = r({
		filename: t,
		code: new TextEncoder().encode(k(e)),
		minify: i,
		targets: N(n),
		include: a,
		errorRecovery: !0
	});
	return k(new TextDecoder().decode(o.code));
}, I = (e, t = {}) => {
	let n = /* @__PURE__ */ new Map();
	for (let r of Object.values(e)) {
		if (r.type !== "asset" || !r.fileName.endsWith(".css")) continue;
		let e = F(typeof r.source == "string" ? r.source : new TextDecoder().decode(r.source), r.fileName, t), i = A(r.fileName, e);
		i !== r.fileName && (n.set(r.fileName, i), r.fileName = i), r.source = e;
	}
	if (n.size !== 0) for (let t of Object.values(e)) {
		if (t.type === "asset") {
			typeof t.source == "string" && (t.source = j(t.source, n));
			continue;
		}
		t.code = j(t.code, n);
	}
}, L = (e = {}) => {
	let t = null;
	return {
		name: "css-compatibility",
		enforce: "post",
		configResolved(e) {
			t = e;
		},
		transform(n, r) {
			if (t?.command !== "serve" || !l.test(r)) return null;
			let i = F(n, P(r), e, !1);
			return i === n ? null : {
				code: i,
				map: null
			};
		},
		generateBundle(t, n) {
			I(n, e);
		}
	};
};
//#endregion
export { i as DEFAULT_CSS_COMPATIBILITY_BROWSERS, I as applyCssCompatibilityToBundle, L as createCssCompatibilityPlugin, k as normalizeBrowserCompatibleCss, F as transformCssForBrowserCompatibility };
