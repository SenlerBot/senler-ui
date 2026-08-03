import { createErrorResponseMessage as e, createReadyMessage as t, createSuccessResponseMessage as n, parseSenlerBridgeInitMessage as r, parseSenlerBridgeRequestMessage as i, parseSenlerBridgeToolConfiguratorResult as a, parseSenlerBridgeUiMessage as o } from "./protocol.js";
//#region src/bridge/client.ts
function s(e) {
	let t = new URL(e).origin;
	if (t === "null") throw Error("Senler Bridge parentOrigin is invalid");
	return t;
}
function c(e) {
	return e instanceof Error && e.message.trim() ? e.message.trim() : "Unable to save tool settings";
}
var l = 2e4;
function u(e) {
	return e.toLowerCase().startsWith("en") ? "en" : "ru";
}
function d(e, t, n) {
	let r = new URLSearchParams(e), i = r.get("senler_theme"), a = r.get("senler_language");
	return {
		language: a === "ru" || a === "en" ? a : u(t),
		theme: i === "light" || i === "dark" ? i : n ? "dark" : "light"
	};
}
function f(e, t = document.documentElement) {
	t.lang = e.language, t.classList.toggle("dark", e.theme === "dark"), t.style.colorScheme = e.theme;
}
function p(u) {
	let d = u.clientWindow ?? window, p = s(u.parentOrigin), m = u.syncDocument !== !1, h = u.connectTimeoutMs ?? l;
	if (!Number.isFinite(h) || h <= 0) throw Error("Senler Bridge connectTimeoutMs must be positive");
	let g = null, _ = !1, v = null, y = /* @__PURE__ */ new Set(), b = /* @__PURE__ */ new Set(), x = (e) => {
		_ || d.parent === d || d.parent.postMessage(e, p);
	}, S = (e) => {
		g = e, m && f(e.ui);
		for (let t of y) t(e);
		for (let t of b) d.clearTimeout(t.timeoutId), t.resolve(e);
		b.clear();
	}, C = (t) => {
		if (_ || t.origin !== p || t.source !== d.parent) return;
		let s = r(t.data);
		if (s) {
			S(s.context);
			return;
		}
		let l = o(t.data);
		if (l && g) {
			S({
				...g,
				ui: l.ui
			});
			return;
		}
		let u = i(t.data);
		if (u) {
			if (!v) {
				x(e(u.request_id, g?.ui.language === "ru" ? "Приложение ещё не готово сохранить настройки" : "The application is not ready to save settings yet"));
				return;
			}
			Promise.resolve().then(() => v?.()).then((e) => {
				let t = a(e);
				if (!t) throw Error(g?.ui.language === "ru" ? "Приложение вернуло некорректные настройки" : "The application returned invalid settings");
				x(n(u.request_id, t));
			}).catch((t) => {
				x(e(u.request_id, c(t)));
			});
		}
	};
	return d.addEventListener("message", C), {
		connect() {
			if (_) return Promise.reject(/* @__PURE__ */ Error("Senler Bridge client is destroyed"));
			if (g) return x(t()), Promise.resolve(g);
			let e = new Promise((e, t) => {
				let n = {
					resolve: e,
					reject: t,
					timeoutId: d.setTimeout(() => {
						b.delete(n), t(/* @__PURE__ */ Error("Senler Bridge connection timed out"));
					}, h)
				};
				b.add(n);
			});
			return x(t()), e;
		},
		getContext() {
			return g;
		},
		onContextChange(e) {
			return y.add(e), g && e(g), () => y.delete(e);
		},
		onToolConfiguratorSubmit(e) {
			return v = e, () => {
				v === e && (v = null);
			};
		},
		destroy() {
			if (!_) {
				_ = !0, d.removeEventListener("message", C), y.clear(), v = null;
				for (let e of b) d.clearTimeout(e.timeoutId), e.reject(/* @__PURE__ */ Error("Senler Bridge client is destroyed"));
				b.clear();
			}
		}
	};
}
//#endregion
export { f as applySenlerBridgeUiContext, p as createSenlerBridgeClient, u as normalizeSenlerBridgeLanguage, d as resolveSenlerBridgeBootstrapUi };
