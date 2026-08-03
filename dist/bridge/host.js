import { createInitMessage as e, createSubmitRequestMessage as t, createUiMessage as n, isSenlerBridgeReadyMessage as r, parseSenlerBridgeContext as i, parseSenlerBridgeResponseMessage as a, parseSenlerBridgeUiContext as o } from "./protocol.js";
//#region src/bridge/host.ts
var s = 2e4, c = class extends Error {
	constructor(e, t) {
		super(t), this.code = e, this.name = "SenlerBridgeHostError";
	}
};
function l(e) {
	let t = new URL(e).origin;
	if (t === "null") throw Error("Senler Bridge targetOrigin is invalid");
	return t;
}
function u(e) {
	return typeof e.crypto?.randomUUID == "function" ? e.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function d(d) {
	let f = d.hostWindow ?? window, p = l(d.targetOrigin), m = d.requestTimeoutMs ?? s, h = i(d.context);
	if (!h) throw new c("invalid_context", "Senler Bridge context is invalid");
	let g = h, _ = !1, v = !1, y = /* @__PURE__ */ new Map(), b = (e) => {
		if (v) return !1;
		let t = d.getTargetWindow();
		return t ? (t.postMessage(e, p), !0) : !1;
	}, x = () => b(e(g)), S = (e) => {
		if (v || e.origin !== p || e.source !== d.getTargetWindow()) return;
		if (r(e.data)) {
			_ = !0, x();
			return;
		}
		let t = a(e.data);
		if (!t) return;
		let n = y.get(t.request_id);
		n && (f.clearTimeout(n.timeoutId), y.delete(t.request_id), t.ok ? n.resolve(t.result) : n.reject(new c("remote_error", t.error)));
	};
	return f.addEventListener("message", S), {
		notifyFrameLoaded() {
			_ = !0, x();
		},
		setContext(e) {
			let t = i(e);
			if (!t) throw new c("invalid_context", "Senler Bridge context is invalid");
			g = t, _ && x();
		},
		setUi(e) {
			let t = o(e);
			if (!t) throw new c("invalid_context", "Senler Bridge UI context is invalid");
			g = {
				...g,
				ui: t
			}, _ && b(n(t));
		},
		requestToolConfiguratorSubmit() {
			if (v) return Promise.reject(new c("destroyed", "Senler Bridge host is destroyed"));
			if (g.launch.type !== "tool_configurator") return Promise.reject(new c("invalid_launch", "Tool configurator is unavailable for this iframe"));
			let e = u(f);
			return new Promise((n, r) => {
				let i = f.setTimeout(() => {
					y.delete(e), r(new c("request_timeout", "The embedded application did not respond in time"));
				}, m);
				y.set(e, {
					resolve: n,
					reject: r,
					timeoutId: i
				}), b(t(e)) || (f.clearTimeout(i), y.delete(e), r(new c("frame_unavailable", "The embedded application is unavailable")));
			});
		},
		destroy() {
			if (!v) {
				v = !0, f.removeEventListener("message", S);
				for (let e of y.values()) f.clearTimeout(e.timeoutId), e.reject(new c("destroyed", "Senler Bridge host is destroyed"));
				y.clear();
			}
		}
	};
}
//#endregion
export { c as SenlerBridgeHostError, d as createSenlerBridgeHost };
