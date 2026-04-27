import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-avatar";
//#region src/atoms/avatar.tsx
var i = {
	xs: "size-5 text-[10px]",
	sm: "size-6 text-xs",
	md: "size-8 text-sm",
	lg: "size-10 text-base",
	xl: "size-11 text-base",
	"2xl": "size-16 text-xl",
	"3xl": "size-20 text-2xl"
}, a = {
	circle: "rounded-full",
	rounded: "rounded-md"
}, o = [
	"bg-blue-500 text-white",
	"bg-violet-500 text-white",
	"bg-pink-500 text-white",
	"bg-rose-500 text-white",
	"bg-orange-500 text-white",
	"bg-amber-400 text-amber-950",
	"bg-emerald-500 text-white",
	"bg-teal-500 text-white",
	"bg-cyan-400 text-cyan-950",
	"bg-indigo-500 text-white"
], s = {
	"top-left": "-top-0.5 -left-0.5",
	"top-right": "-top-0.5 -right-0.5",
	"bottom-left": "-bottom-0.5 -left-0.5",
	"bottom-right": "-right-0.5 -bottom-0.5"
}, c = {
	xs: "size-2.5",
	sm: "size-3",
	md: "size-4",
	lg: "size-4",
	xl: "size-4",
	"2xl": "size-5",
	"3xl": "size-6"
};
function l(e) {
	let t = 0;
	for (let n = 0; n < e.length; n += 1) t = e.charCodeAt(n) + ((t << 5) - t), t |= 0;
	return Math.abs(t);
}
function u(e) {
	let t = e?.trim();
	return t ? o[l(t) % o.length] : "bg-muted text-muted-foreground";
}
function d(e) {
	let t = e?.trim();
	return t ? Array.from(t)[0]?.toLocaleUpperCase() ?? "?" : "?";
}
function f({ className: n, size: o = "sm", shape: s = "circle", ...c }) {
	return /* @__PURE__ */ t(r.Root, {
		"data-slot": "avatar",
		className: e("relative flex shrink-0 overflow-hidden", i[o], a[s], n),
		...c
	});
}
function p({ className: n, src: i, alt: a, referrerPolicy: o = "no-referrer", loading: s = "lazy", ...c }) {
	return /* @__PURE__ */ t(r.Image, {
		"data-slot": "avatar-image",
		className: e("aspect-square size-full object-cover", n),
		src: i ?? void 0,
		alt: a,
		referrerPolicy: o,
		loading: s,
		...c
	});
}
function m({ className: n, ...i }) {
	return /* @__PURE__ */ t(r.Fallback, {
		"data-slot": "avatar-fallback",
		className: e("flex size-full items-center justify-center rounded-[inherit] bg-muted font-semibold text-muted-foreground select-none", n),
		...i
	});
}
function h({ src: r, alt: i, name: a, colorKey: o, fallback: l, fallbackIcon: h, imageClassName: g, fallbackClassName: _, wrapperClassName: v, badge: y, badgeClassName: b, badgePosition: x = "bottom-right", size: S = "sm", shape: C = "circle", className: w, title: T, ...E }) {
	let D = i ?? a ?? "", O = o ?? a ?? i, k = l ?? h ?? d(a ?? i), A = /* @__PURE__ */ n(f, {
		className: w,
		size: S,
		shape: C,
		title: T ?? a ?? i ?? void 0,
		...E,
		children: [/* @__PURE__ */ t(p, {
			src: r,
			alt: D,
			className: g
		}), /* @__PURE__ */ t(m, {
			className: e(u(O), _),
			children: k
		})]
	});
	return y ? /* @__PURE__ */ n("span", {
		"data-slot": "avatar-wrapper",
		className: e("relative inline-flex shrink-0", v),
		children: [A, /* @__PURE__ */ t("span", {
			"data-slot": "avatar-badge",
			className: e("absolute z-10 flex items-center justify-center rounded-full ring-2 ring-background", c[S], s[x], b),
			children: y
		})]
	}) : A;
}
//#endregion
export { h as Avatar, m as AvatarFallback, p as AvatarImage, f as AvatarRoot, s as avatarBadgePositionClasses, c as avatarBadgeSizeClasses, o as avatarFallbackColorClasses, a as avatarShapeClasses, i as avatarSizeClasses, u as getAvatarColorClassName, d as getAvatarInitial };
