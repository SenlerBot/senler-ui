import { useCallback as e, useEffect as t, useState as n, useSyncExternalStore as r } from "react";
//#region src/frontend-release.ts
var i = 6e4, a = 10800 * 1e3, o = null, s = f(), c = null, l = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Map();
function d(e) {
	return typeof e == "string" && e.trim() ? e.trim() : null;
}
function f(e = o) {
	return {
		appName: e?.appName ?? "unknown",
		currentVersion: e?.currentVersion ?? "unknown",
		currentRelease: e?.currentRelease ?? null,
		latestVersion: null,
		latestRelease: null,
		state: "unknown",
		checkedAt: null
	};
}
function p() {
	l.forEach((e) => e());
}
function m(e) {
	return typeof e == "object" && !!e && !Array.isArray(e) && "version" in e && typeof e.version == "string" && e.version.trim().length > 0 && (!("release" in e) || e.release === void 0 || typeof e.release == "string");
}
function h(e, t) {
	return e.currentRelease && t.release ? e.currentRelease === t.release ? "current" : "outdated" : e.currentVersion === t.version ? "current" : "outdated";
}
function g(e) {
	return e.latestRelease ?? e.latestVersion;
}
function _(e) {
	let t = g(e);
	return t ? `senler:frontend-update:${e.appName}:${t}` : null;
}
function v(e) {
	let t = u.get(e) ?? 0;
	if (typeof window > "u") return t > 0 ? { hiddenUntil: t } : null;
	try {
		let n = JSON.parse(window.localStorage.getItem(e) ?? "null");
		return typeof n != "object" || !n || Array.isArray(n) || !("hiddenUntil" in n) || typeof n.hiddenUntil != "number" || !Number.isFinite(n.hiddenUntil) ? null : { hiddenUntil: Math.max(n.hiddenUntil, t) };
	} catch {
		return t > 0 ? { hiddenUntil: t } : null;
	}
}
function y(e) {
	return l.add(e), () => l.delete(e);
}
function b(e) {
	let t = {
		appName: e.appName.trim(),
		currentVersion: e.currentVersion.trim(),
		currentRelease: d(e.currentRelease),
		manifestUrl: e.manifestUrl.trim()
	};
	if (!t.appName || !t.currentVersion || !t.manifestUrl) throw Error("Frontend release configuration is incomplete");
	let n = o, r = n === null || n.appName !== t.appName || n.currentVersion !== t.currentVersion || n.currentRelease !== t.currentRelease || n.manifestUrl !== t.manifestUrl;
	o = t, r && (s = f(t), c = null, p());
}
function x() {
	return s;
}
async function S(e = {}) {
	if (!o || typeof fetch > "u") return s;
	let t = e.maxAgeMs ?? i;
	if (!e.force && s.checkedAt !== null && Date.now() - s.checkedAt < t) return s;
	if (c) return c;
	let n = o;
	return c = fetch(n.manifestUrl, {
		cache: "no-store",
		headers: { Accept: "application/json" },
		signal: e.signal
	}).then(async (e) => {
		if (!e.ok) return s;
		let t = await e.json();
		if (!m(t)) return s;
		let r = {
			version: t.version.trim(),
			release: d(t.release)
		};
		return s = {
			appName: n.appName,
			currentVersion: n.currentVersion,
			currentRelease: n.currentRelease,
			latestVersion: r.version,
			latestRelease: r.release,
			state: h(n, r),
			checkedAt: Date.now()
		}, p(), s;
	}).catch(() => s).finally(() => {
		c = null;
	}), c;
}
async function C(e) {
	return e === "ApiValidationError" ? (await S()).state === "outdated" : !1;
}
function w(e = i) {
	let n = r(y, x, x);
	return t(() => {
		let t = new AbortController();
		S({
			force: !0,
			signal: t.signal
		});
		let n = window.setInterval(() => {
			S({ force: !0 });
		}, e), r = () => {
			S({ force: !0 });
		}, i = () => {
			document.visibilityState === "visible" && S({ force: !0 });
		};
		return window.addEventListener("focus", r), document.addEventListener("visibilitychange", i), () => {
			t.abort(), window.clearInterval(n), window.removeEventListener("focus", r), document.removeEventListener("visibilitychange", i);
		};
	}, [e]), n;
}
function T(r = a) {
	let o = w(), [s, c] = n(() => Date.now());
	t(() => {
		let e = () => {
			c(Date.now());
		}, t = window.setInterval(e, i);
		return window.addEventListener("storage", e), () => {
			window.clearInterval(t), window.removeEventListener("storage", e);
		};
	}, []);
	let l = _(o), d = l ? v(l)?.hiddenUntil ?? 0 : 0;
	return {
		isOpen: o.state === "outdated" && s >= d,
		status: o,
		remindLater: e(() => {
			let e = _(x());
			if (!e || typeof window > "u") {
				p();
				return;
			}
			let t = Date.now() + r;
			u.set(e, t);
			try {
				window.localStorage.setItem(e, JSON.stringify({ hiddenUntil: t }));
			} catch {}
			p();
		}, [r]),
		refresh: e(() => {
			typeof window < "u" && window.location.reload();
		}, [])
	};
}
//#endregion
export { a as FRONTEND_UPDATE_PROMPT_COOLDOWN_MS, b as configureFrontendRelease, x as getFrontendReleaseSnapshot, C as shouldSuppressOutdatedFrontendError, S as syncFrontendRelease, w as useFrontendReleaseStatus, T as useFrontendUpdatePrompt };
