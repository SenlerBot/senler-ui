import { cn as e } from "../lib/utils/cn.js";
import { jsx as t } from "react/jsx-runtime";
import * as n from "@radix-ui/react-collapsible";
//#region src/atoms/collapsible.tsx
function r({ ...e }) {
	return /* @__PURE__ */ t(n.Root, {
		"data-slot": "collapsible",
		...e
	});
}
function i({ className: r, ...i }) {
	return /* @__PURE__ */ t(n.CollapsibleTrigger, {
		"data-slot": "collapsible-trigger",
		className: e("cursor-pointer", r),
		...i
	});
}
function a({ ...e }) {
	return /* @__PURE__ */ t(n.CollapsibleContent, {
		"data-slot": "collapsible-content",
		...e
	});
}
//#endregion
export { r as Collapsible, a as CollapsibleContent, i as CollapsibleTrigger };
