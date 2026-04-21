import { jsx as e } from "react/jsx-runtime";
//#region src/layout/container.tsx
function t({ children: t, ...n }) {
	return /* @__PURE__ */ e("div", {
		className: "w-full h-full p-4 sm:py-[40px] sm:px-[60px] lg:py-[40px] lg:px-[120px] mx-auto",
		...n,
		children: /* @__PURE__ */ e("div", {
			className: "max-w-[940px] w-full h-full mx-auto",
			children: t
		})
	});
}
//#endregion
export { t as LayoutContainer };
