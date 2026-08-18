import { SENLER_BRIDGE_REQUEST as e, createElementActionResultMessage as t, createErrorResponseMessage as n, createReadyMessage as r, createSuccessResponseMessage as i, isSenlerBridgeClearElementHighlightMessage as a, parseSenlerBridgeAutomationStepConfiguratorResult as o, parseSenlerBridgeElementActionMessage as s, parseSenlerBridgeElementActionResult as c, parseSenlerBridgeInitMessage as l, parseSenlerBridgeRequestMessage as u, parseSenlerBridgeToolConfiguratorResult as d, parseSenlerBridgeUiMessage as f } from "./protocol.js";
//#region src/bridge/client.ts
function p(e) {
	let t = new URL(e).origin;
	if (t === "null") throw Error("Senler Bridge parentOrigin is invalid");
	return t;
}
function m(e) {
	return e instanceof Error && e.message.trim() ? e.message.trim() : "Unable to save tool settings";
}
var h = 2e4;
function g(e) {
	return e.toLowerCase().startsWith("en") ? "en" : "ru";
}
function _(e, t, n) {
	let r = new URLSearchParams(e), i = r.get("senler_theme"), a = r.get("senler_language");
	return {
		language: a === "ru" || a === "en" ? a : g(t),
		theme: i === "light" || i === "dark" ? i : n ? "dark" : "light"
	};
}
function v(e, t = document.documentElement) {
	t.lang = e.language, t.classList.toggle("dark", e.theme === "dark"), t.style.colorScheme = e.theme;
}
function y(g) {
	let _ = g.clientWindow ?? window, y = p(g.parentOrigin), b = g.syncDocument !== !1, x = g.connectTimeoutMs ?? h;
	if (!Number.isFinite(x) || x <= 0) throw Error("Senler Bridge connectTimeoutMs must be positive");
	let S = null, C = !1, w = null, T = null, E = null, D = /* @__PURE__ */ new Set(), O = /* @__PURE__ */ new Set(), k = /* @__PURE__ */ new Set(), A = (e) => {
		C || _.parent === _ || _.parent.postMessage(e, y);
	}, j = (e) => {
		S = e, b && v(e.ui);
		for (let t of O) t(e);
		for (let t of k) _.clearTimeout(t.timeoutId), t.resolve(e);
		k.clear();
	}, M = (r) => {
		if (C || r.origin !== y || r.source !== _.parent) return;
		let p = l(r.data);
		if (p) {
			j(p.context);
			return;
		}
		let h = f(r.data);
		if (h && S) {
			j({
				...S,
				ui: h.ui
			});
			return;
		}
		if (a(r.data)) {
			for (let e of D) e();
			return;
		}
		let g = s(r.data);
		if (g) {
			if (!E) {
				A(t(g.request_id, {
					status: "blocked",
					error_code: "handler_unavailable",
					error_message: "The application cannot act on interface elements"
				}));
				return;
			}
			Promise.resolve().then(() => E?.(g.request)).then((e) => {
				let n = c(e);
				A(t(g.request_id, n ?? {
					status: "failed",
					error_code: "invalid_result",
					error_message: "The application returned an invalid element action result"
				}));
			}).catch((e) => {
				A(t(g.request_id, {
					status: "failed",
					error_code: "execution_failed",
					error_message: m(e)
				}));
			});
			return;
		}
		let v = u(r.data);
		if (!v) return;
		let b = v.method === e.automationStepConfiguratorSubmit ? T : w;
		if (!b) {
			A(n(v.request_id, S?.ui.language === "ru" ? "Приложение ещё не готово сохранить настройки" : "The application is not ready to save settings yet"));
			return;
		}
		Promise.resolve().then(() => b()).then((t) => {
			let n = v.method === e.automationStepConfiguratorSubmit ? o(t) : d(t);
			if (!n) throw Error(S?.ui.language === "ru" ? "Приложение вернуло некорректные настройки" : "The application returned invalid settings");
			A(i(v.request_id, n));
		}).catch((e) => {
			A(n(v.request_id, m(e)));
		});
	};
	return _.addEventListener("message", M), {
		connect() {
			if (C) return Promise.reject(/* @__PURE__ */ Error("Senler Bridge client is destroyed"));
			if (S) return A(r()), Promise.resolve(S);
			let e = new Promise((e, t) => {
				let n = {
					resolve: e,
					reject: t,
					timeoutId: _.setTimeout(() => {
						k.delete(n), t(/* @__PURE__ */ Error("Senler Bridge connection timed out"));
					}, x)
				};
				k.add(n);
			});
			return A(r()), e;
		},
		getContext() {
			return S;
		},
		onContextChange(e) {
			return O.add(e), S && e(S), () => O.delete(e);
		},
		onToolConfiguratorSubmit(e) {
			return w = e, () => {
				w === e && (w = null);
			};
		},
		onAutomationStepConfiguratorSubmit(e) {
			return T = e, () => {
				T === e && (T = null);
			};
		},
		onElementAction(e) {
			return E = e, () => {
				E === e && (E = null);
			};
		},
		onElementHighlightClear(e) {
			return D.add(e), () => D.delete(e);
		},
		destroy() {
			if (!C) {
				C = !0, _.removeEventListener("message", M), O.clear(), D.clear(), w = null, T = null, E = null;
				for (let e of k) _.clearTimeout(e.timeoutId), e.reject(/* @__PURE__ */ Error("Senler Bridge client is destroyed"));
				k.clear();
			}
		}
	};
}
//#endregion
export { v as applySenlerBridgeUiContext, y as createSenlerBridgeClient, g as normalizeSenlerBridgeLanguage, _ as resolveSenlerBridgeBootstrapUi };
