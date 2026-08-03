//#region src/bridge/element-action.ts
var e = "data-ai-context-id", t = "data-ai-reveals-context-id", n = "data-ai-reveal-action", r = "data-senler-bridge-highlight", i = "senler-bridge-element-highlight-style", a = 4;
function o(e) {
	return e.trim().toLowerCase();
}
function s(e, t) {
	let n = o(e);
	return t.split(/\s+/u).some((e) => {
		let t = o(e);
		return t.length > 0 && (n === t || n.startsWith(`${t}.`));
	});
}
function c(e) {
	let t = e.ownerDocument.defaultView?.getComputedStyle(e);
	if (t?.display === "none" || t?.visibility === "hidden") return !1;
	let n = e.getBoundingClientRect();
	return n.width > 0 && n.height > 0;
}
function l(t, n) {
	return Array.from(t.querySelectorAll(`[${e}]`)).filter((t) => t.getAttribute(e) === n && c(t));
}
function u(e, n) {
	let r = Array.from(e.querySelectorAll(`[${t}]`)).filter((e) => {
		let r = e.getAttribute(t);
		return !!(r && s(n, r) && c(e));
	});
	return r.length === 1 ? r[0] ?? null : null;
}
function d(e) {
	let t = e.defaultView;
	return t ? new Promise((e) => {
		t.requestAnimationFrame(() => t.requestAnimationFrame(() => e()));
	}) : Promise.resolve();
}
async function f(e, t) {
	for (let r = 0; r <= a; r += 1) {
		let i = l(e, t);
		if (i.length > 0 || r === a) return i;
		let o = u(e, t);
		if (!o) return [];
		(o.getAttribute(n) ?? "click") === "focus" ? o.focus({ preventScroll: !0 }) : o.click(), await d(e);
	}
	return [];
}
function p(e) {
	if (e.getElementById(i)) return;
	let t = e.createElement("style");
	t.id = i, t.textContent = `
    [${r}="true"] {
      outline: 3px solid #f97316 !important;
      outline-offset: 4px !important;
      border-radius: 6px;
      transition: outline-color 120ms ease;
    }
  `, e.head.append(t);
}
function m(e = document) {
	e.querySelectorAll(`[${r}]`).forEach((e) => e.removeAttribute(r));
}
function h(e, t) {
	if (!(e instanceof HTMLInputElement) && !(e instanceof HTMLTextAreaElement) && !(e instanceof HTMLSelectElement)) return !1;
	let n = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e), "value")?.set;
	return n ? n.call(e, t) : e.value = t, e.dispatchEvent(new Event("input", { bubbles: !0 })), e.dispatchEvent(new Event("change", { bubbles: !0 })), !0;
}
function g(e, t) {
	let n = () => ({
		status: "success",
		matched_context_id: t.context_id,
		matched_count: 1
	}), i = (e, n) => ({
		status: "blocked",
		matched_context_id: t.context_id,
		matched_count: 1,
		error_code: e,
		error_message: n
	});
	return t.action === "highlight" ? (m(e.ownerDocument), p(e.ownerDocument), e.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "nearest"
	}), e.setAttribute(r, "true"), n()) : t.action === "scroll_to" ? (e.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "nearest"
	}), n()) : t.action === "focus" ? (e.focus({ preventScroll: !1 }), n()) : t.action === "click" ? e.matches(":disabled,[aria-disabled=\"true\"]") ? i("element_disabled", "The requested element is disabled") : (e.click(), n()) : t.action === "fill" || t.action === "select" ? t.value === void 0 ? i("value_required", "This action requires a value") : h(e, t.value) ? n() : i("unsupported_element", "The requested element cannot accept a value") : t.action === "clear" ? h(e, "") ? n() : i("unsupported_element", "The requested element cannot be cleared") : t.action === "toggle" ? e instanceof HTMLInputElement && (e.type === "checkbox" || e.type === "radio") || e.getAttribute("role") === "switch" ? (e.click(), n()) : i("unsupported_element", "The requested element cannot be toggled") : i("unsupported_action", "The requested action is not supported");
}
async function _(e, t = document) {
	let n = await f(t, e.context_id);
	if (n.length === 0) return {
		status: "not_found",
		matched_count: 0,
		error_code: "element_not_found",
		error_message: "No matching element was found in the application"
	};
	if (n.length > 1) return {
		status: "blocked",
		matched_count: n.length,
		error_code: "ambiguous_element",
		error_message: "More than one matching element is visible in the application"
	};
	let r = n[0];
	return r ? g(r, e) : {
		status: "not_found",
		matched_count: 0,
		error_code: "element_not_found",
		error_message: "No matching element was found in the application"
	};
}
//#endregion
export { m as clearSenlerBridgeElementHighlight, _ as executeSenlerBridgeElementAction };
