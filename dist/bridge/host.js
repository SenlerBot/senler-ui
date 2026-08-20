import { SENLER_BRIDGE_REQUEST as e, createClearElementHighlightMessage as t, createElementActionMessage as n, createInitMessage as r, createSubmitRequestMessage as i, createUiMessage as a, isSenlerBridgeReadyMessage as o, parseSenlerBridgeContext as s, parseSenlerBridgeElementActionRequest as c, parseSenlerBridgeElementActionResultMessage as l, parseSenlerBridgeFrameSizeMessage as u, parseSenlerBridgeResponseMessage as d, parseSenlerBridgeUiContext as f } from "./protocol.js";
//#region src/bridge/host.ts
var p = 2e4, m = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.code = e, this.name = "SenlerBridgeHostError";
	}
};
function h(e) {
	let t = new URL(e).origin;
	if (t === "null") throw Error("Senler Bridge targetOrigin is invalid");
	return t;
}
function g(e) {
	return typeof e.crypto?.randomUUID == "function" ? e.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function _(_) {
	let v = _.hostWindow ?? window, y = h(_.targetOrigin), b = _.requestTimeoutMs ?? p, x = s(_.context);
	if (!x) throw new m("invalid_context", "Senler Bridge context is invalid");
	let S = x, C = !1, w = !1, T = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), D = (e) => {
		if (w) return !1;
		let t = _.getTargetWindow();
		return t ? (t.postMessage(e, y), !0) : !1;
	}, O = () => D(r(S)), k = (e) => {
		if (w || e.origin !== y || e.source !== _.getTargetWindow()) return;
		if (o(e.data)) {
			C = !0, O();
			return;
		}
		let t = u(e.data);
		if (t) {
			_.onFrameSizeChange?.(t.height);
			return;
		}
		let n = l(e.data);
		if (n) {
			let e = E.get(n.request_id);
			if (!e) return;
			v.clearTimeout(e.timeoutId), E.delete(n.request_id), e.resolve(n.result);
			return;
		}
		let r = d(e.data);
		if (!r) return;
		let i = T.get(r.request_id);
		i && (v.clearTimeout(i.timeoutId), T.delete(r.request_id), r.ok ? i.resolve(r.result) : i.reject(new m("remote_error", r.error)));
	};
	v.addEventListener("message", k);
	let A = (e) => {
		if (w) return Promise.reject(new m("destroyed", "Senler Bridge host is destroyed"));
		let t = g(v);
		return new Promise((n, r) => {
			let a = v.setTimeout(() => {
				T.delete(t), r(new m("request_timeout", "The embedded application did not respond in time"));
			}, b);
			T.set(t, {
				resolve: n,
				reject: r,
				timeoutId: a
			}), D(i(t, e)) || (v.clearTimeout(a), T.delete(t), r(new m("frame_unavailable", "The embedded application is unavailable")));
		});
	};
	return {
		notifyFrameLoaded() {
			C = !0, O();
		},
		setContext(e) {
			let t = s(e);
			if (!t) throw new m("invalid_context", "Senler Bridge context is invalid");
			S = t, C && O();
		},
		setUi(e) {
			let t = f(e);
			if (!t) throw new m("invalid_context", "Senler Bridge UI context is invalid");
			S = {
				...S,
				ui: t
			}, C && D(a(t));
		},
		requestToolConfiguratorSubmit() {
			return S.launch.type === "tool_configurator" ? A(e.toolConfiguratorSubmit).then((e) => {
				if ("kind" in e) throw new m("remote_error", "Embedded application returned an automation step result");
				return e;
			}) : Promise.reject(new m("invalid_launch", "Tool configurator is unavailable for this iframe"));
		},
		requestAutomationStepConfiguratorSubmit() {
			return S.launch.type === "automation_step_configurator" ? A(e.automationStepConfiguratorSubmit).then((e) => {
				if (!("kind" in e)) throw new m("remote_error", "Embedded application returned a tool configuration result");
				return e;
			}) : Promise.reject(new m("invalid_launch", "Automation step configurator is unavailable for this iframe"));
		},
		requestElementAction(e) {
			if (w) return Promise.reject(new m("destroyed", "Senler Bridge host is destroyed"));
			let t = c(e);
			if (!t) return Promise.reject(new m("invalid_context", "Senler Bridge element action is invalid"));
			let r = g(v);
			return new Promise((e, i) => {
				let a = v.setTimeout(() => {
					E.delete(r), i(new m("request_timeout", "The embedded application did not respond in time"));
				}, b);
				E.set(r, {
					resolve: e,
					reject: i,
					timeoutId: a
				}), D(n(r, t)) || (v.clearTimeout(a), E.delete(r), i(new m("frame_unavailable", "The embedded application is unavailable")));
			});
		},
		clearElementHighlight() {
			D(t());
		},
		destroy() {
			if (!w) {
				w = !0, v.removeEventListener("message", k);
				for (let e of T.values()) v.clearTimeout(e.timeoutId), e.reject(new m("destroyed", "Senler Bridge host is destroyed"));
				T.clear();
				for (let e of E.values()) v.clearTimeout(e.timeoutId), e.reject(new m("destroyed", "Senler Bridge host is destroyed"));
				E.clear();
			}
		}
	};
}
//#endregion
export { m as SenlerBridgeHostError, _ as createSenlerBridgeHost };
