import { jsx as e } from "react/jsx-runtime";
import * as t from "@radix-ui/react-collapsible";
//#region src/atoms/collapsible.tsx
function n({ ...n }) {
	return /* @__PURE__ */ e(t.Root, {
		"data-slot": "collapsible",
		...n
	});
}
function r({ ...n }) {
	return /* @__PURE__ */ e(t.CollapsibleTrigger, {
		"data-slot": "collapsible-trigger",
		...n
	});
}
function i({ ...n }) {
	return /* @__PURE__ */ e(t.CollapsibleContent, {
		"data-slot": "collapsible-content",
		...n
	});
}
//#endregion
export { n as Collapsible, i as CollapsibleContent, r as CollapsibleTrigger };
