import { jsx as e } from "react/jsx-runtime";
import { useTheme as t } from "next-themes";
import { Toaster as n, toast as r } from "sonner";
//#region src/atoms/sonner.tsx
function i(r) {
	let { resolvedTheme: i } = t();
	return /* @__PURE__ */ e(n, {
		theme: i === "dark" ? "dark" : "light",
		className: "toaster group",
		closeButton: !1,
		...r
	});
}
//#endregion
export { i as Toaster, r as toast };
