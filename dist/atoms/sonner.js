import { jsx as e } from "react/jsx-runtime";
import { useTheme as t } from "next-themes";
import { Toaster as n, toast as r } from "sonner";
//#region src/atoms/sonner.tsx
function i({ ...r }) {
	let { resolvedTheme: i } = t();
	return /* @__PURE__ */ e(n, {
		theme: i === "dark" ? "dark" : "light",
		className: "toaster group",
		closeButton: !0,
		toastOptions: { classNames: {
			toast: "group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
			closeButton: "!left-auto !right-1.5 !top-1.5 !translate-x-0 !translate-y-0 !border-0 !bg-transparent !text-muted-foreground !opacity-60 hover:!opacity-100 !transition-opacity",
			success: "group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border",
			error: "group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border",
			warning: "group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border",
			info: "group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border"
		} },
		...r
	});
}
//#endregion
export { i as Toaster, r as toast };
