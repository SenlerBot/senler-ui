import { cn as e } from "../lib/utils/cn.js";
import { jsx as t } from "react/jsx-runtime";
import { cva as n } from "class-variance-authority";
//#region src/layout/section.tsx
var r = n("", {
	variants: { border: {
		true: "border border-border rounded-lg",
		false: ""
	} },
	defaultVariants: { border: !1 }
});
function i({ border: n, className: i, ...a }) {
	return /* @__PURE__ */ t("section", {
		className: e(r({
			border: n,
			className: i
		})),
		...a
	});
}
//#endregion
export { i as LayoutSection };
