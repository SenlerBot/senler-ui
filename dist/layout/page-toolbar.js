import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/layout/page-toolbar.tsx
function n({ children: n, className: r, contentClassName: i, ...a }) {
	return /* @__PURE__ */ t("div", {
		className: e("sticky top-[calc(3.5rem+env(safe-area-inset-top,0px))] z-20 -mx-3 border-b border-border bg-background px-3 py-3 md:top-14", r),
		...a,
		children: /* @__PURE__ */ t("div", {
			className: e("flex min-w-0 flex-wrap items-center gap-3", i),
			children: n
		})
	});
}
//#endregion
export { n as PageToolbar };
