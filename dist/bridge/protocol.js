//#region src/bridge/protocol.ts
var e = 1, t = "senler-bridge", n = {
	ready: "senler:bridge:ready",
	init: "senler:bridge:init",
	ui: "senler:bridge:ui",
	request: "senler:bridge:request",
	response: "senler:bridge:response",
	elementAction: "senler:bridge:element-action",
	elementActionResult: "senler:bridge:element-action-result",
	clearElementHighlight: "senler:bridge:clear-element-highlight"
}, r = {
	toolConfiguratorSubmit: "tool-configurator.submit",
	automationStepConfiguratorSubmit: "automation-step-configurator.submit"
}, i = 20, a = 5e3, o = 65536, s = 128, c = 160, l = 64, u = 500, d = 50, f = 100, p = 1e3, m = 160, h = 20, g = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/, _ = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/, v = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function y(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function b(e) {
	return y(e) && e.source === "senler-bridge" && e.protocol_version === 1;
}
function x(e) {
	return typeof e == "string" && e.length > 0;
}
function S(e) {
	return y(e) && (e.language === "ru" || e.language === "en") && (e.theme === "light" || e.theme === "dark") ? {
		language: e.language,
		theme: e.theme
	} : null;
}
function C(e, t, n) {
	if (t > i || (n.visitedNodes += 1, n.visitedNodes > a)) return !1;
	if (e === null || typeof e == "string" || typeof e == "boolean") return typeof e != "string" || e.length <= o;
	if (typeof e == "number") return Number.isFinite(e);
	if (typeof e != "object" || n.seen.has(e)) return !1;
	if (n.seen.add(e), Array.isArray(e)) return e.every((e) => C(e, t + 1, n));
	let r = Object.getPrototypeOf(e);
	return r !== Object.prototype && r !== null ? !1 : y(e) && Object.keys(e).every((e) => !v.has(e)) && Object.values(e).every((e) => C(e, t + 1, n));
}
function w(e) {
	return !y(e) || !C(e, 0, {
		seen: /* @__PURE__ */ new Set(),
		visitedNodes: 0
	}) ? !1 : new TextEncoder().encode(JSON.stringify(e)).byteLength <= o;
}
function T(e) {
	return w(e) ? e : null;
}
function E(e) {
	if (!y(e) || !x(e.name) || e.name.length > l || e.type !== "string" && e.type !== "number" && e.type !== "boolean" || e.description !== void 0 && (typeof e.description != "string" || e.description.length > u) || typeof e.required != "boolean" || !Array.isArray(e.allowed_values) || e.allowed_values.length > f) return null;
	let t = e.type, n = e.allowed_values.filter((e) => typeof e === t);
	return n.length === e.allowed_values.length ? {
		name: e.name,
		type: t,
		...typeof e.description == "string" ? { description: e.description } : {},
		required: e.required,
		allowed_values: n
	} : null;
}
function D(e) {
	if (!Array.isArray(e) || e.length > d) return null;
	let t = e.map(E);
	return t.some((e) => e === null) ? null : t.filter((e) => e !== null);
}
function O(e) {
	if (!y(e) || !x(e.id) || typeof e.title != "string" || !w(e.configuration) || typeof e.has_private_data != "boolean" || typeof e.private_data_required != "boolean" || e.status !== "active" && e.status !== "setup_required") return null;
	let t = D(e.configured_parameters);
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
function k(e) {
	if (!Array.isArray(e) || e.length > h) return null;
	let t = e.flatMap((e) => !y(e) || !x(e.branch_id) || !_.test(e.branch_id) || !x(e.key) || !g.test(e.key) || !x(e.title) || e.title.length > c ? [] : [{
		branch_id: e.branch_id,
		key: e.key,
		title: e.title
	}]);
	if (t.length !== e.length) return null;
	let n = new Set(t.map((e) => e.branch_id)), r = new Set(t.map((e) => e.key));
	return n.size === t.length && r.size === t.length ? t : null;
}
function A(e) {
	if (!y(e) || !x(e.app_id) || !x(e.project_id)) return null;
	if (e.type === "embedded_page") return e.mode !== "installed" && e.mode !== "test" || e.installation_id !== void 0 && !x(e.installation_id) ? null : {
		type: "embedded_page",
		app_id: e.app_id,
		project_id: e.project_id,
		...typeof e.installation_id == "string" ? { installation_id: e.installation_id } : {},
		mode: e.mode
	};
	if (e.type === "automation_step_configurator") {
		if (!x(e.installation_id) || !x(e.automation_id) || !x(e.node_id) || e.mode !== "create" && e.mode !== "edit" || !y(e.step) || !x(e.step.id) || !x(e.step.name) || !x(e.step.title) || typeof e.step.description != "string" || e.step.continuation_mode !== "next" && e.step.continuation_mode !== "fixed" && e.step.continuation_mode !== "configured" || !w(e.configuration)) return null;
		let t = k(e.branches);
		return t ? {
			type: "automation_step_configurator",
			app_id: e.app_id,
			project_id: e.project_id,
			installation_id: e.installation_id,
			automation_id: e.automation_id,
			node_id: e.node_id,
			mode: e.mode,
			step: {
				id: e.step.id,
				name: e.step.name,
				title: e.step.title,
				description: e.step.description,
				continuation_mode: e.step.continuation_mode
			},
			configuration: e.configuration,
			branches: t
		} : null;
	}
	if (e.type !== "tool_configurator" || !x(e.installation_id) || !x(e.agent_id) || e.mode !== "create" && e.mode !== "edit" || !y(e.tool) || !x(e.tool.id) || !x(e.tool.name) || typeof e.tool.description != "string") return null;
	let t = e.instance === null ? null : O(e.instance);
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
function j(e) {
	if (!y(e)) return null;
	let t = S(e.ui);
	if (!t) return null;
	let n = A(e.launch);
	return n ? {
		ui: t,
		launch: n
	} : null;
}
function M(e) {
	if (!y(e) || e.title !== void 0 && (typeof e.title != "string" || e.title.length > c) || !w(e.configuration) || e.private_data_action !== void 0 && e.private_data_action !== "preserve" && e.private_data_action !== "replace" && e.private_data_action !== "clear" || e.private_data !== void 0 && !w(e.private_data) || e.private_data_required !== void 0 && typeof e.private_data_required != "boolean" || e.private_data_action === "replace" && e.private_data === void 0 || e.private_data !== void 0 && e.private_data_action !== "replace") return null;
	let t = D(e.configured_parameters);
	return t ? {
		...typeof e.title == "string" ? { title: e.title } : {},
		configuration: e.configuration,
		configured_parameters: t,
		...e.private_data_action === "preserve" || e.private_data_action === "replace" || e.private_data_action === "clear" ? { private_data_action: e.private_data_action } : {},
		...e.private_data === void 0 ? {} : { private_data: e.private_data },
		...typeof e.private_data_required == "boolean" ? { private_data_required: e.private_data_required } : {}
	} : null;
}
function N(e) {
	if (!y(e) || e.kind !== "automation_step_configurator" || !w(e.configuration)) return null;
	let t = k(e.branches);
	return t ? {
		kind: "automation_step_configurator",
		configuration: e.configuration,
		branches: t
	} : null;
}
var P = [
	"highlight",
	"scroll_to",
	"focus",
	"click",
	"fill",
	"clear",
	"select",
	"toggle"
], F = [
	"success",
	"not_found",
	"failed",
	"blocked"
];
function I(e) {
	return typeof e == "string" && P.some((t) => t === e);
}
function L(e) {
	return typeof e == "string" && F.some((t) => t === e);
}
function R(e) {
	return !y(e) || !x(e.context_id) || e.context_id.length > m || !I(e.action) || e.value !== void 0 && typeof e.value != "string" ? null : {
		context_id: e.context_id,
		action: e.action,
		...typeof e.value == "string" ? { value: e.value } : {}
	};
}
function z(e) {
	return !y(e) || !L(e.status) || e.matched_context_id !== void 0 && (typeof e.matched_context_id != "string" || e.matched_context_id.length > m) || e.matched_count !== void 0 && (typeof e.matched_count != "number" || !Number.isInteger(e.matched_count) || e.matched_count < 0) || e.error_code !== void 0 && typeof e.error_code != "string" || e.error_message !== void 0 && (typeof e.error_message != "string" || e.error_message.length > p) ? null : {
		status: e.status,
		...typeof e.matched_context_id == "string" ? { matched_context_id: e.matched_context_id } : {},
		...typeof e.matched_count == "number" ? { matched_count: e.matched_count } : {},
		...typeof e.error_code == "string" ? { error_code: e.error_code } : {},
		...typeof e.error_message == "string" ? { error_message: e.error_message } : {}
	};
}
function ee(e) {
	return b(e) && e.type === n.ready;
}
function B(e) {
	if (!b(e) || e.type !== n.init) return null;
	let r = j(e.context);
	return r ? {
		source: t,
		type: n.init,
		protocol_version: 1,
		context: r
	} : null;
}
function V(e) {
	if (!b(e) || e.type !== n.ui) return null;
	let r = S(e.ui);
	return r ? {
		source: t,
		type: n.ui,
		protocol_version: 1,
		ui: r
	} : null;
}
function H(e) {
	return !b(e) || e.type !== n.request || e.method !== r.toolConfiguratorSubmit && e.method !== r.automationStepConfiguratorSubmit || !x(e.request_id) || e.request_id.length > s ? null : {
		source: t,
		type: n.request,
		protocol_version: 1,
		request_id: e.request_id,
		method: e.method
	};
}
function U(e) {
	if (!b(e) || e.type !== n.response || !x(e.request_id) || e.request_id.length > s) return null;
	if (e.ok === !1) return !x(e.error) || e.error.length > p ? null : {
		source: t,
		type: n.response,
		protocol_version: 1,
		request_id: e.request_id,
		ok: !1,
		error: e.error.trim()
	};
	if (e.ok !== !0) return null;
	let r = N(e.result) ?? M(e.result);
	return r ? {
		source: t,
		type: n.response,
		protocol_version: 1,
		request_id: e.request_id,
		ok: !0,
		result: r
	} : null;
}
function W(e) {
	if (!b(e) || e.type !== n.elementAction || !x(e.request_id) || e.request_id.length > s) return null;
	let r = R(e.request);
	return r ? {
		source: t,
		type: n.elementAction,
		protocol_version: 1,
		request_id: e.request_id,
		request: r
	} : null;
}
function G(e) {
	if (!b(e) || e.type !== n.elementActionResult || !x(e.request_id) || e.request_id.length > s) return null;
	let r = z(e.result);
	return r ? {
		source: t,
		type: n.elementActionResult,
		protocol_version: 1,
		request_id: e.request_id,
		result: r
	} : null;
}
function K(e) {
	return b(e) && e.type === n.clearElementHighlight;
}
function q() {
	return {
		source: t,
		type: n.ready,
		protocol_version: 1
	};
}
function J(e) {
	return {
		source: t,
		type: n.init,
		protocol_version: 1,
		context: e
	};
}
function Y(e) {
	return {
		source: t,
		type: n.ui,
		protocol_version: 1,
		ui: e
	};
}
function X(e, i = r.toolConfiguratorSubmit) {
	return {
		source: t,
		type: n.request,
		protocol_version: 1,
		request_id: e,
		method: i
	};
}
function Z(e, r) {
	return {
		source: t,
		type: n.elementAction,
		protocol_version: 1,
		request_id: e,
		request: r
	};
}
function Q(e, r) {
	return {
		source: t,
		type: n.elementActionResult,
		protocol_version: 1,
		request_id: e,
		result: r
	};
}
function $() {
	return {
		source: t,
		type: n.clearElementHighlight,
		protocol_version: 1
	};
}
function te(e, r) {
	return {
		source: t,
		type: n.response,
		protocol_version: 1,
		request_id: e,
		ok: !0,
		result: r
	};
}
function ne(e, r) {
	return {
		source: t,
		type: n.response,
		protocol_version: 1,
		request_id: e,
		ok: !1,
		error: r.slice(0, p)
	};
}
//#endregion
export { n as SENLER_BRIDGE_MESSAGE, e as SENLER_BRIDGE_PROTOCOL_VERSION, r as SENLER_BRIDGE_REQUEST, t as SENLER_BRIDGE_SOURCE, $ as createClearElementHighlightMessage, Z as createElementActionMessage, Q as createElementActionResultMessage, ne as createErrorResponseMessage, J as createInitMessage, q as createReadyMessage, X as createSubmitRequestMessage, te as createSuccessResponseMessage, Y as createUiMessage, K as isSenlerBridgeClearElementHighlightMessage, ee as isSenlerBridgeReadyMessage, N as parseSenlerBridgeAutomationStepConfiguratorResult, j as parseSenlerBridgeContext, W as parseSenlerBridgeElementActionMessage, R as parseSenlerBridgeElementActionRequest, z as parseSenlerBridgeElementActionResult, G as parseSenlerBridgeElementActionResultMessage, B as parseSenlerBridgeInitMessage, T as parseSenlerBridgeJsonObject, H as parseSenlerBridgeRequestMessage, U as parseSenlerBridgeResponseMessage, M as parseSenlerBridgeToolConfiguratorResult, S as parseSenlerBridgeUiContext, V as parseSenlerBridgeUiMessage };
