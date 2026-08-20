//#region src/bridge/protocol.ts
var e = 1, t = "senler-bridge", n = "2", r = {
	installed: "installed",
	test: "test",
	toolConfigurator: "tool_configurator",
	automationStepConfigurator: "automation_step_configurator"
}, i = {
	ready: "senler:bridge:ready",
	init: "senler:bridge:init",
	ui: "senler:bridge:ui",
	request: "senler:bridge:request",
	response: "senler:bridge:response",
	frameSize: "senler:bridge:frame-size",
	elementAction: "senler:bridge:element-action",
	elementActionResult: "senler:bridge:element-action-result",
	clearElementHighlight: "senler:bridge:clear-element-highlight"
}, a = {
	toolConfiguratorSubmit: "tool-configurator.submit",
	automationStepConfiguratorSubmit: "automation-step-configurator.submit"
}, o = 20, s = 5e3, c = 65536, l = 128, u = 160, d = 64, f = 500, p = 50, ee = 100, m = 1e3, h = 1e5, g = 160, _ = 20, v = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/, y = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/, b = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function x(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function S(e) {
	return x(e) && e.source === "senler-bridge" && e.protocol_version === 1;
}
function C(e) {
	return typeof e == "string" && e.length > 0;
}
function w(e) {
	return x(e) && (e.language === "ru" || e.language === "en") && (e.theme === "light" || e.theme === "dark") ? {
		language: e.language,
		theme: e.theme
	} : null;
}
function T(e, t, n) {
	if (t > o || (n.visitedNodes += 1, n.visitedNodes > s)) return !1;
	if (e === null || typeof e == "string" || typeof e == "boolean") return typeof e != "string" || e.length <= c;
	if (typeof e == "number") return Number.isFinite(e);
	if (typeof e != "object" || n.seen.has(e)) return !1;
	if (n.seen.add(e), Array.isArray(e)) return e.every((e) => T(e, t + 1, n));
	let r = Object.getPrototypeOf(e);
	return r !== Object.prototype && r !== null ? !1 : x(e) && Object.keys(e).every((e) => !b.has(e)) && Object.values(e).every((e) => T(e, t + 1, n));
}
function E(e) {
	return !x(e) || !T(e, 0, {
		seen: /* @__PURE__ */ new Set(),
		visitedNodes: 0
	}) ? !1 : new TextEncoder().encode(JSON.stringify(e)).byteLength <= c;
}
function D(e) {
	return E(e) ? e : null;
}
function O(e) {
	if (!x(e) || !C(e.name) || e.name.length > d || e.type !== "string" && e.type !== "number" && e.type !== "boolean" || e.description !== void 0 && (typeof e.description != "string" || e.description.length > f) || typeof e.required != "boolean" || !Array.isArray(e.allowed_values) || e.allowed_values.length > ee) return null;
	let t = e.type, n = e.allowed_values.filter((e) => typeof e === t);
	return n.length === e.allowed_values.length ? {
		name: e.name,
		type: t,
		...typeof e.description == "string" ? { description: e.description } : {},
		required: e.required,
		allowed_values: n
	} : null;
}
function k(e) {
	if (!Array.isArray(e) || e.length > p) return null;
	let t = e.map(O);
	return t.some((e) => e === null) ? null : t.filter((e) => e !== null);
}
function A(e) {
	if (!x(e) || !C(e.id) || typeof e.title != "string" || !E(e.configuration) || typeof e.has_private_data != "boolean" || typeof e.private_data_required != "boolean" || e.status !== "active" && e.status !== "setup_required") return null;
	let t = k(e.configured_parameters);
	return t ? {
		id: e.id,
		title: e.title,
		configuration: e.configuration,
		configured_parameters: t,
		has_private_data: e.has_private_data,
		private_data_required: e.private_data_required,
		status: e.status
	} : null;
}
function j(e) {
	if (!Array.isArray(e) || e.length > _) return null;
	let t = e.flatMap((e) => !x(e) || !C(e.branch_id) || !y.test(e.branch_id) || !C(e.key) || !v.test(e.key) || !C(e.title) || e.title.length > u ? [] : [{
		branch_id: e.branch_id,
		key: e.key,
		title: e.title
	}]);
	if (t.length !== e.length) return null;
	let n = new Set(t.map((e) => e.branch_id)), r = new Set(t.map((e) => e.key));
	return n.size === t.length && r.size === t.length ? t : null;
}
function M(e) {
	if (!x(e) || !C(e.app_id) || !C(e.project_id)) return null;
	if (e.type === "embedded_page") return e.mode !== "installed" && e.mode !== "test" || e.installation_id !== void 0 && !C(e.installation_id) ? null : {
		type: "embedded_page",
		app_id: e.app_id,
		project_id: e.project_id,
		...typeof e.installation_id == "string" ? { installation_id: e.installation_id } : {},
		mode: e.mode
	};
	if (e.type === "automation_step_configurator") {
		if (!C(e.installation_id) || !C(e.automation_id) || !C(e.node_id) || !x(e.step) || !C(e.step.id) || !C(e.step.name) || e.step.continuation_mode !== "next" && e.step.continuation_mode !== "fixed" && e.step.continuation_mode !== "configured" || !E(e.configuration)) return null;
		let t = j(e.branches);
		return t ? {
			type: "automation_step_configurator",
			app_id: e.app_id,
			project_id: e.project_id,
			installation_id: e.installation_id,
			automation_id: e.automation_id,
			node_id: e.node_id,
			step: {
				id: e.step.id,
				name: e.step.name,
				continuation_mode: e.step.continuation_mode
			},
			configuration: e.configuration,
			branches: t
		} : null;
	}
	if (e.type !== "tool_configurator" || !C(e.installation_id) || !C(e.agent_id) || e.mode !== "create" && e.mode !== "edit" || !x(e.tool) || !C(e.tool.id) || !C(e.tool.name) || typeof e.tool.description != "string") return null;
	let t = e.instance === null ? null : A(e.instance);
	return e.instance !== null && !t ? null : {
		type: "tool_configurator",
		app_id: e.app_id,
		project_id: e.project_id,
		installation_id: e.installation_id,
		agent_id: e.agent_id,
		mode: e.mode,
		tool: {
			id: e.tool.id,
			name: e.tool.name,
			description: e.tool.description
		},
		instance: t
	};
}
function N(e) {
	if (!x(e) || e.frame_size_sync !== void 0 && typeof e.frame_size_sync != "boolean") return null;
	let t = w(e.ui);
	if (!t) return null;
	let n = M(e.launch);
	return n ? {
		ui: t,
		launch: n,
		...typeof e.frame_size_sync == "boolean" ? { frame_size_sync: e.frame_size_sync } : {}
	} : null;
}
function P(e) {
	if (!x(e) || e.title !== void 0 && (typeof e.title != "string" || e.title.length > u) || !E(e.configuration) || e.private_data_action !== void 0 && e.private_data_action !== "preserve" && e.private_data_action !== "replace" && e.private_data_action !== "clear" || e.private_data !== void 0 && !E(e.private_data) || e.private_data_required !== void 0 && typeof e.private_data_required != "boolean" || e.private_data_action === "replace" && e.private_data === void 0 || e.private_data !== void 0 && e.private_data_action !== "replace") return null;
	let t = k(e.configured_parameters);
	return t ? {
		...typeof e.title == "string" ? { title: e.title } : {},
		configuration: e.configuration,
		configured_parameters: t,
		...e.private_data_action === "preserve" || e.private_data_action === "replace" || e.private_data_action === "clear" ? { private_data_action: e.private_data_action } : {},
		...e.private_data === void 0 ? {} : { private_data: e.private_data },
		...typeof e.private_data_required == "boolean" ? { private_data_required: e.private_data_required } : {}
	} : null;
}
function F(e) {
	if (!x(e) || e.kind !== "automation_step_configurator" || !E(e.configuration)) return null;
	let t = j(e.branches);
	return t ? {
		kind: "automation_step_configurator",
		configuration: e.configuration,
		branches: t
	} : null;
}
var I = [
	"highlight",
	"scroll_to",
	"focus",
	"click",
	"fill",
	"clear",
	"select",
	"toggle"
], L = [
	"success",
	"not_found",
	"failed",
	"blocked"
];
function R(e) {
	return typeof e == "string" && I.some((t) => t === e);
}
function z(e) {
	return typeof e == "string" && L.some((t) => t === e);
}
function B(e) {
	return !x(e) || !C(e.context_id) || e.context_id.length > g || !R(e.action) || e.value !== void 0 && typeof e.value != "string" ? null : {
		context_id: e.context_id,
		action: e.action,
		...typeof e.value == "string" ? { value: e.value } : {}
	};
}
function V(e) {
	return !x(e) || !z(e.status) || e.matched_context_id !== void 0 && (typeof e.matched_context_id != "string" || e.matched_context_id.length > g) || e.matched_count !== void 0 && (typeof e.matched_count != "number" || !Number.isInteger(e.matched_count) || e.matched_count < 0) || e.error_code !== void 0 && typeof e.error_code != "string" || e.error_message !== void 0 && (typeof e.error_message != "string" || e.error_message.length > m) ? null : {
		status: e.status,
		...typeof e.matched_context_id == "string" ? { matched_context_id: e.matched_context_id } : {},
		...typeof e.matched_count == "number" ? { matched_count: e.matched_count } : {},
		...typeof e.error_code == "string" ? { error_code: e.error_code } : {},
		...typeof e.error_message == "string" ? { error_message: e.error_message } : {}
	};
}
function H(e) {
	return S(e) && e.type === i.ready;
}
function U(e) {
	if (!S(e) || e.type !== i.init) return null;
	let n = N(e.context);
	return n ? {
		source: t,
		type: i.init,
		protocol_version: 1,
		context: n
	} : null;
}
function W(e) {
	if (!S(e) || e.type !== i.ui) return null;
	let n = w(e.ui);
	return n ? {
		source: t,
		type: i.ui,
		protocol_version: 1,
		ui: n
	} : null;
}
function G(e) {
	return !S(e) || e.type !== i.frameSize || typeof e.height != "number" || !Number.isInteger(e.height) || e.height < 1 || e.height > h ? null : {
		source: t,
		type: i.frameSize,
		protocol_version: 1,
		height: e.height
	};
}
function K(e) {
	return !S(e) || e.type !== i.request || e.method !== a.toolConfiguratorSubmit && e.method !== a.automationStepConfiguratorSubmit || !C(e.request_id) || e.request_id.length > l ? null : {
		source: t,
		type: i.request,
		protocol_version: 1,
		request_id: e.request_id,
		method: e.method
	};
}
function q(e) {
	if (!S(e) || e.type !== i.response || !C(e.request_id) || e.request_id.length > l) return null;
	if (e.ok === !1) return !C(e.error) || e.error.length > m ? null : {
		source: t,
		type: i.response,
		protocol_version: 1,
		request_id: e.request_id,
		ok: !1,
		error: e.error.trim()
	};
	if (e.ok !== !0) return null;
	let n = F(e.result) ?? P(e.result);
	return n ? {
		source: t,
		type: i.response,
		protocol_version: 1,
		request_id: e.request_id,
		ok: !0,
		result: n
	} : null;
}
function J(e) {
	if (!S(e) || e.type !== i.elementAction || !C(e.request_id) || e.request_id.length > l) return null;
	let n = B(e.request);
	return n ? {
		source: t,
		type: i.elementAction,
		protocol_version: 1,
		request_id: e.request_id,
		request: n
	} : null;
}
function Y(e) {
	if (!S(e) || e.type !== i.elementActionResult || !C(e.request_id) || e.request_id.length > l) return null;
	let n = V(e.result);
	return n ? {
		source: t,
		type: i.elementActionResult,
		protocol_version: 1,
		request_id: e.request_id,
		result: n
	} : null;
}
function X(e) {
	return S(e) && e.type === i.clearElementHighlight;
}
function Z() {
	return {
		source: t,
		type: i.ready,
		protocol_version: 1
	};
}
function Q(e) {
	return {
		source: t,
		type: i.init,
		protocol_version: 1,
		context: e
	};
}
function $(e) {
	return {
		source: t,
		type: i.ui,
		protocol_version: 1,
		ui: e
	};
}
function te(e) {
	let n = Math.ceil(e);
	if (!Number.isFinite(n) || n < 1 || n > h) throw Error("Senler Bridge frame height is invalid");
	return {
		source: t,
		type: i.frameSize,
		protocol_version: 1,
		height: n
	};
}
function ne(e, n = a.toolConfiguratorSubmit) {
	return {
		source: t,
		type: i.request,
		protocol_version: 1,
		request_id: e,
		method: n
	};
}
function re(e, n) {
	return {
		source: t,
		type: i.elementAction,
		protocol_version: 1,
		request_id: e,
		request: n
	};
}
function ie(e, n) {
	return {
		source: t,
		type: i.elementActionResult,
		protocol_version: 1,
		request_id: e,
		result: n
	};
}
function ae() {
	return {
		source: t,
		type: i.clearElementHighlight,
		protocol_version: 1
	};
}
function oe(e, n) {
	return {
		source: t,
		type: i.response,
		protocol_version: 1,
		request_id: e,
		ok: !0,
		result: n
	};
}
function se(e, n) {
	return {
		source: t,
		type: i.response,
		protocol_version: 1,
		request_id: e,
		ok: !1,
		error: n.slice(0, m)
	};
}
//#endregion
export { n as SENLER_BRIDGE_BOOTSTRAP_CONTEXT_VERSION, r as SENLER_BRIDGE_BOOTSTRAP_MODE, i as SENLER_BRIDGE_MESSAGE, e as SENLER_BRIDGE_PROTOCOL_VERSION, a as SENLER_BRIDGE_REQUEST, t as SENLER_BRIDGE_SOURCE, ae as createClearElementHighlightMessage, re as createElementActionMessage, ie as createElementActionResultMessage, se as createErrorResponseMessage, Q as createInitMessage, Z as createReadyMessage, te as createSenlerBridgeFrameSizeMessage, ne as createSubmitRequestMessage, oe as createSuccessResponseMessage, $ as createUiMessage, X as isSenlerBridgeClearElementHighlightMessage, H as isSenlerBridgeReadyMessage, F as parseSenlerBridgeAutomationStepConfiguratorResult, N as parseSenlerBridgeContext, J as parseSenlerBridgeElementActionMessage, B as parseSenlerBridgeElementActionRequest, V as parseSenlerBridgeElementActionResult, Y as parseSenlerBridgeElementActionResultMessage, G as parseSenlerBridgeFrameSizeMessage, U as parseSenlerBridgeInitMessage, D as parseSenlerBridgeJsonObject, K as parseSenlerBridgeRequestMessage, q as parseSenlerBridgeResponseMessage, P as parseSenlerBridgeToolConfiguratorResult, w as parseSenlerBridgeUiContext, W as parseSenlerBridgeUiMessage };
