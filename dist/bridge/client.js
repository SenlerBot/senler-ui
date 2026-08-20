import { SENLER_BRIDGE_BOOTSTRAP_MODE as e, SENLER_BRIDGE_REQUEST as t, createElementActionResultMessage as n, createErrorResponseMessage as r, createReadyMessage as i, createSenlerBridgeFrameSizeMessage as a, createSuccessResponseMessage as o, isSenlerBridgeClearElementHighlightMessage as s, parseSenlerBridgeAutomationStepConfiguratorResult as c, parseSenlerBridgeElementActionMessage as l, parseSenlerBridgeElementActionResult as u, parseSenlerBridgeInitMessage as d, parseSenlerBridgeRequestMessage as f, parseSenlerBridgeToolConfiguratorResult as p, parseSenlerBridgeUiMessage as m } from "./protocol.js";
//#region src/bridge/client.ts
function h(e) {
	let t = new URL(e).origin;
	if (t === "null") throw Error("Senler Bridge parentOrigin is invalid");
	return t;
}
function g(e) {
	return e instanceof Error && e.message.trim() ? e.message.trim() : "Unable to save tool settings";
}
var _ = 2e4;
function v(e) {
	return e.toLowerCase().startsWith("en") ? "en" : "ru";
}
function y(e, t, n) {
	let r = new URLSearchParams(e), i = r.get("senler_theme"), a = r.get("senler_language");
	return {
		language: a === "ru" || a === "en" ? a : v(t),
		theme: i === "light" || i === "dark" ? i : n ? "dark" : "light"
	};
}
function b(t, n, r) {
	let i = new URLSearchParams(t), a = i.get("senler_mode"), o = Object.values(e);
	return {
		context_version: i.get("senler_context_version") === "2" ? "2" : null,
		mode: a && o.some((e) => e === a) ? a : null,
		ui: y(t, n, r)
	};
}
function x(e, t = document.documentElement) {
	t.lang = e.language, t.classList.toggle("dark", e.theme === "dark"), t.style.colorScheme = e.theme;
}
function S(e) {
	let v = e.clientWindow ?? window, y = h(e.parentOrigin), b = e.syncDocument !== !1, S = e.connectTimeoutMs ?? _;
	if (!Number.isFinite(S) || S <= 0) throw Error("Senler Bridge connectTimeoutMs must be positive");
	let C = null, w = !1, T = null, E = null, D = null, O = /* @__PURE__ */ new Set(), k = /* @__PURE__ */ new Set(), A = /* @__PURE__ */ new Set(), j = (e) => {
		w || v.parent === v || v.parent.postMessage(e, y);
	}, M = null, N = null, P = null, F = null, I = null, L = !1, R = () => {
		P = null, F = null;
		let e = v.document, t = e?.documentElement;
		if (!t) return;
		let n = e.body ?? t, r = Math.ceil(Math.max(n.scrollHeight, n.offsetHeight, n.getBoundingClientRect().height));
		r < 1 || r === I || (I = r, j(a(r)));
	}, z = () => {
		if (!(w || P !== null || F !== null)) {
			if (typeof v.requestAnimationFrame == "function") {
				P = v.requestAnimationFrame(R);
				return;
			}
			F = v.setTimeout(R, 0);
		}
	}, B = () => {
		L && (L = !1, I = null, M?.disconnect(), N?.disconnect(), M = null, N = null, P !== null && (v.cancelAnimationFrame(P), P = null), F !== null && (v.clearTimeout(F), F = null), v.removeEventListener("load", z), v.removeEventListener("resize", z));
	}, V = () => {
		if (L || !v.document?.documentElement) return;
		L = !0;
		let e = v.document.documentElement, t = v.document.body;
		if (typeof v.ResizeObserver == "function") {
			let n = new v.ResizeObserver(z);
			M = n, n.observe(e), t && n.observe(t);
		}
		if (typeof v.MutationObserver == "function") {
			let t = new v.MutationObserver(z);
			N = t, t.observe(e, {
				attributes: !0,
				childList: !0,
				subtree: !0
			});
		}
		v.addEventListener("load", z), v.addEventListener("resize", z), z();
	}, H = (e) => {
		C = e, b && x(e.ui), e.frame_size_sync === !0 ? V() : B();
		for (let t of k) t(e);
		for (let t of A) v.clearTimeout(t.timeoutId), t.resolve(e);
		A.clear();
	}, U = (e) => {
		if (w || e.origin !== y || e.source !== v.parent) return;
		let i = d(e.data);
		if (i) {
			H(i.context);
			return;
		}
		let a = m(e.data);
		if (a && C) {
			H({
				...C,
				ui: a.ui
			});
			return;
		}
		if (s(e.data)) {
			for (let e of O) e();
			return;
		}
		let h = l(e.data);
		if (h) {
			if (!D) {
				j(n(h.request_id, {
					status: "blocked",
					error_code: "handler_unavailable",
					error_message: "The application cannot act on interface elements"
				}));
				return;
			}
			Promise.resolve().then(() => D?.(h.request)).then((e) => {
				let t = u(e);
				j(n(h.request_id, t ?? {
					status: "failed",
					error_code: "invalid_result",
					error_message: "The application returned an invalid element action result"
				}));
			}).catch((e) => {
				j(n(h.request_id, {
					status: "failed",
					error_code: "execution_failed",
					error_message: g(e)
				}));
			});
			return;
		}
		let _ = f(e.data);
		if (!_) return;
		let b = _.method === t.automationStepConfiguratorSubmit ? E : T;
		if (!b) {
			j(r(_.request_id, C?.ui.language === "ru" ? "Приложение ещё не готово сохранить настройки" : "The application is not ready to save settings yet"));
			return;
		}
		Promise.resolve().then(() => b()).then((e) => {
			let n = _.method === t.automationStepConfiguratorSubmit ? c(e) : p(e);
			if (!n) throw Error(C?.ui.language === "ru" ? "Приложение вернуло некорректные настройки" : "The application returned invalid settings");
			j(o(_.request_id, n));
		}).catch((e) => {
			j(r(_.request_id, g(e)));
		});
	};
	return v.addEventListener("message", U), {
		connect() {
			if (w) return Promise.reject(/* @__PURE__ */ Error("Senler Bridge client is destroyed"));
			if (C) return j(i()), Promise.resolve(C);
			let e = new Promise((e, t) => {
				let n = {
					resolve: e,
					reject: t,
					timeoutId: v.setTimeout(() => {
						A.delete(n), t(/* @__PURE__ */ Error("Senler Bridge connection timed out"));
					}, S)
				};
				A.add(n);
			});
			return j(i()), e;
		},
		getContext() {
			return C;
		},
		onContextChange(e) {
			return k.add(e), C && e(C), () => k.delete(e);
		},
		onToolConfiguratorSubmit(e) {
			return T = e, () => {
				T === e && (T = null);
			};
		},
		onAutomationStepConfiguratorSubmit(e) {
			return E = e, () => {
				E === e && (E = null);
			};
		},
		onElementAction(e) {
			return D = e, () => {
				D === e && (D = null);
			};
		},
		onElementHighlightClear(e) {
			return O.add(e), () => O.delete(e);
		},
		destroy() {
			if (!w) {
				w = !0, B(), v.removeEventListener("message", U), k.clear(), O.clear(), T = null, E = null, D = null;
				for (let e of A) v.clearTimeout(e.timeoutId), e.reject(/* @__PURE__ */ Error("Senler Bridge client is destroyed"));
				A.clear();
			}
		}
	};
}
//#endregion
export { x as applySenlerBridgeUiContext, S as createSenlerBridgeClient, v as normalizeSenlerBridgeLanguage, b as resolveSenlerBridgeBootstrapContext, y as resolveSenlerBridgeBootstrapUi };
