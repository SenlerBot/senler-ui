import * as e from "react";
//#region src/lib/ai-auto-attributes.ts
var t = {
	button: "button",
	field: "field",
	tab: "tab",
	listItem: "list-item"
}, n = { save: "save" }, r = /* @__PURE__ */ new Map([
	["ArrowLeft", "Назад / back"],
	["ArrowRight", "Вперед / next"],
	["Check", "Подтвердить / confirm"],
	["CheckIcon", "Подтвердить / confirm"],
	["ChevronLeft", "Назад / previous"],
	["ChevronRight", "Вперед / next"],
	["Copy", "Копировать / copy"],
	["CopyIcon", "Копировать / copy"],
	["Download", "Скачать / download"],
	["Edit", "Редактировать / edit"],
	["Edit2", "Редактировать / edit"],
	["Ellipsis", "Еще / more"],
	["Eye", "Показать / view"],
	["MoreHorizontal", "Еще / more"],
	["MoreVertical", "Еще / more"],
	["Pencil", "Редактировать / edit"],
	["Plus", "Добавить / add"],
	["RefreshCw", "Обновить / refresh"],
	["RotateCw", "Обновить / refresh"],
	["Save", "Сохранить / save"],
	["Search", "Поиск / search"],
	["Settings", "Настройки / settings"],
	["Moon", "Темная тема / dark theme"],
	["Sun", "Светлая тема / light theme"],
	["Trash", "Удалить / delete"],
	["Trash2", "Удалить / delete"],
	["Upload", "Загрузить / upload"],
	["X", "Закрыть / close"],
	["XIcon", "Закрыть / close"]
]);
function i(e) {
	let t = e?.replace(/\s+/g, " ").trim();
	return t && t.length > 0 ? t : void 0;
}
function a(e) {
	if (typeof e == "string") return e;
	if (typeof e == "function") return e.name;
	if (typeof e == "object" && e) {
		let t = Object.getOwnPropertyDescriptor(e, "displayName")?.value;
		return typeof t == "string" ? t : void 0;
	}
}
function o(e) {
	let t = a(e.type);
	return t ? r.get(t) : void 0;
}
function s(t) {
	return i(e.Children.toArray(t).map((t) => typeof t == "string" || typeof t == "number" ? String(t) : e.isValidElement(t) ? s(t.props.children) ?? o(t) ?? "" : "").filter(Boolean).join(" "));
}
function c(e, t, n, r, a, o) {
	return i(e) ?? i(t) ?? i(n) ?? i(r) ?? i(a) ?? s(o);
}
//#endregion
export { n as AI_ACTION, t as AI_KIND, c as getAiLabelFallback, s as getAiTextFromReactNode };
