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
	elementAction: "senler:bridge:element-action",
	elementActionResult: "senler:bridge:element-action-result",
	clearElementHighlight: "senler:bridge:clear-element-highlight"
}, a = {
	toolConfiguratorSubmit: "tool-configurator.submit",
	automationStepConfiguratorSubmit: "automation-step-configurator.submit"
}, o = 20, s = 5e3, c = 65536, l = 128, u = 160, d = 64, f = 500, ee = 50, p = 100, m = 1e3, h = 160, g = 20, _ = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/, v = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/, y = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function b(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function x(e) {
	return b(e) && e.source === "senler-bridge" && e.protocol_version === 1;
}
function S(e) {
	return typeof e == "string" && e.length > 0;
}
function C(e) {
	return b(e) && (e.language === "ru" || e.language === "en") && (e.theme === "light" || e.theme === "dark") ? {
		language: e.language,
		theme: e.theme
	} : null;
}
function w(e, t, n) {
	if (t > o || (n.visitedNodes += 1, n.visitedNodes > s)) return !1;
	if (e === null || typeof e == "string" || typeof e == "boolean") return typeof e != "string" || e.length <= c;
	if (typeof e == "number") return Number.isFinite(e);
	if (typeof e != "object" || n.seen.has(e)) return !1;
	if (n.seen.add(e), Array.isArray(e)) return e.every((e) => w(e, t + 1, n));
	let r = Object.getPrototypeOf(e);
	return r !== Object.prototype && r !== null ? !1 : b(e) && Object.keys(e).every((e) => !y.has(e)) && Object.values(e).every((e) => w(e, t + 1, n));
}
function T(e) {
	return !b(e) || !w(e, 0, {
		seen: /* @__PURE__ */ new Set(),
		visitedNodes: 0
	}) ? !1 : new TextEncoder().encode(JSON.stringify(e)).byteLength <= c;
}
function E(e) {
	return T(e) ? e : null;
}
function D(e) {
	if (!b(e) || !S(e.name) || e.name.length > d || e.type !== "string" && e.type !== "number" && e.type !== "boolean" || e.description !== void 0 && (typeof e.description != "string" || e.description.length > f) || typeof e.required != "boolean" || !Array.isArray(e.allowed_values) || e.allowed_values.length > p) return null;
	let t = e.type, n = e.allowed_values.filter((e) => typeof e === t);
	return n.length === e.allowed_values.length ? {
		name: e.name,
		type: t,
		...typeof e.description == "string" ? { description: e.description } : {},
		required: e.required,
		allowed_values: n
	} : null;
}
function O(e) {
	if (!Array.isArray(e) || e.length > ee) return null;
	let t = e.map(D);
	return t.some((e) => e === null) ? null : t.filter((e) => e !== null);
}
function k(e) {
	if (!b(e) || !S(e.id) || typeof e.title != "string" || !T(e.configuration) || typeof e.has_private_data != "boolean" || typeof e.private_data_required != "boolean" || e.status !== "active" && e.status !== "setup_required") return null;
	let t = O(e.configured_parameters);
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
function A(e) {
	if (!Array.isArray(e) || e.length > g) return null;
	let t = e.flatMap((e) => !b(e) || !S(e.branch_id) || !v.test(e.branch_id) || !S(e.key) || !_.test(e.key) || !S(e.title) || e.title.length > u ? [] : [{
		branch_id: e.branch_id,
		key: e.key,
		title: e.title
	}]);
	if (t.length !== e.length) return null;
	let n = new Set(t.map((e) => e.branch_id)), r = new Set(t.map((e) => e.key));
	return n.size === t.length && r.size === t.length ? t : null;
}
function j(e) {
	if (!b(e) || !S(e.app_id) || !S(e.project_id)) return null;
	if (e.type === "embedded_page") return e.mode !== "installed" && e.mode !== "test" || e.installation_id !== void 0 && !S(e.installation_id) ? null : {
		type: "embedded_page",
		app_id: e.app_id,
		project_id: e.project_id,
		...typeof e.installation_id == "string" ? { installation_id: e.installation_id } : {},
		mode: e.mode
	};
	if (e.type === "automation_step_configurator") {
		if (!S(e.installation_id) || !S(e.automation_id) || !S(e.node_id) || !b(e.step) || !S(e.step.id) || !S(e.step.name) || e.step.continuation_mode !== "next" && e.step.continuation_mode !== "fixed" && e.step.continuation_mode !== "configured" || !T(e.configuration)) return null;
		let t = A(e.branches);
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
	if (e.type !== "tool_configurator" || !S(e.installation_id) || !S(e.agent_id) || e.mode !== "create" && e.mode !== "edit" || !b(e.tool) || !S(e.tool.id) || !S(e.tool.name) || typeof e.tool.description != "string") return null;
	let t = e.instance === null ? null : k(e.instance);
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
function M(e) {
	if (!b(e)) return null;
	let t = C(e.ui);
	if (!t) return null;
	let n = j(e.launch);
	return n ? {
		ui: t,
		launch: n
	} : null;
}
function N(e) {
	if (!b(e) || e.title !== void 0 && (typeof e.title != "string" || e.title.length > u) || !T(e.configuration) || e.private_data_action !== void 0 && e.private_data_action !== "preserve" && e.private_data_action !== "replace" && e.private_data_action !== "clear" || e.private_data !== void 0 && !T(e.private_data) || e.private_data_required !== void 0 && typeof e.private_data_required != "boolean" || e.private_data_action === "replace" && e.private_data === void 0 || e.private_data !== void 0 && e.private_data_action !== "replace") return null;
	let t = O(e.configured_parameters);
	return t ? {
		...typeof e.title == "string" ? { title: e.title } : {},
		configuration: e.configuration,
		configured_parameters: t,
		...e.private_data_action === "preserve" || e.private_data_action === "replace" || e.private_data_action === "clear" ? { private_data_action: e.private_data_action } : {},
		...e.private_data === void 0 ? {} : { private_data: e.private_data },
		...typeof e.private_data_required == "boolean" ? { private_data_required: e.private_data_required } : {}
	} : null;
}
function P(e) {
	if (!b(e) || e.kind !== "automation_step_configurator" || !T(e.configuration)) return null;
	let t = A(e.branches);
	return t ? {
		kind: "automation_step_configurator",
		configuration: e.configuration,
		branches: t
	} : null;
}
var F = [
	"highlight",
	"scroll_to",
	"focus",
	"click",
	"fill",
	"clear",
	"select",
	"toggle"
], I = [
	"success",
	"not_found",
	"failed",
	"blocked"
];
function L(e) {
	return typeof e == "string" && F.some((t) => t === e);
}
function R(e) {
	return typeof e == "string" && I.some((t) => t === e);
}
function z(e) {
	return !b(e) || !S(e.context_id) || e.context_id.length > h || !L(e.action) || e.value !== void 0 && typeof e.value != "string" ? null : {
		context_id: e.context_id,
		action: e.action,
		...typeof e.value == "string" ? { value: e.value } : {}
	};
}
function B(e) {
	return !b(e) || !R(e.status) || e.matched_context_id !== void 0 && (typeof e.matched_context_id != "string" || e.matched_context_id.length > h) || e.matched_count !== void 0 && (typeof e.matched_count != "number" || !Number.isInteger(e.matched_count) || e.matched_count < 0) || e.error_code !== void 0 && typeof e.error_code != "string" || e.error_message !== void 0 && (typeof e.error_message != "string" || e.error_message.length > m) ? null : {
		status: e.status,
		...typeof e.matched_context_id == "string" ? { matched_context_id: e.matched_context_id } : {},
		...typeof e.matched_count == "number" ? { matched_count: e.matched_count } : {},
		...typeof e.error_code == "string" ? { error_code: e.error_code } : {},
		...typeof e.error_message == "string" ? { error_message: e.error_message } : {}
	};
}
function V(e) {
	return x(e) && e.type === i.ready;
}
function H(e) {
	if (!x(e) || e.type !== i.init) return null;
	let n = M(e.context);
	return n ? {
		source: t,
		type: i.init,
		protocol_version: 1,
		context: n
	} : null;
}
function U(e) {
	if (!x(e) || e.type !== i.ui) return null;
	let n = C(e.ui);
	return n ? {
		source: t,
		type: i.ui,
		protocol_version: 1,
		ui: n
	} : null;
}
function W(e) {
	return !x(e) || e.type !== i.request || e.method !== a.toolConfiguratorSubmit && e.method !== a.automationStepConfiguratorSubmit || !S(e.request_id) || e.request_id.length > l ? null : {
		source: t,
		type: i.request,
		protocol_version: 1,
		request_id: e.request_id,
		method: e.method
	};
}
function G(e) {
	if (!x(e) || e.type !== i.response || !S(e.request_id) || e.request_id.length > l) return null;
	if (e.ok === !1) return !S(e.error) || e.error.length > m ? null : {
		source: t,
		type: i.response,
		protocol_version: 1,
		request_id: e.request_id,
		ok: !1,
		error: e.error.trim()
	};
	if (e.ok !== !0) return null;
	let n = P(e.result) ?? N(e.result);
	return n ? {
		source: t,
		type: i.response,
		protocol_version: 1,
		request_id: e.request_id,
		ok: !0,
		result: n
	} : null;
}
function K(e) {
	if (!x(e) || e.type !== i.elementAction || !S(e.request_id) || e.request_id.length > l) return null;
	let n = z(e.request);
	return n ? {
		source: t,
		type: i.elementAction,
		protocol_version: 1,
		request_id: e.request_id,
		request: n
	} : null;
}
function q(e) {
	if (!x(e) || e.type !== i.elementActionResult || !S(e.request_id) || e.request_id.length > l) return null;
	let n = B(e.result);
	return n ? {
		source: t,
		type: i.elementActionResult,
		protocol_version: 1,
		request_id: e.request_id,
		result: n
	} : null;
}
function J(e) {
	return x(e) && e.type === i.clearElementHighlight;
}
function Y() {
	return {
		source: t,
		type: i.ready,
		protocol_version: 1
	};
}
function X(e) {
	return {
		source: t,
		type: i.init,
		protocol_version: 1,
		context: e
	};
}
function Z(e) {
	return {
		source: t,
		type: i.ui,
		protocol_version: 1,
		ui: e
	};
}
function Q(e, n = a.toolConfiguratorSubmit) {
	return {
		source: t,
		type: i.request,
		protocol_version: 1,
		request_id: e,
		method: n
	};
}
function $(e, n) {
	return {
		source: t,
		type: i.elementAction,
		protocol_version: 1,
		request_id: e,
		request: n
	};
}
function te(e, n) {
	return {
		source: t,
		type: i.elementActionResult,
		protocol_version: 1,
		request_id: e,
		result: n
	};
}
function ne() {
	return {
		source: t,
		type: i.clearElementHighlight,
		protocol_version: 1
	};
}
function re(e, n) {
	return {
		source: t,
		type: i.response,
		protocol_version: 1,
		request_id: e,
		ok: !0,
		result: n
	};
}
function ie(e, n) {
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
export { n as SENLER_BRIDGE_BOOTSTRAP_CONTEXT_VERSION, r as SENLER_BRIDGE_BOOTSTRAP_MODE, i as SENLER_BRIDGE_MESSAGE, e as SENLER_BRIDGE_PROTOCOL_VERSION, a as SENLER_BRIDGE_REQUEST, t as SENLER_BRIDGE_SOURCE, ne as createClearElementHighlightMessage, $ as createElementActionMessage, te as createElementActionResultMessage, ie as createErrorResponseMessage, X as createInitMessage, Y as createReadyMessage, Q as createSubmitRequestMessage, re as createSuccessResponseMessage, Z as createUiMessage, J as isSenlerBridgeClearElementHighlightMessage, V as isSenlerBridgeReadyMessage, P as parseSenlerBridgeAutomationStepConfiguratorResult, M as parseSenlerBridgeContext, K as parseSenlerBridgeElementActionMessage, z as parseSenlerBridgeElementActionRequest, B as parseSenlerBridgeElementActionResult, q as parseSenlerBridgeElementActionResultMessage, H as parseSenlerBridgeInitMessage, E as parseSenlerBridgeJsonObject, W as parseSenlerBridgeRequestMessage, G as parseSenlerBridgeResponseMessage, N as parseSenlerBridgeToolConfiguratorResult, C as parseSenlerBridgeUiContext, U as parseSenlerBridgeUiMessage };
