import { SENLER_BROWSER_COMPATIBILITY_BROWSERS as e } from "./browser-support.js";
import t from "browserslist";
import { Features as n, browserslistToTargets as r, transform as i } from "lightningcss";
//#region src/vite-css-compat.ts
var a = [...e], o = n.Colors | n.LogicalProperties | n.Selectors | n.VendorPrefixes, s = /-[A-Za-z0-9_-]{8}(?=\.css$)/, c = "@supports not (color: color-mix(in lab, red, red))", l = /^@supports\s+not\s*\(\s*color\s*:\s*color-mix\(in\s+lab\s*,\s*red\s*,\s*red\s*\)\s*\)$/, u = "--senler-ui-color-mix-fallback-generated", d = /* @__PURE__ */ new Map(), f = (e, t) => {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; --r) n += 1;
	return n % 2 == 1;
}, p = (e, t) => {
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
		if ((t === "\"" || t === "'") && !f(e, a)) {
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
}, m = (e) => e.replace(/\/\*[\s\S]*?\*\//g, "").trim(), h = (e, t) => {
	let n = 0, r = 0, i = "", a = !1, o = 0;
	for (; r < e.length;) {
		let s = e[r], c = e[r + 1];
		if (a) {
			s === "*" && c === "/" ? (a = !1, r += 2) : r += 1;
			continue;
		}
		if (i) {
			s === "\\" ? r += 2 : (s === i && (i = ""), r += 1);
			continue;
		}
		if (s === "/" && c === "*") {
			a = !0, r += 2;
			continue;
		}
		if (s === "\"" || s === "'") {
			i = s, r += 1;
			continue;
		}
		if (s === "(") {
			o += 1, r += 1;
			continue;
		}
		if (s === ")") {
			o = Math.max(0, o - 1), r += 1;
			continue;
		}
		if (s === ";" && o === 0) {
			n = r + 1, r += 1;
			continue;
		}
		if (s !== "{" || o !== 0) {
			r += 1;
			continue;
		}
		let l = p(e, r);
		if (l === -1) return;
		t({
			prelude: m(e.slice(n, r)),
			preludeStart: n,
			openingBraceIndex: r,
			closingBraceIndex: l,
			body: e.slice(r + 1, l)
		}), r = l + 1, n = r;
	}
}, g = (e) => l.test(e.replace(/\s+/g, " ")), _ = (e, t, n) => {
	h(e, (e) => {
		if (e.prelude) {
			if (e.prelude.startsWith("@")) {
				_(e.body, [...t, e.prelude], n);
				return;
			}
			n(e.prelude, e.body, t);
		}
	});
}, v = (e, t) => {
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
}, y = (e) => {
	let t = "", n = 0;
	for (; n < e.length;) {
		let r = e.indexOf("@layer", n);
		if (r === -1) {
			t += e.slice(n);
			break;
		}
		t += e.slice(n, r);
		let i = v(e, r + 6);
		if (!i) {
			t += e.slice(r);
			break;
		}
		if (i.type === "statement") {
			n = i.index + 1;
			continue;
		}
		let a = p(e, i.index);
		if (a === -1) {
			t += e.slice(r);
			break;
		}
		t += e.slice(i.index + 1, a), n = a + 1;
	}
	return t;
}, b = (e) => Math.max(0, Math.min(255, Math.round(e))), x = (e) => {
	let t = Number(e);
	return Number.isFinite(t) ? String(Math.max(0, Math.min(100, t)) / 100) : "1";
}, S = (e) => {
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
}, C = (e) => {
	let t = e.trim();
	return t.endsWith("%") ? b(Number(t.slice(0, -1)) / 100 * 255) : b(Number(t));
}, w = (e) => {
	let t = e.trim().match(/^rgba?\(\s*([^)]+)\)$/i);
	if (!t) return null;
	let n = t[1].replace(/\s*\/\s*[^, ]+$/, "").split(/(?:\s*,\s*)|\s+/).filter(Boolean);
	return n.length < 3 ? null : {
		red: C(n[0]),
		green: C(n[1]),
		blue: C(n[2])
	};
}, T = (e, t, n) => {
	let r = (e % 360 + 360) % 360, i = Math.max(0, Math.min(100, t)) / 100, a = Math.max(0, Math.min(100, n)) / 100, o = (1 - Math.abs(2 * a - 1)) * i, s = o * (1 - Math.abs(r / 60 % 2 - 1)), c = a - o / 2, l = 0, u = 0, d = 0;
	return r < 60 ? (l = o, u = s) : r < 120 ? (l = s, u = o) : r < 180 ? (u = o, d = s) : r < 240 ? (u = s, d = o) : r < 300 ? (l = s, d = o) : (l = o, d = s), {
		red: b((l + c) * 255),
		green: b((u + c) * 255),
		blue: b((d + c) * 255)
	};
}, E = (e) => {
	let t = e.trim().match(/^hsla?\(\s*([^)]+)\)$/i);
	if (!t) return null;
	let n = t[1].replace(/\s*\/\s*[^, ]+$/, "").split(/(?:\s*,\s*)|\s+/).filter(Boolean);
	return n.length < 3 ? null : T(Number(n[0].replace(/deg$/i, "")), Number(n[1].replace("%", "")), Number(n[2].replace("%", "")));
}, D = (e) => {
	let t = e.trim().toLowerCase();
	if (t === "transparent") return {
		red: 0,
		green: 0,
		blue: 0
	};
	let r = d.get(t);
	if (r !== void 0) return r;
	try {
		let e = i({
			filename: "senler-static-color.css",
			code: new TextEncoder().encode(`.color{color:color-mix(in srgb,${t} 50%,transparent)}`),
			minify: !0,
			targets: { chrome: 0 },
			include: n.Colors
		}), r = new TextDecoder().decode(e.code).match(/rgba\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,/), a = r ? {
			red: b(Number(r[1])),
			green: b(Number(r[2])),
			blue: b(Number(r[3]))
		} : null;
		return d.set(t, a), a;
	} catch {
		return d.set(t, null), null;
	}
}, O = (e, t, n = /* @__PURE__ */ new Set()) => {
	if (!e) return null;
	let r = e.trim(), i = r.match(/^var\((--[A-Za-z0-9_-]+)\)$/);
	if (i) {
		let e = i[1];
		return n.has(e) ? null : (n.add(e), O(t.get(e), t, n));
	}
	return S(r) ?? w(r) ?? E(r) ?? D(r);
}, k = (e, t) => {
	let n = /(--[A-Za-z0-9_-]+)\s*:\s*([^;{}]+)\s*;?/g, r = n.exec(e);
	for (; r;) t.set(r[1], r[2].trim()), r = n.exec(e);
}, A = (e) => {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	return h(e, (e) => {
		if (!e.prelude.startsWith("@")) {
			let r = e.prelude.split(",").map((e) => e.trim());
			(r.includes(":root") || r.includes(":host")) && k(e.body, t), r.includes(".dark") && k(e.body, n);
		}
	}), {
		rootVariables: t,
		darkVariables: n
	};
}, j = (e) => {
	let t = [];
	return _(e, [], (e, n, r) => {
		let i = /([A-Za-z-]+|--[A-Za-z0-9_-]+)\s*:\s*color-mix\(in oklab,\s*var\((--[A-Za-z0-9_-]+)\)\s+([0-9.]+)%,\s*transparent\)/g, a = i.exec(n);
		for (; a;) t.push({
			atRules: r.filter((e) => !g(e)),
			selector: e,
			property: a[1],
			variableName: a[2],
			alpha: x(a[3])
		}), a = i.exec(n);
	}), t;
}, M = (e) => `${e.red}, ${e.green}, ${e.blue}`, N = (e, t) => e !== null && t !== null && e.red === t.red && e.green === t.green && e.blue === t.blue, P = (e, t, n) => n.map((n) => {
	if (t.has(`${n}-rgb`)) return "";
	let r = O(e.get(n), e);
	return r ? `${n}-rgb:${M(r)}` : "";
}).filter(Boolean).join(";"), F = (e) => {
	let t = -1, n = -1;
	return h(e, (r) => {
		if (t !== -1 || !g(r.prelude) || !RegExp(`(?:^|[;{])\\s*${u}\\s*:`).test(r.body)) return;
		let i = e.slice(r.preludeStart, r.openingBraceIndex).search(/@supports/i);
		i !== -1 && (t = r.preludeStart + i, n = r.closingBraceIndex + 1);
	}), t === -1 ? e : F(`${e.slice(0, t)}${e.slice(n)}`);
}, I = (e, t) => t.reduceRight((e, t) => `${t}{${e}}`, e), L = (e) => e.map((e) => I(`${e.selector}{${e.property}:rgba(var(${e.variableName}-rgb), ${e.alpha})}`, e.atRules)).join(""), R = (e, t) => {
	let n = e.match(/^(\s*(?:\/\*[\s\S]*?\*\/\s*)*)/)?.[0] ?? "";
	return `${n}${t}${e.slice(n.length)}`;
}, z = (e) => {
	let t = F(e), n = j(t);
	if (n.length === 0) return t;
	let { rootVariables: r, darkVariables: i } = A(t), a = new Map([...r, ...i]), o = [...new Set(n.map((e) => e.variableName))].filter((e) => O(r.get(e), r) || O(a.get(e), a)), s = new Set(o), l = n.filter((e) => s.has(e.variableName)), d = P(r, r, o), f = P(a, i, o.filter((e) => {
		let t = O(r.get(e), r), n = O(a.get(e), a);
		return n !== null && !N(t, n);
	})), p = L(l);
	return !d && !f && !p ? t : R(t, `${c}{${`:root,:host{${u}:1${d ? `;${d}` : ""}}`}${f ? `.dark{${f}}` : ""}${p}}`);
}, B = (e) => e.replace(/(--tw-gradient-position:[^;{}]*?)\s+in\s+oklab(?=[;{}])/g, "$1"), V = (e) => z(B(y(e))), H = (e, t) => {
	let n = W(t);
	return s.test(e) ? e.replace(s, `-${n}`) : e.replace(/\.css$/, `-${n}.css`);
}, U = (e, t) => {
	let n = e;
	for (let [e, r] of t) {
		let t = e.split("/").pop(), i = r.split("/").pop();
		n = n.split(e).join(r), t && i && t !== e && (n = n.split(t).join(i));
	}
	return n;
}, W = (e) => {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return (t >>> 0).toString(16).padStart(8, "0");
}, G = (e = {}) => t(e.browsers ?? a), K = (e) => r(G(e)), q = (e, t, n = {}, r = !0) => {
	let a = i({
		filename: t,
		code: new TextEncoder().encode(V(e)),
		minify: r,
		targets: K(n),
		include: o,
		errorRecovery: !0
	});
	return V(new TextDecoder().decode(a.code));
}, J = (e, t = {}) => {
	let n = /* @__PURE__ */ new Map();
	for (let r of Object.values(e)) {
		if (r.type !== "asset" || !r.fileName.endsWith(".css")) continue;
		let e = q(typeof r.source == "string" ? r.source : new TextDecoder().decode(r.source), r.fileName, t), i = H(r.fileName, e);
		i !== r.fileName && (n.set(r.fileName, i), r.fileName = i), r.source = e;
	}
	if (n.size !== 0) for (let t of Object.values(e)) {
		if (t.type === "asset") {
			typeof t.source == "string" && (t.source = U(t.source, n));
			continue;
		}
		t.code = U(t.code, n);
	}
}, Y = (e = {}) => ({
	name: "css-compatibility",
	enforce: "post",
	generateBundle(t, n) {
		J(n, e);
	}
});
//#endregion
export { a as DEFAULT_CSS_COMPATIBILITY_BROWSERS, J as applyCssCompatibilityToBundle, Y as createCssCompatibilityPlugin, V as normalizeBrowserCompatibleCss, G as resolveCssCompatibilityBrowsers, q as transformCssForBrowserCompatibility };
