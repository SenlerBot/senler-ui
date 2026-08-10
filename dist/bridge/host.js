import { createClearElementHighlightMessage as e, createElementActionMessage as t, createInitMessage as n, createSubmitRequestMessage as r, createUiMessage as i, isSenlerBridgeReadyMessage as a, parseSenlerBridgeContext as o, parseSenlerBridgeElementActionRequest as s, parseSenlerBridgeElementActionResultMessage as c, parseSenlerBridgeResponseMessage as l, parseSenlerBridgeUiContext as u } from "./protocol.js";
//#region src/bridge/host.ts
var d = 2e4, f = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.code = e, this.name = "SenlerBridgeHostError";
	}
};
function p(e) {
	let t = new URL(e).origin;
	if (t === "null") throw Error("Senler Bridge targetOrigin is invalid");
	return t;
}
function m(e) {
	return typeof e.crypto?.randomUUID == "function" ? e.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function h(h) {
	let g = h.hostWindow ?? window, _ = p(h.targetOrigin), v = h.requestTimeoutMs ?? d, y = o(h.context);
	if (!y) throw new f("invalid_context", "Senler Bridge context is invalid");
	let b = y, x = !1, S = !1, C = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), T = (e) => {
		if (S) return !1;
		let t = h.getTargetWindow();
		return t ? (t.postMessage(e, _), !0) : !1;
	}, E = () => T(n(b)), D = (e) => {
		if (S || e.origin !== _ || e.source !== h.getTargetWindow()) return;
		if (a(e.data)) {
			x = !0, E();
			return;
		}
		let t = c(e.data);
		if (t) {
			let e = w.get(t.request_id);
			if (!e) return;
			g.clearTimeout(e.timeoutId), w.delete(t.request_id), e.resolve(t.result);
			return;
		}
		let n = l(e.data);
		if (!n) return;
		let r = C.get(n.request_id);
		r && (g.clearTimeout(r.timeoutId), C.delete(n.request_id), n.ok ? r.resolve(n.result) : r.reject(new f("remote_error", n.error)));
	};
	return g.addEventListener("message", D), {
		notifyFrameLoaded() {
			x = !0, E();
		},
		setContext(e) {
			let t = o(e);
			if (!t) throw new f("invalid_context", "Senler Bridge context is invalid");
			b = t, x && E();
		},
		setUi(e) {
			let t = u(e);
			if (!t) throw new f("invalid_context", "Senler Bridge UI context is invalid");
			b = {
				...b,
				ui: t
			}, x && T(i(t));
		},
		requestToolConfiguratorSubmit() {
			if (S) return Promise.reject(new f("destroyed", "Senler Bridge host is destroyed"));
			if (b.launch.type !== "tool_configurator") return Promise.reject(new f("invalid_launch", "Tool configurator is unavailable for this iframe"));
			let e = m(g);
			return new Promise((t, n) => {
				let i = g.setTimeout(() => {
					C.delete(e), n(new f("request_timeout", "The embedded application did not respond in time"));
				}, v);
				C.set(e, {
					resolve: t,
					reject: n,
					timeoutId: i
				}), T(r(e)) || (g.clearTimeout(i), C.delete(e), n(new f("frame_unavailable", "The embedded application is unavailable")));
			});
		},
		requestElementAction(e) {
			if (S) return Promise.reject(new f("destroyed", "Senler Bridge host is destroyed"));
			let n = s(e);
			if (!n) return Promise.reject(new f("invalid_context", "Senler Bridge element action is invalid"));
			let r = m(g);
			return new Promise((e, i) => {
				let a = g.setTimeout(() => {
					w.delete(r), i(new f("request_timeout", "The embedded application did not respond in time"));
				}, v);
				w.set(r, {
					resolve: e,
					reject: i,
					timeoutId: a
				}), T(t(r, n)) || (g.clearTimeout(a), w.delete(r), i(new f("frame_unavailable", "The embedded application is unavailable")));
			});
		},
		clearElementHighlight() {
			T(e());
		},
		destroy() {
			if (!S) {
				S = !0, g.removeEventListener("message", D);
				for (let e of C.values()) g.clearTimeout(e.timeoutId), e.reject(new f("destroyed", "Senler Bridge host is destroyed"));
				C.clear();
				for (let e of w.values()) g.clearTimeout(e.timeoutId), e.reject(new f("destroyed", "Senler Bridge host is destroyed"));
				w.clear();
			}
		}
	};
}
//#endregion
export { f as SenlerBridgeHostError, h as createSenlerBridgeHost };
