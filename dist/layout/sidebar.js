"use client";
import { cn as e } from "../lib/utils/cn.js";
import { Button as t } from "../atoms/button.js";
import { Separator as n } from "../atoms/separator.js";
import { Input as r } from "../atoms/input.js";
import { Sheet as i, SheetContent as a, SheetDescription as o, SheetHeader as s, SheetTitle as c } from "../atoms/sheet.js";
import { Skeleton as l } from "../atoms/skeleton.js";
import { Tooltip as u, TooltipContent as d, TooltipProvider as f, TooltipTrigger as p } from "../atoms/tooltip.js";
import * as m from "react";
import { PanelLeftIcon as h } from "lucide-react";
import { jsx as g, jsxs as _ } from "react/jsx-runtime";
import { cva as v } from "class-variance-authority";
import { Slot as y } from "@radix-ui/react-slot";
//#region src/layout/sidebar.tsx
var b = {
	title: "Sidebar",
	description: "Displays the mobile sidebar.",
	toggle: "Toggle sidebar"
}, x = m.createContext(null);
function S() {
	let e = m.useContext(x);
	if (!e) throw Error("useSidebar must be used within a SidebarProvider.");
	return e;
}
function C(e) {
	let [t, n] = m.useState(!1);
	return m.useEffect(() => {
		if (e !== void 0) return;
		let t = window.matchMedia("(max-width: 767.98px)"), r = () => n(t.matches);
		return r(), t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), e ?? t;
}
function w({ defaultOpen: t = !0, open: n, onOpenChange: r, defaultMobileOpen: i = !1, mobileOpen: a, onMobileOpenChange: o, isMobile: s, width: c = "16.25rem", mobileWidth: l = "16.25rem", iconWidth: u = "3rem", persistenceCookie: d = !1, persistenceMaxAge: p = 604800, keyboardShortcut: h = !1, tooltipDelayDuration: _ = 0, labels: v, className: y, style: S, children: w, ...T }) {
	let E = C(s), D = m.useMemo(() => ({
		...b,
		...v
	}), [v]), [O, k] = m.useState(t), [A, j] = m.useState(i), M = n ?? O, N = a ?? A, P = m.useRef(M), F = m.useRef(N);
	P.current = M, F.current = N;
	let I = m.useCallback((e) => {
		let t = typeof e == "function" ? e(P.current) : e;
		P.current = t, n === void 0 && k(t), r?.(t), d && typeof document < "u" && (document.cookie = `${d}=${t}; path=/; max-age=${p}`);
	}, [
		r,
		n,
		d,
		p
	]), L = m.useCallback((e) => {
		let t = typeof e == "function" ? e(F.current) : e;
		F.current = t, a === void 0 && j(t), o?.(t);
	}, [a, o]), R = m.useCallback(() => {
		if (E) {
			L((e) => !e);
			return;
		}
		I((e) => !e);
	}, [
		E,
		I,
		L
	]);
	m.useEffect(() => {
		if (!h) return;
		let e = (e) => {
			let t = e.target;
			e.defaultPrevented || e.repeat || t instanceof window.HTMLElement && (t.isContentEditable || t.matches("input, textarea, select")) || e.key.toLowerCase() === h.toLowerCase() && (e.metaKey || e.ctrlKey) && (e.preventDefault(), R());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [h, R]);
	let z = M ? "expanded" : "collapsed", B = m.useMemo(() => ({
		state: z,
		open: M,
		setOpen: I,
		openMobile: N,
		setOpenMobile: L,
		isMobile: E,
		toggleSidebar: R,
		labels: D
	}), [
		E,
		M,
		N,
		D,
		I,
		L,
		z,
		R
	]), V = {
		...S,
		"--sidebar-width": c,
		"--sidebar-width-mobile": l,
		"--sidebar-width-icon": u
	};
	return /* @__PURE__ */ g(x.Provider, {
		value: B,
		children: /* @__PURE__ */ g(f, {
			delayDuration: _,
			children: /* @__PURE__ */ g("div", {
				"data-slot": "sidebar-wrapper",
				style: V,
				className: e("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex h-dvh w-full", y),
				...T,
				children: w
			})
		})
	});
}
function T({ side: t = "left", variant: n = "sidebar", collapsible: r = "offcanvas", desktopPosition: l = "viewport", innerClassName: u, labels: d, className: f, children: p, ...m }) {
	let { isMobile: h, state: v, openMobile: y, setOpenMobile: b, labels: x } = S(), C = {
		...x,
		...d
	};
	return r === "none" ? /* @__PURE__ */ g("div", {
		"data-slot": "sidebar",
		className: e("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", u, f),
		...m,
		children: p
	}) : h ? /* @__PURE__ */ g(i, {
		open: y,
		onOpenChange: b,
		children: /* @__PURE__ */ _(a, {
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: e("w-(--sidebar-width-mobile) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden", u, f),
			side: t,
			...m,
			children: [/* @__PURE__ */ _(s, {
				className: "sr-only",
				children: [/* @__PURE__ */ g(c, { children: C.title }), /* @__PURE__ */ g(o, { children: C.description })]
			}), /* @__PURE__ */ g("div", {
				className: "flex h-full w-full flex-col",
				children: p
			})]
		})
	}) : l === "container" ? /* @__PURE__ */ g("div", {
		"data-sidebar": "sidebar",
		"data-slot": "sidebar",
		"data-state": v,
		"data-collapsible": v === "collapsed" ? r : "",
		"data-variant": n,
		"data-side": t,
		className: e("group peer hidden h-full w-(--sidebar-width) shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear md:flex", "data-[collapsible=offcanvas]:w-0 data-[collapsible=offcanvas]:overflow-hidden", "data-[collapsible=icon]:w-(--sidebar-width-icon)", n === "floating" || n === "inset" ? "m-2 rounded-lg border border-sidebar-border shadow-sm" : t === "left" ? "border-r border-sidebar-border" : "border-l border-sidebar-border", f),
		...m,
		children: /* @__PURE__ */ g("div", {
			"data-slot": "sidebar-inner",
			className: e("flex h-full w-full flex-col", u),
			children: p
		})
	}) : /* @__PURE__ */ _("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": v,
		"data-collapsible": v === "collapsed" ? r : "",
		"data-variant": n,
		"data-side": t,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ g("div", {
			"data-slot": "sidebar-gap",
			className: e("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", n === "floating" || n === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
		}), /* @__PURE__ */ g("div", {
			"data-slot": "sidebar-container",
			className: e("fixed inset-y-0 z-10 hidden h-dvh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", t === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", n === "floating" || n === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", f),
			...m,
			children: /* @__PURE__ */ g("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: e("flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm", u),
				children: p
			})
		})]
	});
}
function E({ className: n, onClick: r, children: i, type: a = "button", "aria-label": o, title: s, ...c }) {
	let { labels: l, toggleSidebar: u } = S();
	return /* @__PURE__ */ g(t, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon",
		type: a,
		"aria-label": o ?? l.toggle,
		title: s ?? l.toggle,
		className: e("size-7", n),
		onClick: (e) => {
			r?.(e), e.defaultPrevented || u();
		},
		...c,
		children: i ?? /* @__PURE__ */ g(h, {})
	});
}
function D({ className: n, type: r = "button", "aria-label": i, title: a, onClick: o, ...s }) {
	let { labels: c, toggleSidebar: l } = S();
	return /* @__PURE__ */ g(t, {
		type: r,
		variant: "ghost",
		size: "none",
		"data-sidebar": "rail",
		"data-slot": "sidebar-rail",
		"aria-label": i ?? c.toggle,
		tabIndex: -1,
		onClick: (e) => {
			o?.(e), e.defaultPrevented || l();
		},
		title: a ?? c.toggle,
		className: e("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex", "hover:bg-transparent hover:text-inherit dark:hover:bg-transparent", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[side=left]:-right-4 group-data-[side=right]:left-0", "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", n),
		...s
	});
}
function O({ className: t, ...n }) {
	return /* @__PURE__ */ g("main", {
		"data-slot": "sidebar-inset",
		className: e("relative flex min-h-0 w-full flex-1 flex-col bg-background", "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", t),
		...n
	});
}
function k({ className: t, ...n }) {
	return /* @__PURE__ */ g(r, {
		"data-slot": "sidebar-input",
		"data-sidebar": "input",
		className: e("h-8 w-full bg-background shadow-none", t),
		...n
	});
}
function A({ className: t, ...n }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: e("flex flex-col gap-2 p-2", t),
		...n
	});
}
function j({ className: t, ...n }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: e("flex flex-col gap-2 p-2", t),
		...n
	});
}
function M({ className: t, ...r }) {
	return /* @__PURE__ */ g(n, {
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		className: e("mx-2 bg-sidebar-border data-[orientation=horizontal]:w-auto", t),
		...r
	});
}
function N({ className: t, ...n }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: e("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", t),
		...n
	});
}
function P({ className: t, ...n }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: e("relative flex w-full min-w-0 flex-col p-2", t),
		...n
	});
}
function F({ className: t, asChild: n = !1, ...r }) {
	return /* @__PURE__ */ g(n ? y : "div", {
		"data-slot": "sidebar-group-label",
		"data-sidebar": "group-label",
		className: e("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", t),
		...r
	});
}
function I({ className: t, asChild: n = !1, type: r, ...i }) {
	return /* @__PURE__ */ g(n ? y : "button", {
		"data-slot": "sidebar-group-action",
		"data-sidebar": "group-action",
		type: n ? void 0 : r ?? "button",
		className: e("absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 md:after:hidden", "group-data-[collapsible=icon]:hidden", t),
		...i
	});
}
function L({ className: t, ...n }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-group-content",
		"data-sidebar": "group-content",
		className: e("w-full text-sm", t),
		...n
	});
}
function R({ className: t, ...n }) {
	return /* @__PURE__ */ g("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: e("flex w-full min-w-0 flex-col gap-1", t),
		...n
	});
}
function z({ className: t, ...n }) {
	return /* @__PURE__ */ g("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: e("group/menu-item relative", t),
		...n
	});
}
var B = v("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm font-normal text-foreground outline-none ring-sidebar-ring transition-[width,height,padding] [&>svg]:text-muted-foreground hover:bg-accent hover:text-foreground hover:[&>svg]:text-foreground focus-visible:ring-2 active:bg-accent/90 active:text-foreground active:[&>svg]:text-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-muted data-[active=true]:font-medium data-[active=true]:text-foreground data-[active=true]:[&>svg]:text-foreground data-[state=open]:hover:bg-accent data-[state=open]:hover:text-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
	variants: {
		variant: {
			default: "",
			outline: "bg-background text-foreground shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-accent hover:shadow-[0_0_0_1px_var(--border)]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function V({ asChild: t = !1, isActive: n = !1, variant: r = "default", size: i = "default", tooltip: a, className: o, onClick: s, type: c, ...l }) {
	let f = t ? y : "button", { isMobile: h, state: v, setOpenMobile: b } = S(), x = m.useCallback((e) => {
		s?.(e), t && h && !e.defaultPrevented && b(!1);
	}, [
		t,
		h,
		s,
		b
	]), C = /* @__PURE__ */ g(f, {
		"data-slot": "sidebar-menu-button",
		"data-sidebar": "menu-button",
		"data-size": i,
		"data-active": n,
		type: t ? void 0 : c ?? "button",
		className: e(B({
			variant: r,
			size: i
		}), o),
		onClick: x,
		...l
	});
	return a ? /* @__PURE__ */ _(u, { children: [/* @__PURE__ */ g(p, {
		asChild: !0,
		children: C
	}), /* @__PURE__ */ g(d, {
		side: "right",
		align: "center",
		hidden: v !== "collapsed" || h,
		...typeof a == "string" ? { children: a } : a
	})] }) : C;
}
function H({ className: t, asChild: n = !1, showOnHover: r = !1, type: i, ...a }) {
	return /* @__PURE__ */ g(n ? y : "button", {
		"data-slot": "sidebar-menu-action",
		"data-sidebar": "menu-action",
		type: n ? void 0 : i ?? "button",
		className: e("absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 md:after:hidden", "peer-data-[size=sm]/menu-button:top-1 peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", r && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0", t),
		...a
	});
}
function U({ className: t, ...n }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-menu-badge",
		"data-sidebar": "menu-badge",
		className: e("pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none", "peer-data-[size=sm]/menu-button:top-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", t),
		...n
	});
}
function W({ className: t, showIcon: n = !1, width: r = "70%", ...i }) {
	let a = { "--skeleton-width": r };
	return /* @__PURE__ */ _("div", {
		"data-slot": "sidebar-menu-skeleton",
		"data-sidebar": "menu-skeleton",
		className: e("flex h-8 items-center gap-2 rounded-md px-2", t),
		...i,
		children: [n ? /* @__PURE__ */ g(l, {
			className: "size-4 rounded-md",
			"data-sidebar": "menu-skeleton-icon"
		}) : null, /* @__PURE__ */ g(l, {
			className: "h-4 max-w-(--skeleton-width) flex-1",
			"data-sidebar": "menu-skeleton-text",
			style: a
		})]
	});
}
function G({ className: t, ...n }) {
	return /* @__PURE__ */ g("ul", {
		"data-slot": "sidebar-menu-sub",
		"data-sidebar": "menu-sub",
		className: e("mx-2 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden", t),
		...n
	});
}
function K({ className: t, ...n }) {
	return /* @__PURE__ */ g("li", {
		"data-slot": "sidebar-menu-sub-item",
		"data-sidebar": "menu-sub-item",
		className: e("group/menu-sub-item relative", t),
		...n
	});
}
function q({ asChild: t = !1, size: n = "md", isActive: r = !1, className: i, ...a }) {
	return /* @__PURE__ */ g(t ? y : "a", {
		"data-slot": "sidebar-menu-sub-button",
		"data-sidebar": "menu-sub-button",
		"data-size": n,
		"data-active": r,
		className: e("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", "data-[active=true]:bg-muted data-[active=true]:font-medium data-[active=true]:text-foreground", n === "sm" ? "text-xs" : "text-sm", "group-data-[collapsible=icon]:hidden", i),
		...a
	});
}
//#endregion
export { T as Sidebar, N as SidebarContent, j as SidebarFooter, P as SidebarGroup, I as SidebarGroupAction, L as SidebarGroupContent, F as SidebarGroupLabel, A as SidebarHeader, k as SidebarInput, O as SidebarInset, R as SidebarMenu, H as SidebarMenuAction, U as SidebarMenuBadge, V as SidebarMenuButton, z as SidebarMenuItem, W as SidebarMenuSkeleton, G as SidebarMenuSub, q as SidebarMenuSubButton, K as SidebarMenuSubItem, w as SidebarProvider, D as SidebarRail, M as SidebarSeparator, E as SidebarTrigger, B as sidebarMenuButtonVariants, S as useSidebar };
