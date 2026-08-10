//#region src/bridge/element-action.ts
var e = "data-ai-context-id", t = "data-ai-reveals-context-id", n = "data-senler-bridge-highlight", r = "senler-bridge-element-highlight-style";
function i(e) {
	return e.trim().toLowerCase();
}
function a(e, t) {
	let n = i(e);
	return t.split(/\s+/u).some((e) => {
		let t = i(e);
		return t.length > 0 && (n === t || n.startsWith(`${t}.`));
	});
}
function o(e) {
	let t = e.ownerDocument.defaultView?.getComputedStyle(e);
	if (t?.display === "none" || t?.visibility === "hidden") return !1;
	let n = e.getBoundingClientRect();
	return n.width > 0 && n.height > 0;
}
function s(t, n) {
	return Array.from(t.querySelectorAll(`[${e}]`)).filter((t) => t.getAttribute(e) === n && o(t));
}
function c(e, n) {
	let r = Array.from(e.querySelectorAll(`[${t}]`)).filter((e) => {
		let r = e.getAttribute(t);
		return !!(r && a(n, r) && o(e));
	});
	return r.length === 1 ? r[0] ?? null : null;
}
function l(e) {
	let t = e.defaultView;
	return t ? new Promise((e) => {
		t.requestAnimationFrame(() => t.requestAnimationFrame(() => e()));
	}) : Promise.resolve();
}
async function u(e, t) {
	for (let n = 0; n <= 4; n += 1) {
		let r = s(e, t);
		if (r.length > 0 || n === 4) return r;
		let i = c(e, t);
		if (!i) return [];
		(i.getAttribute("data-ai-reveal-action") ?? "click") === "focus" ? i.focus({ preventScroll: !0 }) : i.click(), await l(e);
	}
	return [];
}
function d(e) {
	if (e.getElementById(r)) return;
	let t = e.createElement("style");
	t.id = r, t.textContent = `
    [${n}="true"] {
      outline: 3px solid #f97316 !important;
      outline-offset: 4px !important;
      border-radius: 6px;
      transition: outline-color 120ms ease;
    }
  `, e.head.append(t);
}
function f(e = document) {
	e.querySelectorAll(`[${n}]`).forEach((e) => e.removeAttribute(n));
}
function p(e, t) {
	if (!(e instanceof HTMLInputElement) && !(e instanceof HTMLTextAreaElement) && !(e instanceof HTMLSelectElement)) return !1;
	let n = Object.getPrototypeOf(e), r = Object.getOwnPropertyDescriptor(n, "value")?.set;
	return r ? r.call(e, t) : e.value = t, e.dispatchEvent(new Event("input", { bubbles: !0 })), e.dispatchEvent(new Event("change", { bubbles: !0 })), !0;
}
function m(e, t) {
	let r = () => ({
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
	return t.action === "highlight" ? (f(e.ownerDocument), d(e.ownerDocument), e.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "nearest"
	}), e.setAttribute(n, "true"), r()) : t.action === "scroll_to" ? (e.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "nearest"
	}), r()) : t.action === "focus" ? (e.focus({ preventScroll: !1 }), r()) : t.action === "click" ? e.matches(":disabled,[aria-disabled=\"true\"]") ? i("element_disabled", "The requested element is disabled") : (e.click(), r()) : t.action === "fill" || t.action === "select" ? t.value === void 0 ? i("value_required", "This action requires a value") : p(e, t.value) ? r() : i("unsupported_element", "The requested element cannot accept a value") : t.action === "clear" ? p(e, "") ? r() : i("unsupported_element", "The requested element cannot be cleared") : t.action === "toggle" ? e instanceof HTMLInputElement && (e.type === "checkbox" || e.type === "radio") || e.getAttribute("role") === "switch" ? (e.click(), r()) : i("unsupported_element", "The requested element cannot be toggled") : i("unsupported_action", "The requested action is not supported");
}
async function h(e, t = document) {
	let n = await u(t, e.context_id);
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
	return r ? m(r, e) : {
		status: "not_found",
		matched_count: 0,
		error_code: "element_not_found",
		error_message: "No matching element was found in the application"
	};
}
//#endregion
export { f as clearSenlerBridgeElementHighlight, h as executeSenlerBridgeElementAction };
