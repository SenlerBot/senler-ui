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
}, r = { toolConfiguratorSubmit: "tool-configurator.submit" }, i = 20, a = 5e3, o = 64 * 1024, s = 128, c = 160, l = 64, u = 500, d = 50, f = 100, p = 1e3, m = 160, h = new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function g(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function _(e) {
	return g(e) && e.source === "senler-bridge" && e.protocol_version === 1;
}
function v(e) {
	return typeof e == "string" && e.length > 0;
}
function y(e) {
	return g(e) && (e.language === "ru" || e.language === "en") && (e.theme === "light" || e.theme === "dark") ? {
		language: e.language,
		theme: e.theme
	} : null;
}
function b(e, t, n) {
	if (t > i || (n.visitedNodes += 1, n.visitedNodes > a)) return !1;
	if (e === null || typeof e == "string" || typeof e == "boolean") return typeof e != "string" || e.length <= o;
	if (typeof e == "number") return Number.isFinite(e);
	if (typeof e != "object" || n.seen.has(e)) return !1;
	if (n.seen.add(e), Array.isArray(e)) return e.every((e) => b(e, t + 1, n));
	let r = Object.getPrototypeOf(e);
	return r !== Object.prototype && r !== null ? !1 : g(e) && Object.keys(e).every((e) => !h.has(e)) && Object.values(e).every((e) => b(e, t + 1, n));
}
function x(e) {
	return !g(e) || !b(e, 0, {
		seen: /* @__PURE__ */ new Set(),
		visitedNodes: 0
	}) ? !1 : new TextEncoder().encode(JSON.stringify(e)).byteLength <= o;
}
function S(e) {
	if (!g(e) || !v(e.name) || e.name.length > l || e.type !== "string" && e.type !== "number" && e.type !== "boolean" || e.description !== void 0 && (typeof e.description != "string" || e.description.length > u) || typeof e.required != "boolean" || !Array.isArray(e.allowed_values) || e.allowed_values.length > f) return null;
	let t = e.type, n = e.allowed_values.filter((e) => typeof e === t);
	return n.length === e.allowed_values.length ? {
		name: e.name,
		type: t,
		...typeof e.description == "string" ? { description: e.description } : {},
		required: e.required,
		allowed_values: n
	} : null;
}
function C(e) {
	if (!Array.isArray(e) || e.length > d) return null;
	let t = e.map(S);
	return t.some((e) => e === null) ? null : t.filter((e) => e !== null);
}
function w(e) {
	if (!g(e) || !v(e.id) || typeof e.title != "string" || !x(e.configuration) || typeof e.has_private_data != "boolean" || typeof e.private_data_required != "boolean" || e.status !== "active" && e.status !== "setup_required") return null;
	let t = C(e.configured_parameters);
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
function T(e) {
	if (!g(e) || !v(e.app_id) || !v(e.project_id)) return null;
	if (e.type === "embedded_page") return e.mode !== "installed" && e.mode !== "test" || e.installation_id !== void 0 && !v(e.installation_id) ? null : {
		type: "embedded_page",
		app_id: e.app_id,
		project_id: e.project_id,
		...typeof e.installation_id == "string" ? { installation_id: e.installation_id } : {},
		mode: e.mode
	};
	if (e.type !== "tool_configurator" || !v(e.installation_id) || !v(e.agent_id) || e.mode !== "create" && e.mode !== "edit" || !g(e.tool) || !v(e.tool.id) || !v(e.tool.name) || typeof e.tool.description != "string") return null;
	let t = e.instance === null ? null : w(e.instance);
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
function E(e) {
	if (!g(e)) return null;
	let t = y(e.ui);
	if (!t) return null;
	let n = T(e.launch);
	return n ? {
		ui: t,
		launch: n
	} : null;
}
function D(e) {
	if (!g(e) || e.title !== void 0 && (typeof e.title != "string" || e.title.length > c) || !x(e.configuration) || e.private_data_action !== void 0 && e.private_data_action !== "preserve" && e.private_data_action !== "replace" && e.private_data_action !== "clear" || e.private_data !== void 0 && !x(e.private_data) || e.private_data_required !== void 0 && typeof e.private_data_required != "boolean" || e.private_data_action === "replace" && e.private_data === void 0 || e.private_data !== void 0 && e.private_data_action !== "replace") return null;
	let t = C(e.configured_parameters);
	return t ? {
		...typeof e.title == "string" ? { title: e.title } : {},
		configuration: e.configuration,
		configured_parameters: t,
		...e.private_data_action === "preserve" || e.private_data_action === "replace" || e.private_data_action === "clear" ? { private_data_action: e.private_data_action } : {},
		...e.private_data === void 0 ? {} : { private_data: e.private_data },
		...typeof e.private_data_required == "boolean" ? { private_data_required: e.private_data_required } : {}
	} : null;
}
var O = [
	"highlight",
	"scroll_to",
	"focus",
	"click",
	"fill",
	"clear",
	"select",
	"toggle"
], k = [
	"success",
	"not_found",
	"failed",
	"blocked"
];
function A(e) {
	return typeof e == "string" && O.some((t) => t === e);
}
function j(e) {
	return typeof e == "string" && k.some((t) => t === e);
}
function M(e) {
	return !g(e) || !v(e.context_id) || e.context_id.length > m || !A(e.action) || e.value !== void 0 && typeof e.value != "string" ? null : {
		context_id: e.context_id,
		action: e.action,
		...typeof e.value == "string" ? { value: e.value } : {}
	};
}
function N(e) {
	return !g(e) || !j(e.status) || e.matched_context_id !== void 0 && (typeof e.matched_context_id != "string" || e.matched_context_id.length > m) || e.matched_count !== void 0 && (typeof e.matched_count != "number" || !Number.isInteger(e.matched_count) || e.matched_count < 0) || e.error_code !== void 0 && typeof e.error_code != "string" || e.error_message !== void 0 && (typeof e.error_message != "string" || e.error_message.length > p) ? null : {
		status: e.status,
		...typeof e.matched_context_id == "string" ? { matched_context_id: e.matched_context_id } : {},
		...typeof e.matched_count == "number" ? { matched_count: e.matched_count } : {},
		...typeof e.error_code == "string" ? { error_code: e.error_code } : {},
		...typeof e.error_message == "string" ? { error_message: e.error_message } : {}
	};
}
function P(e) {
	return _(e) && e.type === n.ready;
}
function F(e) {
	if (!_(e) || e.type !== n.init) return null;
	let r = E(e.context);
	return r ? {
		source: t,
		type: n.init,
		protocol_version: 1,
		context: r
	} : null;
}
function I(e) {
	if (!_(e) || e.type !== n.ui) return null;
	let r = y(e.ui);
	return r ? {
		source: t,
		type: n.ui,
		protocol_version: 1,
		ui: r
	} : null;
}
function L(e) {
	return !_(e) || e.type !== n.request || e.method !== r.toolConfiguratorSubmit || !v(e.request_id) || e.request_id.length > s ? null : {
		source: t,
		type: n.request,
		protocol_version: 1,
		request_id: e.request_id,
		method: r.toolConfiguratorSubmit
	};
}
function R(e) {
	if (!_(e) || e.type !== n.response || !v(e.request_id) || e.request_id.length > s) return null;
	if (e.ok === !1) return !v(e.error) || e.error.length > p ? null : {
		source: t,
		type: n.response,
		protocol_version: 1,
		request_id: e.request_id,
		ok: !1,
		error: e.error.trim()
	};
	if (e.ok !== !0) return null;
	let r = D(e.result);
	return r ? {
		source: t,
		type: n.response,
		protocol_version: 1,
		request_id: e.request_id,
		ok: !0,
		result: r
	} : null;
}
function z(e) {
	if (!_(e) || e.type !== n.elementAction || !v(e.request_id) || e.request_id.length > s) return null;
	let r = M(e.request);
	return r ? {
		source: t,
		type: n.elementAction,
		protocol_version: 1,
		request_id: e.request_id,
		request: r
	} : null;
}
function B(e) {
	if (!_(e) || e.type !== n.elementActionResult || !v(e.request_id) || e.request_id.length > s) return null;
	let r = N(e.result);
	return r ? {
		source: t,
		type: n.elementActionResult,
		protocol_version: 1,
		request_id: e.request_id,
		result: r
	} : null;
}
function V(e) {
	return _(e) && e.type === n.clearElementHighlight;
}
function H() {
	return {
		source: t,
		type: n.ready,
		protocol_version: 1
	};
}
function U(e) {
	return {
		source: t,
		type: n.init,
		protocol_version: 1,
		context: e
	};
}
function W(e) {
	return {
		source: t,
		type: n.ui,
		protocol_version: 1,
		ui: e
	};
}
function G(e) {
	return {
		source: t,
		type: n.request,
		protocol_version: 1,
		request_id: e,
		method: r.toolConfiguratorSubmit
	};
}
function K(e, r) {
	return {
		source: t,
		type: n.elementAction,
		protocol_version: 1,
		request_id: e,
		request: r
	};
}
function q(e, r) {
	return {
		source: t,
		type: n.elementActionResult,
		protocol_version: 1,
		request_id: e,
		result: r
	};
}
function J() {
	return {
		source: t,
		type: n.clearElementHighlight,
		protocol_version: 1
	};
}
function Y(e, r) {
	return {
		source: t,
		type: n.response,
		protocol_version: 1,
		request_id: e,
		ok: !0,
		result: r
	};
}
function X(e, r) {
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
export { n as SENLER_BRIDGE_MESSAGE, e as SENLER_BRIDGE_PROTOCOL_VERSION, r as SENLER_BRIDGE_REQUEST, t as SENLER_BRIDGE_SOURCE, J as createClearElementHighlightMessage, K as createElementActionMessage, q as createElementActionResultMessage, X as createErrorResponseMessage, U as createInitMessage, H as createReadyMessage, G as createSubmitRequestMessage, Y as createSuccessResponseMessage, W as createUiMessage, V as isSenlerBridgeClearElementHighlightMessage, P as isSenlerBridgeReadyMessage, E as parseSenlerBridgeContext, z as parseSenlerBridgeElementActionMessage, M as parseSenlerBridgeElementActionRequest, N as parseSenlerBridgeElementActionResult, B as parseSenlerBridgeElementActionResultMessage, F as parseSenlerBridgeInitMessage, L as parseSenlerBridgeRequestMessage, R as parseSenlerBridgeResponseMessage, D as parseSenlerBridgeToolConfiguratorResult, y as parseSenlerBridgeUiContext, I as parseSenlerBridgeUiMessage };
