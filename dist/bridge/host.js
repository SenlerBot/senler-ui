import { SENLER_BRIDGE_REQUEST as e, createClearElementHighlightMessage as t, createElementActionMessage as n, createInitMessage as r, createSubmitRequestMessage as i, createUiMessage as a, isSenlerBridgeReadyMessage as o, parseSenlerBridgeContext as s, parseSenlerBridgeElementActionRequest as c, parseSenlerBridgeElementActionResultMessage as l, parseSenlerBridgeResponseMessage as u, parseSenlerBridgeUiContext as d } from "./protocol.js";
//#region src/bridge/host.ts
var f = 2e4, p = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.code = e, this.name = "SenlerBridgeHostError";
	}
};
function m(e) {
	let t = new URL(e).origin;
	if (t === "null") throw Error("Senler Bridge targetOrigin is invalid");
	return t;
}
function h(e) {
	return typeof e.crypto?.randomUUID == "function" ? e.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function g(g) {
	let _ = g.hostWindow ?? window, v = m(g.targetOrigin), y = g.requestTimeoutMs ?? f, b = s(g.context);
	if (!b) throw new p("invalid_context", "Senler Bridge context is invalid");
	let x = b, S = !1, C = !1, w = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), E = (e) => {
		if (C) return !1;
		let t = g.getTargetWindow();
		return t ? (t.postMessage(e, v), !0) : !1;
	}, D = () => E(r(x)), O = (e) => {
		if (C || e.origin !== v || e.source !== g.getTargetWindow()) return;
		if (o(e.data)) {
			S = !0, D();
			return;
		}
		let t = l(e.data);
		if (t) {
			let e = T.get(t.request_id);
			if (!e) return;
			_.clearTimeout(e.timeoutId), T.delete(t.request_id), e.resolve(t.result);
			return;
		}
		let n = u(e.data);
		if (!n) return;
		let r = w.get(n.request_id);
		r && (_.clearTimeout(r.timeoutId), w.delete(n.request_id), n.ok ? r.resolve(n.result) : r.reject(new p("remote_error", n.error)));
	};
	_.addEventListener("message", O);
	let k = (e) => {
		if (C) return Promise.reject(new p("destroyed", "Senler Bridge host is destroyed"));
		let t = h(_);
		return new Promise((n, r) => {
			let a = _.setTimeout(() => {
				w.delete(t), r(new p("request_timeout", "The embedded application did not respond in time"));
			}, y);
			w.set(t, {
				resolve: n,
				reject: r,
				timeoutId: a
			}), E(i(t, e)) || (_.clearTimeout(a), w.delete(t), r(new p("frame_unavailable", "The embedded application is unavailable")));
		});
	};
	return {
		notifyFrameLoaded() {
			S = !0, D();
		},
		setContext(e) {
			let t = s(e);
			if (!t) throw new p("invalid_context", "Senler Bridge context is invalid");
			x = t, S && D();
		},
		setUi(e) {
			let t = d(e);
			if (!t) throw new p("invalid_context", "Senler Bridge UI context is invalid");
			x = {
				...x,
				ui: t
			}, S && E(a(t));
		},
		requestToolConfiguratorSubmit() {
			return x.launch.type === "tool_configurator" ? k(e.toolConfiguratorSubmit).then((e) => {
				if ("kind" in e) throw new p("remote_error", "Embedded application returned an automation step result");
				return e;
			}) : Promise.reject(new p("invalid_launch", "Tool configurator is unavailable for this iframe"));
		},
		requestAutomationStepConfiguratorSubmit() {
			return x.launch.type === "automation_step_configurator" ? k(e.automationStepConfiguratorSubmit).then((e) => {
				if (!("kind" in e)) throw new p("remote_error", "Embedded application returned a tool configuration result");
				return e;
			}) : Promise.reject(new p("invalid_launch", "Automation step configurator is unavailable for this iframe"));
		},
		requestElementAction(e) {
			if (C) return Promise.reject(new p("destroyed", "Senler Bridge host is destroyed"));
			let t = c(e);
			if (!t) return Promise.reject(new p("invalid_context", "Senler Bridge element action is invalid"));
			let r = h(_);
			return new Promise((e, i) => {
				let a = _.setTimeout(() => {
					T.delete(r), i(new p("request_timeout", "The embedded application did not respond in time"));
				}, y);
				T.set(r, {
					resolve: e,
					reject: i,
					timeoutId: a
				}), E(n(r, t)) || (_.clearTimeout(a), T.delete(r), i(new p("frame_unavailable", "The embedded application is unavailable")));
			});
		},
		clearElementHighlight() {
			E(t());
		},
		destroy() {
			if (!C) {
				C = !0, _.removeEventListener("message", O);
				for (let e of w.values()) _.clearTimeout(e.timeoutId), e.reject(new p("destroyed", "Senler Bridge host is destroyed"));
				w.clear();
				for (let e of T.values()) _.clearTimeout(e.timeoutId), e.reject(new p("destroyed", "Senler Bridge host is destroyed"));
				T.clear();
			}
		}
	};
}
//#endregion
export { p as SenlerBridgeHostError, g as createSenlerBridgeHost };
