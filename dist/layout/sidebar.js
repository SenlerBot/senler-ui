"use client";
import { Button as e } from "../atoms/button.js";
import { Input as t } from "../atoms/input.js";
import { Separator as n } from "../atoms/separator.js";
import { Sheet as r, SheetContent as i, SheetDescription as a, SheetHeader as o, SheetTitle as s } from "../atoms/sheet.js";
import { Skeleton as c } from "../atoms/skeleton.js";
import { Tooltip as l, TooltipContent as u, TooltipProvider as d, TooltipTrigger as f } from "../atoms/tooltip.js";
import { cn as p } from "../lib/utils/cn.js";
import * as m from "react";
import { PanelLeftIcon as h } from "lucide-react";
import { jsx as g, jsxs as _ } from "react/jsx-runtime";
import { cva as v } from "class-variance-authority";
import { Slot as y } from "@radix-ui/react-slot";
// src/layout/sidebar.tsx
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
function w({ defaultOpen: e = !0, open: t, onOpenChange: n, defaultMobileOpen: r = !1, mobileOpen: i, onMobileOpenChange: a, isMobile: o, width: s = "16.25rem", mobileWidth: c = "16.25rem", iconWidth: l = "3rem", persistenceCookie: u = !1, persistenceMaxAge: f = 604800, keyboardShortcut: h = !1, tooltipDelayDuration: _ = 0, labels: v, className: y, style: S, children: w, ...T }) {
	let E = C(o), D = m.useMemo(() => ({
		...b,
		...v
	}), [v]), [O, k] = m.useState(e), [A, j] = m.useState(r), M = t ?? O, N = i ?? A, P = m.useRef(M), F = m.useRef(N);
	P.current = M, F.current = N;
	let I = m.useCallback((e) => {
		let r = typeof e == "function" ? e(P.current) : e;
		P.current = r, t === void 0 && k(r), n?.(r), u && typeof document < "u" && (document.cookie = `${u}=${r}; path=/; max-age=${f}`);
	}, [
		n,
		t,
		u,
		f
	]), L = m.useCallback((e) => {
		let t = typeof e == "function" ? e(F.current) : e;
		F.current = t, i === void 0 && j(t), a?.(t);
	}, [i, a]), R = m.useCallback(() => {
		E ? L((e) => !e) : I((e) => !e);
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
		"--sidebar-width": s,
		"--sidebar-width-mobile": c,
		"--sidebar-width-icon": l
	};
	return /* @__PURE__ */ g(x.Provider, {
		value: B,
		children: /* @__PURE__ */ g(d, {
			delayDuration: _,
			children: /* @__PURE__ */ g("div", {
				"data-slot": "sidebar-wrapper",
				style: V,
				className: p("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex h-dvh w-full", y),
				...T,
				children: w
			})
		})
	});
}
function T({ side: e = "left", variant: t = "sidebar", collapsible: n = "offcanvas", desktopPosition: c = "viewport", innerClassName: l, labels: u, className: d, children: f, ...m }) {
	let { isMobile: h, state: v, openMobile: y, setOpenMobile: b, labels: x } = S(), C = {
		...x,
		...u
	};
	return n === "none" ? /* @__PURE__ */ g("div", {
		"data-slot": "sidebar",
		className: p("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", l, d),
		...m,
		children: f
	}) : h ? /* @__PURE__ */ g(r, {
		open: y,
		onOpenChange: b,
		children: /* @__PURE__ */ _(i, {
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: p("w-(--sidebar-width-mobile) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden", l, d),
			side: e,
			...m,
			children: [/* @__PURE__ */ _(o, {
				className: "sr-only",
				children: [/* @__PURE__ */ g(s, { children: C.title }), /* @__PURE__ */ g(a, { children: C.description })]
			}), /* @__PURE__ */ g("div", {
				className: "flex h-full w-full flex-col",
				children: f
			})]
		})
	}) : c === "container" ? /* @__PURE__ */ g("div", {
		"data-sidebar": "sidebar",
		"data-slot": "sidebar",
		"data-state": v,
		"data-collapsible": v === "collapsed" ? n : "",
		"data-variant": t,
		"data-side": e,
		className: p("group peer hidden h-full w-(--sidebar-width) shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear md:flex", "data-[collapsible=offcanvas]:w-0 data-[collapsible=offcanvas]:overflow-hidden", "data-[collapsible=icon]:w-(--sidebar-width-icon)", t === "floating" || t === "inset" ? "m-2 rounded-lg border border-sidebar-border shadow-sm" : e === "left" ? "border-r border-sidebar-border" : "border-l border-sidebar-border", d),
		...m,
		children: /* @__PURE__ */ g("div", {
			"data-slot": "sidebar-inner",
			className: p("flex h-full w-full flex-col", l),
			children: f
		})
	}) : /* @__PURE__ */ _("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": v,
		"data-collapsible": v === "collapsed" ? n : "",
		"data-variant": t,
		"data-side": e,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ g("div", {
			"data-slot": "sidebar-gap",
			className: p("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
		}), /* @__PURE__ */ g("div", {
			"data-slot": "sidebar-container",
			className: p("fixed inset-y-0 z-10 hidden h-dvh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", e === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", t === "floating" || t === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", d),
			...m,
			children: /* @__PURE__ */ g("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: p("flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm", l),
				children: f
			})
		})]
	});
}
function E({ className: t, onClick: n, children: r, type: i = "button", "aria-label": a, title: o, ...s }) {
	let { labels: c, toggleSidebar: l } = S();
	return /* @__PURE__ */ g(e, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon",
		type: i,
		"aria-label": a ?? c.toggle,
		title: o ?? c.toggle,
		className: p("size-7", t),
		onClick: (e) => {
			n?.(e), e.defaultPrevented || l();
		},
		...s,
		children: r ?? /* @__PURE__ */ g(h, {})
	});
}
function D({ className: t, type: n = "button", "aria-label": r, title: i, onClick: a, ...o }) {
	let { labels: s, toggleSidebar: c } = S();
	return /* @__PURE__ */ g(e, {
		type: n,
		variant: "ghost",
		size: "none",
		"data-sidebar": "rail",
		"data-slot": "sidebar-rail",
		"aria-label": r ?? s.toggle,
		tabIndex: -1,
		onClick: (e) => {
			a?.(e), e.defaultPrevented || c();
		},
		title: i ?? s.toggle,
		className: p("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex", "hover:bg-transparent hover:text-inherit dark:hover:bg-transparent", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[side=left]:-right-4 group-data-[side=right]:left-0", "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", t),
		...o
	});
}
function O({ className: e, ...t }) {
	return /* @__PURE__ */ g("main", {
		"data-slot": "sidebar-inset",
		className: p("relative flex min-h-0 w-full flex-1 flex-col bg-background", "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", e),
		...t
	});
}
function k({ className: e, ...n }) {
	return /* @__PURE__ */ g(t, {
		"data-slot": "sidebar-input",
		"data-sidebar": "input",
		className: p("h-8 w-full bg-background shadow-none", e),
		...n
	});
}
function A({ className: e, ...t }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: p("flex flex-col gap-2 p-2", e),
		...t
	});
}
function j({ className: e, ...t }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: p("flex flex-col gap-2 p-2", e),
		...t
	});
}
function M({ className: e, ...t }) {
	return /* @__PURE__ */ g(n, {
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		className: p("mx-2 bg-sidebar-border data-[orientation=horizontal]:w-auto", e),
		...t
	});
}
function N({ className: e, ...t }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: p("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", e),
		...t
	});
}
function P({ className: e, ...t }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: p("relative flex w-full min-w-0 flex-col p-2", e),
		...t
	});
}
function F({ className: e, asChild: t = !1, ...n }) {
	return /* @__PURE__ */ g(t ? y : "div", {
		"data-slot": "sidebar-group-label",
		"data-sidebar": "group-label",
		className: p("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", e),
		...n
	});
}
function I({ className: e, asChild: t = !1, type: n, ...r }) {
	return /* @__PURE__ */ g(t ? y : "button", {
		"data-slot": "sidebar-group-action",
		"data-sidebar": "group-action",
		type: t ? void 0 : n ?? "button",
		className: p("absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 md:after:hidden", "group-data-[collapsible=icon]:hidden", e),
		...r
	});
}
function L({ className: e, ...t }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-group-content",
		"data-sidebar": "group-content",
		className: p("w-full text-sm", e),
		...t
	});
}
function R({ className: e, ...t }) {
	return /* @__PURE__ */ g("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: p("flex w-full min-w-0 flex-col gap-1", e),
		...t
	});
}
function z({ className: e, ...t }) {
	return /* @__PURE__ */ g("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: p("group/menu-item relative", e),
		...t
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
function V({ asChild: e = !1, isActive: t = !1, variant: n = "default", size: r = "default", tooltip: i, className: a, onClick: o, type: s, ...c }) {
	let d = e ? y : "button", { isMobile: h, state: v, setOpenMobile: b } = S(), x = m.useCallback((t) => {
		o?.(t), e && h && !t.defaultPrevented && b(!1);
	}, [
		e,
		h,
		o,
		b
	]), C = /* @__PURE__ */ g(d, {
		"data-slot": "sidebar-menu-button",
		"data-sidebar": "menu-button",
		"data-size": r,
		"data-active": t,
		type: e ? void 0 : s ?? "button",
		className: p(B({
			variant: n,
			size: r
		}), a),
		onClick: x,
		...c
	});
	return i ? /* @__PURE__ */ _(l, { children: [/* @__PURE__ */ g(f, {
		asChild: !0,
		children: C
	}), /* @__PURE__ */ g(u, {
		side: "right",
		align: "center",
		hidden: v !== "collapsed" || h,
		...typeof i == "string" ? { children: i } : i
	})] }) : C;
}
function H({ className: e, asChild: t = !1, showOnHover: n = !1, type: r, ...i }) {
	return /* @__PURE__ */ g(t ? y : "button", {
		"data-slot": "sidebar-menu-action",
		"data-sidebar": "menu-action",
		type: t ? void 0 : r ?? "button",
		className: p("absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 md:after:hidden", "peer-data-[size=sm]/menu-button:top-1 peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", n && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0", e),
		...i
	});
}
function U({ className: e, ...t }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "sidebar-menu-badge",
		"data-sidebar": "menu-badge",
		className: p("pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none", "peer-data-[size=sm]/menu-button:top-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", e),
		...t
	});
}
function W({ className: e, showIcon: t = !1, width: n = "70%", ...r }) {
	let i = { "--skeleton-width": n };
	return /* @__PURE__ */ _("div", {
		"data-slot": "sidebar-menu-skeleton",
		"data-sidebar": "menu-skeleton",
		className: p("flex h-8 items-center gap-2 rounded-md px-2", e),
		...r,
		children: [t ? /* @__PURE__ */ g(c, {
			className: "size-4 rounded-md",
			"data-sidebar": "menu-skeleton-icon"
		}) : null, /* @__PURE__ */ g(c, {
			className: "h-4 max-w-(--skeleton-width) flex-1",
			"data-sidebar": "menu-skeleton-text",
			style: i
		})]
	});
}
function G({ className: e, ...t }) {
	return /* @__PURE__ */ g("ul", {
		"data-slot": "sidebar-menu-sub",
		"data-sidebar": "menu-sub",
		className: p("mx-2 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden", e),
		...t
	});
}
function K({ className: e, ...t }) {
	return /* @__PURE__ */ g("li", {
		"data-slot": "sidebar-menu-sub-item",
		"data-sidebar": "menu-sub-item",
		className: p("group/menu-sub-item relative", e),
		...t
	});
}
function q({ asChild: e = !1, size: t = "md", isActive: n = !1, className: r, ...i }) {
	return /* @__PURE__ */ g(e ? y : "a", {
		"data-slot": "sidebar-menu-sub-button",
		"data-sidebar": "menu-sub-button",
		"data-size": t,
		"data-active": n,
		className: p("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", "data-[active=true]:bg-muted data-[active=true]:font-medium data-[active=true]:text-foreground", t === "sm" ? "text-xs" : "text-sm", "group-data-[collapsible=icon]:hidden", r),
		...i
	});
}
export { T as Sidebar, N as SidebarContent, j as SidebarFooter, P as SidebarGroup, I as SidebarGroupAction, L as SidebarGroupContent, F as SidebarGroupLabel, A as SidebarHeader, k as SidebarInput, O as SidebarInset, R as SidebarMenu, H as SidebarMenuAction, U as SidebarMenuBadge, V as SidebarMenuButton, z as SidebarMenuItem, W as SidebarMenuSkeleton, G as SidebarMenuSub, q as SidebarMenuSubButton, K as SidebarMenuSubItem, w as SidebarProvider, D as SidebarRail, M as SidebarSeparator, E as SidebarTrigger, B as sidebarMenuButtonVariants, S as useSidebar };
