import { createElementActionResultMessage as e, createErrorResponseMessage as t, createReadyMessage as n, createSuccessResponseMessage as r, isSenlerBridgeClearElementHighlightMessage as i, parseSenlerBridgeElementActionMessage as a, parseSenlerBridgeElementActionResult as o, parseSenlerBridgeInitMessage as s, parseSenlerBridgeRequestMessage as c, parseSenlerBridgeToolConfiguratorResult as l, parseSenlerBridgeUiMessage as u } from "./protocol.js";
//#region src/bridge/client.ts
function d(e) {
	let t = new URL(e).origin;
	if (t === "null") throw Error("Senler Bridge parentOrigin is invalid");
	return t;
}
function f(e) {
	return e instanceof Error && e.message.trim() ? e.message.trim() : "Unable to save tool settings";
}
var p = 2e4;
function m(e) {
	return e.toLowerCase().startsWith("en") ? "en" : "ru";
}
function h(e, t, n) {
	let r = new URLSearchParams(e), i = r.get("senler_theme"), a = r.get("senler_language");
	return {
		language: a === "ru" || a === "en" ? a : m(t),
		theme: i === "light" || i === "dark" ? i : n ? "dark" : "light"
	};
}
function g(e, t = document.documentElement) {
	t.lang = e.language, t.classList.toggle("dark", e.theme === "dark"), t.style.colorScheme = e.theme;
}
function _(m) {
	let h = m.clientWindow ?? window, _ = d(m.parentOrigin), v = m.syncDocument !== !1, y = m.connectTimeoutMs ?? p;
	if (!Number.isFinite(y) || y <= 0) throw Error("Senler Bridge connectTimeoutMs must be positive");
	let b = null, x = !1, S = null, C = null, w = /* @__PURE__ */ new Set(), T = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Set(), D = (e) => {
		x || h.parent === h || h.parent.postMessage(e, _);
	}, O = (e) => {
		b = e, v && g(e.ui);
		for (let t of T) t(e);
		for (let t of E) h.clearTimeout(t.timeoutId), t.resolve(e);
		E.clear();
	}, k = (n) => {
		if (x || n.origin !== _ || n.source !== h.parent) return;
		let d = s(n.data);
		if (d) {
			O(d.context);
			return;
		}
		let p = u(n.data);
		if (p && b) {
			O({
				...b,
				ui: p.ui
			});
			return;
		}
		if (i(n.data)) {
			for (let e of w) e();
			return;
		}
		let m = a(n.data);
		if (m) {
			if (!C) {
				D(e(m.request_id, {
					status: "blocked",
					error_code: "handler_unavailable",
					error_message: "The application cannot act on interface elements"
				}));
				return;
			}
			Promise.resolve().then(() => C?.(m.request)).then((t) => {
				let n = o(t);
				D(e(m.request_id, n ?? {
					status: "failed",
					error_code: "invalid_result",
					error_message: "The application returned an invalid element action result"
				}));
			}).catch((t) => {
				D(e(m.request_id, {
					status: "failed",
					error_code: "execution_failed",
					error_message: f(t)
				}));
			});
			return;
		}
		let g = c(n.data);
		if (g) {
			if (!S) {
				D(t(g.request_id, b?.ui.language === "ru" ? "Приложение ещё не готово сохранить настройки" : "The application is not ready to save settings yet"));
				return;
			}
			Promise.resolve().then(() => S?.()).then((e) => {
				let t = l(e);
				if (!t) throw Error(b?.ui.language === "ru" ? "Приложение вернуло некорректные настройки" : "The application returned invalid settings");
				D(r(g.request_id, t));
			}).catch((e) => {
				D(t(g.request_id, f(e)));
			});
		}
	};
	return h.addEventListener("message", k), {
		connect() {
			if (x) return Promise.reject(/* @__PURE__ */ Error("Senler Bridge client is destroyed"));
			if (b) return D(n()), Promise.resolve(b);
			let e = new Promise((e, t) => {
				let n = {
					resolve: e,
					reject: t,
					timeoutId: h.setTimeout(() => {
						E.delete(n), t(/* @__PURE__ */ Error("Senler Bridge connection timed out"));
					}, y)
				};
				E.add(n);
			});
			return D(n()), e;
		},
		getContext() {
			return b;
		},
		onContextChange(e) {
			return T.add(e), b && e(b), () => T.delete(e);
		},
		onToolConfiguratorSubmit(e) {
			return S = e, () => {
				S === e && (S = null);
			};
		},
		onElementAction(e) {
			return C = e, () => {
				C === e && (C = null);
			};
		},
		onElementHighlightClear(e) {
			return w.add(e), () => w.delete(e);
		},
		destroy() {
			if (!x) {
				x = !0, h.removeEventListener("message", k), T.clear(), w.clear(), S = null, C = null;
				for (let e of E) h.clearTimeout(e.timeoutId), e.reject(/* @__PURE__ */ Error("Senler Bridge client is destroyed"));
				E.clear();
			}
		}
	};
}
//#endregion
export { g as applySenlerBridgeUiContext, _ as createSenlerBridgeClient, m as normalizeSenlerBridgeLanguage, h as resolveSenlerBridgeBootstrapUi };
