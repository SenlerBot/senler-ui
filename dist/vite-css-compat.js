import { Features as e, browserslistToTargets as t, transform as n } from "lightningcss";
//#region src/vite-css-compat.ts
var r = ["ios_saf 13", "safari 13"], i = e.Colors | e.LogicalProperties | e.Selectors | e.VendorPrefixes, a = /-[A-Za-z0-9_-]{8}(?=\.css$)/, o = "@supports not (color: color-mix(in lab, red, red))", s = (e, t) => {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; --r) n += 1;
	return n % 2 == 1;
}, c = (e, t) => {
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
		if ((t === "\"" || t === "'") && !s(e, a)) {
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
}, l = (e, t) => {
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
}, u = (e) => {
	let t = "", n = 0;
	for (; n < e.length;) {
		let r = e.indexOf("@layer", n);
		if (r === -1) {
			t += e.slice(n);
			break;
		}
		t += e.slice(n, r);
		let i = l(e, r + 6);
		if (!i) {
			t += e.slice(r);
			break;
		}
		if (i.type === "statement") {
			n = i.index + 1;
			continue;
		}
		let a = c(e, i.index);
		if (a === -1) {
			t += e.slice(r);
			break;
		}
		t += e.slice(i.index + 1, a), n = a + 1;
	}
	return t;
}, d = (e) => Math.max(0, Math.min(255, Math.round(e))), f = (e) => {
	let t = Number(e);
	return Number.isFinite(t) ? String(Math.max(0, Math.min(100, t)) / 100) : "1";
}, p = (e) => {
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
}, m = (e) => {
	let t = e.trim();
	return t.endsWith("%") ? d(Number(t.slice(0, -1)) / 100 * 255) : d(Number(t));
}, h = (e) => {
	let t = e.trim().match(/^rgba?\(\s*([^)]+)\)$/i);
	if (!t) return null;
	let n = t[1].replace(/\s*\/\s*[^, ]+$/, "").split(/(?:\s*,\s*)|\s+/).filter(Boolean);
	return n.length < 3 ? null : {
		red: m(n[0]),
		green: m(n[1]),
		blue: m(n[2])
	};
}, g = (e, t, n) => {
	let r = (e % 360 + 360) % 360, i = Math.max(0, Math.min(100, t)) / 100, a = Math.max(0, Math.min(100, n)) / 100, o = (1 - Math.abs(2 * a - 1)) * i, s = o * (1 - Math.abs(r / 60 % 2 - 1)), c = a - o / 2, l = 0, u = 0, f = 0;
	return r < 60 ? (l = o, u = s) : r < 120 ? (l = s, u = o) : r < 180 ? (u = o, f = s) : r < 240 ? (u = s, f = o) : r < 300 ? (l = s, f = o) : (l = o, f = s), {
		red: d((l + c) * 255),
		green: d((u + c) * 255),
		blue: d((f + c) * 255)
	};
}, _ = (e) => {
	let t = e.trim().match(/^hsla?\(\s*([^)]+)\)$/i);
	if (!t) return null;
	let n = t[1].replace(/\s*\/\s*[^, ]+$/, "").split(/(?:\s*,\s*)|\s+/).filter(Boolean);
	return n.length < 3 ? null : g(Number(n[0].replace(/deg$/i, "")), Number(n[1].replace("%", "")), Number(n[2].replace("%", "")));
}, v = (e, t, n = /* @__PURE__ */ new Set()) => {
	if (!e) return null;
	let r = e.trim(), i = r.match(/^var\((--[A-Za-z0-9_-]+)\)$/);
	if (i) {
		let e = i[1];
		return n.has(e) ? null : (n.add(e), v(t.get(e), t, n));
	}
	return p(r) ?? h(r) ?? _(r);
}, y = (e, t) => {
	let n = /(--[A-Za-z0-9_-]+)\s*:\s*([^;{}]+)\s*;?/g, r = n.exec(e);
	for (; r;) t.set(r[1], r[2].trim()), r = n.exec(e);
}, b = (e) => {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = 0;
	for (; r < e.length;) {
		let i = e.indexOf("{", r);
		if (i === -1) break;
		let a = e.slice(r, i).trim(), o = c(e, i);
		if (o === -1) break;
		let s = e.slice(i + 1, o);
		if (!a.startsWith("@")) {
			let e = a.split(",").map((e) => e.trim());
			(e.includes(":root") || e.includes(":host")) && y(s, t), e.includes(".dark") && y(s, n);
		}
		r = o + 1;
	}
	return {
		rootVariables: t,
		darkVariables: n
	};
}, x = (e) => {
	let t = [], n = /([^{}@][^{}]*)\{([^{}]*color-mix\(in oklab,\s*var\(--[A-Za-z0-9_-]+\)\s+[0-9.]+%,\s*transparent\)[^{}]*)\}/g, r = n.exec(e);
	for (; r;) {
		let i = r[1].trim(), a = r[2], o = /([A-Za-z-]+|--[A-Za-z0-9_-]+)\s*:\s*color-mix\(in oklab,\s*var\((--[A-Za-z0-9_-]+)\)\s+([0-9.]+)%,\s*transparent\)/g, s = o.exec(a);
		for (; s;) t.push({
			selector: i,
			property: s[1],
			variableName: s[2],
			alpha: f(s[3])
		}), s = o.exec(a);
		r = n.exec(e);
	}
	return t;
}, S = (e) => `${e.red}, ${e.green}, ${e.blue}`, C = (e, t, n) => {
	let r = n.map((e) => {
		let n = v(t.get(e), t);
		return n ? `${e}-rgb:${S(n)}` : "";
	}).filter(Boolean);
	return r.length > 0 ? `${e}{${r.join(";")}}` : "";
}, w = (e) => {
	let t = x(e);
	if (t.length === 0) return e;
	let { rootVariables: n, darkVariables: r } = b(e), i = new Map([...n, ...r]), a = [...new Set(t.map((e) => e.variableName))].filter((e) => v(n.get(e), n)), s = C(":root,:host", n, a), c = C(".dark", i, a);
	if (!s) return e;
	let l = /* @__PURE__ */ new Map();
	for (let e of t) l.set(`${e.selector}|${e.property}|${e.variableName}|${e.alpha}`, e);
	return `${s}${c}${o}{${[...l.values()].map((e) => `${e.selector}{${e.property}:rgba(var(${e.variableName}-rgb), ${e.alpha})}`).join("")}}${e}`;
}, T = (e) => e.replace(/(--tw-gradient-position:[^;{}]*?)\s+in\s+oklab(?=[;{}])/g, "$1"), E = (e) => w(T(u(e))), D = (e, t) => {
	let n = k(t);
	return a.test(e) ? e.replace(a, `-${n}`) : e.replace(/\.css$/, `-${n}.css`);
}, O = (e, t) => {
	let n = e;
	for (let [e, r] of t) {
		let t = e.split("/").pop(), i = r.split("/").pop();
		n = n.split(e).join(r), t && i && t !== e && (n = n.split(t).join(i));
	}
	return n;
}, k = (e) => {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return (t >>> 0).toString(16).padStart(8, "0");
}, A = (e, a = {}) => {
	let o = /* @__PURE__ */ new Map(), s = t(a.browsers ?? r);
	for (let t of Object.values(e)) {
		if (t.type !== "asset" || !t.fileName.endsWith(".css")) continue;
		let e = E(typeof t.source == "string" ? t.source : new TextDecoder().decode(t.source)), r = n({
			filename: t.fileName,
			code: new TextEncoder().encode(e),
			minify: !0,
			targets: s,
			include: i,
			errorRecovery: !0
		}), a = E(new TextDecoder().decode(r.code)), c = D(t.fileName, a);
		c !== t.fileName && (o.set(t.fileName, c), t.fileName = c), t.source = a;
	}
	if (o.size !== 0) for (let t of Object.values(e)) {
		if (t.type === "asset") {
			typeof t.source == "string" && (t.source = O(t.source, o));
			continue;
		}
		t.code = O(t.code, o);
	}
}, j = (e = {}) => ({
	name: "css-compatibility",
	enforce: "post",
	generateBundle(t, n) {
		A(n, e);
	}
});
//#endregion
export { r as DEFAULT_CSS_COMPATIBILITY_BROWSERS, A as applyCssCompatibilityToBundle, j as createCssCompatibilityPlugin, E as normalizeBrowserCompatibleCss };
