"use client";
import { Badge as e } from "../atoms/badge.js";
import { Button as t } from "../atoms/button.js";
import { ScrollArea as n } from "../atoms/scroll-area.js";
import { cn as r } from "../lib/utils/cn.js";
import { Sidebar as i, SidebarProvider as a } from "./sidebar.js";
import * as o from "react";
import { ChevronDownIcon as s, ChevronRightIcon as c, MenuIcon as l } from "lucide-react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
// src/layout/app-shell.tsx
var p = {
	navigation: "Navigation",
	navigationDescription: "Displays the application navigation.",
	openSidebar: "Open navigation",
	expandNavigationGroup: "Expand navigation group",
	collapseNavigationGroup: "Collapse navigation group"
};
function m(e) {
	return {
		...p,
		...e
	};
}
function h(e, t) {
	return typeof e.active == "boolean" ? e.active : typeof e.match == "function" ? e.match(t) : (Array.isArray(e.match) ? e.match : e.match ? [e.match] : []).some((e) => t === e || t.startsWith(`${e}/`)) ? !0 : e.href ? e.exact ? t === e.href : t === e.href || t.startsWith(`${e.href}/`) : e.items?.some((e) => h(e, t)) ?? !1;
}
function g(e) {
	return e.title ? e.title : typeof e.label == "string" ? e.label : e.id;
}
function _(e, t) {
	e.onSelect?.(), t?.();
}
function v({ item: t, currentPath: n, renderLink: i, onNavigate: a, density: c, itemClassName: l, labels: p, groupTriggerBehavior: m, depth: y = 0 }) {
	let b = h(t, n), x = g(t), S = t.icon, C = !!t.items?.length, w = o.useId(), [T, E] = o.useState(t.defaultOpen ?? b), D = o.useRef(b), O = o.useRef(n), k = C && m === "toggle", A = C && (k ? t.expanded ?? T : t.expanded ?? (b || t.defaultOpen === !0));
	o.useEffect(() => {
		let e = b && !D.current, r = b && O.current !== n;
		D.current = b, O.current = n, k && (e || r) && t.expanded === void 0 && E(!0);
	}, [
		b,
		n,
		t.expanded,
		k
	]);
	let j = typeof l == "function" ? l(t, {
		active: b,
		depth: y,
		expanded: A,
		hasChildren: C
	}) : l, M = r("group/app-shell-nav-item flex w-full cursor-pointer items-center text-sm outline-none transition-colors", "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", "focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50", "aria-disabled:pointer-events-none aria-disabled:opacity-50", b && "bg-muted font-medium text-foreground", c === "comfortable" ? "h-9 gap-1.5 rounded-[10px] px-2.5 font-medium" : "h-8 gap-2 rounded-md px-2", y > 0 && (c === "comfortable" ? "h-8 text-[13px] text-sidebar-foreground/80" : "h-7 text-[13px] text-sidebar-foreground/80"), j, t.className), N = (n) => /* @__PURE__ */ f(u, { children: [
		S ? /* @__PURE__ */ d(S, { className: "size-4 shrink-0 text-muted-foreground group-hover/app-shell-nav-item:text-inherit" }) : null,
		/* @__PURE__ */ d("span", {
			className: "min-w-0 flex-1 truncate",
			children: t.label
		}),
		t.badge !== void 0 && t.badgeAppearance !== "plain" ? /* @__PURE__ */ d(e, {
			variant: "secondary",
			className: "ml-auto max-w-16 rounded-full px-1.5 py-0 text-[11px]",
			children: t.badge
		}) : null,
		t.badge !== void 0 && t.badgeAppearance === "plain" ? /* @__PURE__ */ d("span", {
			className: "ml-auto shrink-0 text-[13px] font-medium tabular-nums text-muted-foreground",
			children: t.badge
		}) : null,
		t.trailing,
		n ? /* @__PURE__ */ d(s, {
			"aria-hidden": "true",
			className: r("size-4 shrink-0 text-muted-foreground transition-transform", A && "rotate-180")
		}) : null
	] }), P = (e) => {
		t.expanded === void 0 && E(e), t.onExpandedChange?.(e);
	}, F = () => {
		t.disabled || _(t, a);
	}, I = () => {
		t.disabled || P(!A);
	}, L = (e) => {
		t.disabled ? e.preventDefault() : _(t, a);
	}, R;
	if (t.href && !t.disabled) {
		let e = i({
			item: t,
			href: t.href,
			className: r(M, k && "min-w-0 flex-1"),
			children: N(!1),
			title: x,
			onClick: L,
			"aria-current": b ? "page" : void 0,
			...t.attributes
		});
		R = k ? /* @__PURE__ */ f("div", {
			className: "flex min-w-0 items-center gap-1",
			children: [e, /* @__PURE__ */ d("button", {
				type: "button",
				"data-slot": "app-sidebar-disclosure",
				className: r("flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors", "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring"),
				"aria-controls": w,
				"aria-expanded": A,
				"aria-label": `${A ? p.collapseNavigationGroup : p.expandNavigationGroup}: ${x}`,
				title: `${A ? p.collapseNavigationGroup : p.expandNavigationGroup}: ${x}`,
				onClick: I,
				children: /* @__PURE__ */ d(s, {
					"aria-hidden": "true",
					className: r("size-4 transition-transform", A && "rotate-180")
				})
			})]
		}) : e;
	} else R = /* @__PURE__ */ d("button", {
		type: "button",
		className: M,
		disabled: t.disabled,
		"aria-current": b ? "page" : void 0,
		"aria-controls": k ? w : void 0,
		"aria-expanded": k ? A : void 0,
		"aria-disabled": t.disabled || void 0,
		title: x,
		onClick: k ? I : F,
		...t.attributes,
		children: N(k)
	});
	return /* @__PURE__ */ f("li", {
		className: "min-w-0",
		children: [R, A ? /* @__PURE__ */ d("ul", {
			id: w,
			className: r("mt-1 grid gap-1 border-l border-sidebar-border pl-3", t.childrenClassName),
			children: t.items?.map((e) => /* @__PURE__ */ d(v, {
				item: e,
				currentPath: n,
				renderLink: i,
				onNavigate: a,
				density: c,
				itemClassName: l,
				labels: p,
				groupTriggerBehavior: m,
				depth: y + 1
			}, e.id))
		}) : null]
	});
}
function y({ navigation: e, currentPath: t, renderLink: i, brand: a, headerActions: o, top: s, footer: c, labels: l, onNavigate: u, density: p = "standard", headerClassName: h, topClassName: g, navigationClassName: _, groupClassName: y, groupLabelClassName: b, footerClassName: x, itemClassName: S, groupTriggerBehavior: C = "select" }) {
	let w = m(l);
	return /* @__PURE__ */ f("div", {
		className: "flex h-full min-h-0 w-full flex-col",
		children: [
			/* @__PURE__ */ f("div", {
				className: r("flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-3", h),
				children: [/* @__PURE__ */ d("div", {
					className: "min-w-0 flex-1 overflow-hidden",
					children: a
				}), o ? /* @__PURE__ */ d("div", {
					className: "flex shrink-0 items-center gap-0.5",
					children: o
				}) : null]
			}),
			s ? /* @__PURE__ */ d("div", {
				className: r("shrink-0 p-2", g),
				children: s
			}) : null,
			/* @__PURE__ */ d(n, {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ d("nav", {
					"aria-label": w.navigation,
					className: r("grid gap-3 p-2", _),
					children: e.map((e) => /* @__PURE__ */ f("div", {
						className: r("grid gap-1", y, e.className),
						...e.attributes,
						children: [e.label ? /* @__PURE__ */ d("div", {
							className: r("px-2 py-1 text-xs font-medium text-sidebar-foreground/70", b, e.labelClassName),
							children: e.label
						}) : null, /* @__PURE__ */ d("ul", {
							className: r("grid gap-1", e.itemsClassName),
							children: e.items.map((e) => /* @__PURE__ */ d(v, {
								item: e,
								currentPath: t,
								renderLink: i,
								onNavigate: u,
								density: p,
								itemClassName: S,
								labels: w,
								groupTriggerBehavior: C
							}, e.id))
						})]
					}, e.id))
				})
			}),
			c ? /* @__PURE__ */ d("div", {
				className: r("shrink-0 p-2", x),
				children: c
			}) : null
		]
	});
}
function b({ navigation: e, currentPath: t, renderLink: n, brand: r, headerActions: a, top: o, footer: s, className: c, density: l = "standard", mobile: u = !1, style: f, labels: p, onNavigate: h, headerClassName: g, topClassName: _, navigationClassName: v, groupClassName: b, groupLabelClassName: x, footerClassName: S, itemClassName: C, groupTriggerBehavior: w = "select", ...T }) {
	let E = m(p);
	return /* @__PURE__ */ d(i, {
		...T,
		"data-slot": "app-sidebar",
		"data-mobile": u || void 0,
		"data-density": l,
		collapsible: u ? "none" : "offcanvas",
		desktopPosition: "container",
		labels: {
			title: E.navigation,
			description: E.navigationDescription
		},
		className: c,
		style: f,
		children: /* @__PURE__ */ d(y, {
			navigation: e,
			currentPath: t,
			renderLink: n,
			brand: r,
			headerActions: a,
			top: o,
			footer: s,
			labels: p,
			onNavigate: h,
			density: l,
			headerClassName: g,
			topClassName: _,
			navigationClassName: v,
			groupClassName: b,
			groupLabelClassName: x,
			footerClassName: S,
			itemClassName: C,
			groupTriggerBehavior: w
		})
	});
}
function x({ density: e = "standard", width: t, mobileWidth: n, mobile: i = !1, labels: o, ...s }) {
	let c = m(o), l = t ?? (e === "comfortable" ? "16.25rem" : "16rem"), u = n ?? (e === "comfortable" ? "16.25rem" : "18rem");
	return /* @__PURE__ */ d(a, {
		open: !0,
		isMobile: i,
		width: i ? u : l,
		mobileWidth: u,
		labels: {
			title: c.navigation,
			description: c.navigationDescription,
			toggle: c.openSidebar
		},
		className: r("w-auto", i && "h-full"),
		children: /* @__PURE__ */ d(b, {
			...s,
			labels: o,
			density: e,
			mobile: i
		})
	});
}
function S({ breadcrumbs: e, renderLink: t }) {
	return /* @__PURE__ */ d("div", {
		className: "flex min-w-0 flex-1 items-center gap-1 overflow-hidden",
		children: e.map((n, i) => {
			let a = i !== e.length - 1 && !!n.href && !!t, s = r("text-[13px] font-medium leading-4 whitespace-nowrap text-foreground transition-colors", a && "cursor-pointer hover:text-primary");
			return /* @__PURE__ */ f(o.Fragment, { children: [i > 0 ? /* @__PURE__ */ d(c, { className: "size-4 shrink-0 text-muted-foreground" }) : null, a && n.href ? t({
				breadcrumb: n,
				href: n.href,
				className: s,
				children: n.label,
				title: n.title,
				onClick: () => n.onSelect?.()
			}) : /* @__PURE__ */ d("p", {
				className: s,
				title: n.title,
				children: n.label
			})] }, n.id);
		})
	});
}
function C({ title: e, breadcrumbs: n, actions: i, renderLink: a, labels: o, onSidebarOpen: s, className: c, ...u }) {
	let p = m(o);
	return /* @__PURE__ */ f("header", {
		"data-slot": "app-header",
		className: r("shrink-0 border-b border-border bg-background", c),
		...u,
		children: [/* @__PURE__ */ f("div", {
			className: "flex h-14 min-w-0 items-center gap-2 px-4 md:hidden",
			children: [
				s ? /* @__PURE__ */ d(t, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": p.openSidebar,
					title: p.openSidebar,
					onClick: s,
					children: /* @__PURE__ */ d(l, {})
				}) : null,
				e ? /* @__PURE__ */ d("span", {
					className: "min-w-0 flex-1 truncate text-sm font-semibold text-foreground",
					children: e
				}) : null,
				i ? /* @__PURE__ */ d("div", {
					className: "ml-auto flex shrink-0 items-center gap-1",
					children: i
				}) : null
			]
		}), /* @__PURE__ */ f("div", {
			className: "hidden h-14 min-w-0 items-center gap-2 px-4 md:flex",
			children: [n?.length ? /* @__PURE__ */ d(S, {
				breadcrumbs: n,
				renderLink: a
			}) : /* @__PURE__ */ d("div", {
				className: "min-w-0 flex-1",
				children: e ? /* @__PURE__ */ d("p", {
					className: "truncate text-[13px] font-medium leading-4 text-foreground",
					children: e
				}) : null
			}), i ? /* @__PURE__ */ d("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: i
			}) : null]
		})]
	});
}
function w({ navigation: e, currentPath: t, renderLink: n, brand: i, sidebarHeaderActions: s, sidebarTop: c, sidebarFooter: l, headerTitle: u, headerBreadcrumbs: p, headerActions: h, children: g, closeMobileOnPathChange: _ = !0, mobileSidebarOpen: v, defaultMobileSidebarOpen: y = !1, onMobileSidebarOpenChange: x, renderHeader: S, labels: w, sidebarDensity: T = "standard", sidebarWidth: E, sidebarMobileWidth: D, sidebarHeaderClassName: O, sidebarTopClassName: k, sidebarNavigationClassName: A, sidebarGroupClassName: j, sidebarGroupLabelClassName: M, sidebarFooterClassName: N, sidebarItemClassName: P, sidebarGroupTriggerBehavior: F = "select", sidebarClassName: I, headerClassName: L, mainClassName: R, className: z, ...B }) {
	let V = m(w), H = E ?? (T === "comfortable" ? "16.25rem" : "16rem"), U = D ?? (T === "comfortable" ? "16.25rem" : "18rem"), [W, G] = o.useState(y), K = v ?? W, q = o.useCallback((e) => {
		v === void 0 && G(e), x?.(e);
	}, [v, x]), J = o.useRef(t);
	o.useEffect(() => {
		_ && J.current !== t && q(!1), J.current = t;
	}, [
		_,
		t,
		q
	]);
	let Y = o.useCallback(() => {
		q(!0);
	}, [q]), X = o.useCallback(() => {
		q(!1);
	}, [q]), Z = o.useCallback(() => {
		q(!K);
	}, [K, q]), Q = {
		navigation: e,
		currentPath: t,
		renderLink: n,
		brand: i,
		headerActions: s,
		top: c,
		footer: l,
		labels: w,
		density: T,
		headerClassName: O,
		topClassName: k,
		navigationClassName: A,
		groupClassName: j,
		groupLabelClassName: M,
		footerClassName: N,
		itemClassName: P,
		groupTriggerBehavior: F,
		onNavigate: X
	}, $ = {
		mobileSidebarOpen: K,
		openMobileSidebar: Y,
		closeMobileSidebar: X,
		toggleMobileSidebar: Z
	};
	return /* @__PURE__ */ f(a, {
		open: !0,
		mobileOpen: K,
		onMobileOpenChange: q,
		width: H,
		mobileWidth: U,
		labels: {
			title: V.navigation,
			description: V.navigationDescription,
			toggle: V.openSidebar
		},
		"data-slot": "app-shell",
		className: r("flex h-dvh min-h-0 w-full overflow-hidden bg-background text-foreground", z),
		...B,
		children: [/* @__PURE__ */ d(b, {
			...Q,
			className: I
		}), /* @__PURE__ */ f("div", {
			className: "flex h-full min-h-0 min-w-0 flex-1 flex-col",
			children: [S ? S($) : /* @__PURE__ */ d(C, {
				title: u,
				breadcrumbs: p,
				actions: h,
				renderLink: n,
				labels: w,
				onSidebarOpen: $.openMobileSidebar,
				className: L
			}), /* @__PURE__ */ d("main", {
				"data-slot": "app-shell-main",
				className: r("min-h-0 flex-1 overflow-auto", R),
				children: g
			})]
		})]
	});
}
export { C as AppHeader, w as AppShell, x as AppSidebar };
