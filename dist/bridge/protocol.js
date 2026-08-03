//#region src/bridge/protocol.ts
var e = 1, t = "senler-bridge", n = {
	ready: "senler:bridge:ready",
	init: "senler:bridge:init",
	ui: "senler:bridge:ui",
	request: "senler:bridge:request",
	response: "senler:bridge:response"
}, r = { toolConfiguratorSubmit: "tool-configurator.submit" }, i = 20, a = 5e3, o = 64 * 1024, s = 128, c = 160, l = 64, u = 500, d = 50, f = 100, p = 1e3, m = new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function h(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function g(e) {
	return h(e) && e.source === "senler-bridge" && e.protocol_version === 1;
}
function _(e) {
	return typeof e == "string" && e.length > 0;
}
function v(e) {
	return h(e) && (e.language === "ru" || e.language === "en") && (e.theme === "light" || e.theme === "dark") ? {
		language: e.language,
		theme: e.theme
	} : null;
}
function y(e, t, n) {
	if (t > i || (n.visitedNodes += 1, n.visitedNodes > a)) return !1;
	if (e === null || typeof e == "string" || typeof e == "boolean") return typeof e != "string" || e.length <= o;
	if (typeof e == "number") return Number.isFinite(e);
	if (typeof e != "object" || n.seen.has(e)) return !1;
	if (n.seen.add(e), Array.isArray(e)) return e.every((e) => y(e, t + 1, n));
	let r = Object.getPrototypeOf(e);
	return r !== Object.prototype && r !== null ? !1 : h(e) && Object.keys(e).every((e) => !m.has(e)) && Object.values(e).every((e) => y(e, t + 1, n));
}
function b(e) {
	return !h(e) || !y(e, 0, {
		seen: /* @__PURE__ */ new Set(),
		visitedNodes: 0
	}) ? !1 : new TextEncoder().encode(JSON.stringify(e)).byteLength <= o;
}
function x(e) {
	if (!h(e) || !_(e.name) || e.name.length > l || e.type !== "string" && e.type !== "number" && e.type !== "boolean" || e.description !== void 0 && (typeof e.description != "string" || e.description.length > u) || typeof e.required != "boolean" || !Array.isArray(e.allowed_values) || e.allowed_values.length > f) return null;
	let t = e.type, n = e.allowed_values.filter((e) => typeof e === t);
	return n.length === e.allowed_values.length ? {
		name: e.name,
		type: t,
		...typeof e.description == "string" ? { description: e.description } : {},
		required: e.required,
		allowed_values: n
	} : null;
}
function S(e) {
	if (!Array.isArray(e) || e.length > d) return null;
	let t = e.map(x);
	return t.some((e) => e === null) ? null : t.filter((e) => e !== null);
}
function C(e) {
	if (!h(e) || !_(e.id) || typeof e.title != "string" || !b(e.configuration) || typeof e.has_private_data != "boolean" || typeof e.private_data_required != "boolean" || e.status !== "active" && e.status !== "setup_required") return null;
	let t = S(e.configured_parameters);
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
function w(e) {
	if (!h(e) || !_(e.app_id) || !_(e.project_id)) return null;
	if (e.type === "embedded_page") return e.mode !== "installed" && e.mode !== "test" || e.installation_id !== void 0 && !_(e.installation_id) ? null : {
		type: "embedded_page",
		app_id: e.app_id,
		project_id: e.project_id,
		...typeof e.installation_id == "string" ? { installation_id: e.installation_id } : {},
		mode: e.mode
	};
	if (e.type !== "tool_configurator" || !_(e.installation_id) || !_(e.agent_id) || e.mode !== "create" && e.mode !== "edit" || !h(e.tool) || !_(e.tool.id) || !_(e.tool.name) || typeof e.tool.description != "string") return null;
	let t = e.instance === null ? null : C(e.instance);
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
function T(e) {
	if (!h(e)) return null;
	let t = v(e.ui);
	if (!t) return null;
	let n = w(e.launch);
	return n ? {
		ui: t,
		launch: n
	} : null;
}
function E(e) {
	if (!h(e) || e.title !== void 0 && (typeof e.title != "string" || e.title.length > c) || !b(e.configuration) || e.private_data_action !== void 0 && e.private_data_action !== "preserve" && e.private_data_action !== "replace" && e.private_data_action !== "clear" || e.private_data !== void 0 && !b(e.private_data) || e.private_data_required !== void 0 && typeof e.private_data_required != "boolean" || e.private_data_action === "replace" && e.private_data === void 0 || e.private_data !== void 0 && e.private_data_action !== "replace") return null;
	let t = S(e.configured_parameters);
	return t ? {
		...typeof e.title == "string" ? { title: e.title } : {},
		configuration: e.configuration,
		configured_parameters: t,
		...e.private_data_action === "preserve" || e.private_data_action === "replace" || e.private_data_action === "clear" ? { private_data_action: e.private_data_action } : {},
		...e.private_data === void 0 ? {} : { private_data: e.private_data },
		...typeof e.private_data_required == "boolean" ? { private_data_required: e.private_data_required } : {}
	} : null;
}
function D(e) {
	return g(e) && e.type === n.ready;
}
function O(e) {
	if (!g(e) || e.type !== n.init) return null;
	let r = T(e.context);
	return r ? {
		source: t,
		type: n.init,
		protocol_version: 1,
		context: r
	} : null;
}
function k(e) {
	if (!g(e) || e.type !== n.ui) return null;
	let r = v(e.ui);
	return r ? {
		source: t,
		type: n.ui,
		protocol_version: 1,
		ui: r
	} : null;
}
function A(e) {
	return !g(e) || e.type !== n.request || e.method !== r.toolConfiguratorSubmit || !_(e.request_id) || e.request_id.length > s ? null : {
		source: t,
		type: n.request,
		protocol_version: 1,
		request_id: e.request_id,
		method: r.toolConfiguratorSubmit
	};
}
function j(e) {
	if (!g(e) || e.type !== n.response || !_(e.request_id) || e.request_id.length > s) return null;
	if (e.ok === !1) return !_(e.error) || e.error.length > p ? null : {
		source: t,
		type: n.response,
		protocol_version: 1,
		request_id: e.request_id,
		ok: !1,
		error: e.error.trim()
	};
	if (e.ok !== !0) return null;
	let r = E(e.result);
	return r ? {
		source: t,
		type: n.response,
		protocol_version: 1,
		request_id: e.request_id,
		ok: !0,
		result: r
	} : null;
}
function M() {
	return {
		source: t,
		type: n.ready,
		protocol_version: 1
	};
}
function N(e) {
	return {
		source: t,
		type: n.init,
		protocol_version: 1,
		context: e
	};
}
function P(e) {
	return {
		source: t,
		type: n.ui,
		protocol_version: 1,
		ui: e
	};
}
function F(e) {
	return {
		source: t,
		type: n.request,
		protocol_version: 1,
		request_id: e,
		method: r.toolConfiguratorSubmit
	};
}
function I(e, r) {
	return {
		source: t,
		type: n.response,
		protocol_version: 1,
		request_id: e,
		ok: !0,
		result: r
	};
}
function L(e, r) {
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
export { n as SENLER_BRIDGE_MESSAGE, e as SENLER_BRIDGE_PROTOCOL_VERSION, r as SENLER_BRIDGE_REQUEST, t as SENLER_BRIDGE_SOURCE, L as createErrorResponseMessage, N as createInitMessage, M as createReadyMessage, F as createSubmitRequestMessage, I as createSuccessResponseMessage, P as createUiMessage, D as isSenlerBridgeReadyMessage, T as parseSenlerBridgeContext, O as parseSenlerBridgeInitMessage, A as parseSenlerBridgeRequestMessage, j as parseSenlerBridgeResponseMessage, E as parseSenlerBridgeToolConfiguratorResult, v as parseSenlerBridgeUiContext, k as parseSenlerBridgeUiMessage };
