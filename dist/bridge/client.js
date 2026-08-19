import { SENLER_BRIDGE_BOOTSTRAP_MODE as e, SENLER_BRIDGE_REQUEST as t, createElementActionResultMessage as n, createErrorResponseMessage as r, createReadyMessage as i, createSuccessResponseMessage as a, isSenlerBridgeClearElementHighlightMessage as o, parseSenlerBridgeAutomationStepConfiguratorResult as s, parseSenlerBridgeElementActionMessage as c, parseSenlerBridgeElementActionResult as l, parseSenlerBridgeInitMessage as u, parseSenlerBridgeRequestMessage as d, parseSenlerBridgeToolConfiguratorResult as f, parseSenlerBridgeUiMessage as p } from "./protocol.js";
//#region src/bridge/client.ts
function m(e) {
	let t = new URL(e).origin;
	if (t === "null") throw Error("Senler Bridge parentOrigin is invalid");
	return t;
}
function h(e) {
	return e instanceof Error && e.message.trim() ? e.message.trim() : "Unable to save tool settings";
}
var g = 2e4;
function _(e) {
	return e.toLowerCase().startsWith("en") ? "en" : "ru";
}
function v(e, t, n) {
	let r = new URLSearchParams(e), i = r.get("senler_theme"), a = r.get("senler_language");
	return {
		language: a === "ru" || a === "en" ? a : _(t),
		theme: i === "light" || i === "dark" ? i : n ? "dark" : "light"
	};
}
function y(t, n, r) {
	let i = new URLSearchParams(t), a = i.get("senler_mode"), o = Object.values(e);
	return {
		context_version: i.get("senler_context_version") === "2" ? "2" : null,
		mode: a && o.some((e) => e === a) ? a : null,
		ui: v(t, n, r)
	};
}
function b(e, t = document.documentElement) {
	t.lang = e.language, t.classList.toggle("dark", e.theme === "dark"), t.style.colorScheme = e.theme;
}
function x(e) {
	let _ = e.clientWindow ?? window, v = m(e.parentOrigin), y = e.syncDocument !== !1, x = e.connectTimeoutMs ?? g;
	if (!Number.isFinite(x) || x <= 0) throw Error("Senler Bridge connectTimeoutMs must be positive");
	let S = null, C = !1, w = null, T = null, E = null, D = /* @__PURE__ */ new Set(), O = /* @__PURE__ */ new Set(), k = /* @__PURE__ */ new Set(), A = (e) => {
		C || _.parent === _ || _.parent.postMessage(e, v);
	}, j = (e) => {
		S = e, y && b(e.ui);
		for (let t of O) t(e);
		for (let t of k) _.clearTimeout(t.timeoutId), t.resolve(e);
		k.clear();
	}, M = (e) => {
		if (C || e.origin !== v || e.source !== _.parent) return;
		let i = u(e.data);
		if (i) {
			j(i.context);
			return;
		}
		let m = p(e.data);
		if (m && S) {
			j({
				...S,
				ui: m.ui
			});
			return;
		}
		if (o(e.data)) {
			for (let e of D) e();
			return;
		}
		let g = c(e.data);
		if (g) {
			if (!E) {
				A(n(g.request_id, {
					status: "blocked",
					error_code: "handler_unavailable",
					error_message: "The application cannot act on interface elements"
				}));
				return;
			}
			Promise.resolve().then(() => E?.(g.request)).then((e) => {
				let t = l(e);
				A(n(g.request_id, t ?? {
					status: "failed",
					error_code: "invalid_result",
					error_message: "The application returned an invalid element action result"
				}));
			}).catch((e) => {
				A(n(g.request_id, {
					status: "failed",
					error_code: "execution_failed",
					error_message: h(e)
				}));
			});
			return;
		}
		let y = d(e.data);
		if (!y) return;
		let b = y.method === t.automationStepConfiguratorSubmit ? T : w;
		if (!b) {
			A(r(y.request_id, S?.ui.language === "ru" ? "Приложение ещё не готово сохранить настройки" : "The application is not ready to save settings yet"));
			return;
		}
		Promise.resolve().then(() => b()).then((e) => {
			let n = y.method === t.automationStepConfiguratorSubmit ? s(e) : f(e);
			if (!n) throw Error(S?.ui.language === "ru" ? "Приложение вернуло некорректные настройки" : "The application returned invalid settings");
			A(a(y.request_id, n));
		}).catch((e) => {
			A(r(y.request_id, h(e)));
		});
	};
	return _.addEventListener("message", M), {
		connect() {
			if (C) return Promise.reject(/* @__PURE__ */ Error("Senler Bridge client is destroyed"));
			if (S) return A(i()), Promise.resolve(S);
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
			return A(i()), e;
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
export { b as applySenlerBridgeUiContext, x as createSenlerBridgeClient, _ as normalizeSenlerBridgeLanguage, y as resolveSenlerBridgeBootstrapContext, v as resolveSenlerBridgeBootstrapUi };
