import { cn as e } from "../lib/utils/cn.js";
import { Button as t } from "../atoms/button.js";
import { Badge as n } from "../atoms/badge.js";
import { Separator as r } from "../atoms/separator.js";
import { ScrollArea as i } from "../atoms/scroll-area.js";
import { Sheet as a, SheetContent as o, SheetTitle as s } from "../atoms/sheet.js";
import { Tooltip as c, TooltipContent as l, TooltipTrigger as u } from "../atoms/tooltip.js";
import { VisuallyHidden as d } from "../atoms/visually-hidden.js";
import * as f from "react";
import { ChevronRightIcon as p, ChevronsLeftIcon as m, ChevronsRightIcon as h, MenuIcon as g } from "lucide-react";
import { Fragment as _, jsx as v, jsxs as y } from "react/jsx-runtime";
//#region src/layout/app-shell.tsx
var b = {
	navigation: "Navigation",
	openSidebar: "Open navigation",
	closeSidebar: "Close navigation",
	collapseSidebar: "Collapse navigation",
	expandSidebar: "Expand navigation"
};
function x(e) {
	return {
		...b,
		...e
	};
}
function S(e, t) {
	return typeof e.active == "boolean" ? e.active : typeof e.match == "function" ? e.match(t) : (Array.isArray(e.match) ? e.match : e.match ? [e.match] : []).some((e) => t === e || t.startsWith(`${e}/`) || t.includes(e)) ? !0 : e.href ? e.exact ? t === e.href : t === e.href || t.startsWith(`${e.href}/`) : e.items?.some((e) => S(e, t)) ?? !1;
}
function C(e) {
	return e.title ? e.title : typeof e.label == "string" ? e.label : e.id;
}
function w(e, t) {
	e.onSelect?.(), t?.();
}
function T({ item: t, currentPath: r, collapsed: i, renderLink: a, onNavigate: o, depth: s = 0 }) {
	let d = S(t, r), f = C(t), p = t.icon, m = !!t.items?.length, h = !i && m && (d || t.defaultOpen), g = e("group/app-shell-nav-item flex h-8 w-full items-center gap-2 rounded-md text-sm outline-none transition-colors", "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", "focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50", "aria-disabled:pointer-events-none aria-disabled:opacity-50", d && "bg-muted font-medium text-foreground", i ? "justify-center px-2" : "px-2", s > 0 && !i && "h-7 text-[13px] text-sidebar-foreground/80"), b = /* @__PURE__ */ y(_, { children: [p ? /* @__PURE__ */ v(p, { className: "size-4 shrink-0 text-muted-foreground group-hover/app-shell-nav-item:text-inherit" }) : null, i ? null : /* @__PURE__ */ y(_, { children: [/* @__PURE__ */ v("span", {
		className: "min-w-0 flex-1 truncate",
		children: t.label
	}), t.badge === void 0 ? null : /* @__PURE__ */ v(n, {
		variant: "secondary",
		className: "ml-auto max-w-16 rounded-full px-1.5 py-0 text-[11px]",
		children: t.badge
	})] })] }), x = t.href && !t.disabled ? a({
		item: t,
		href: t.href,
		className: g,
		children: b,
		title: f,
		onClick: (e) => {
			if (t.disabled) {
				e.preventDefault();
				return;
			}
			w(t, o);
		},
		"aria-current": d ? "page" : void 0
	}) : /* @__PURE__ */ v("button", {
		type: "button",
		className: g,
		disabled: t.disabled,
		"aria-current": d ? "page" : void 0,
		"aria-disabled": t.disabled || void 0,
		title: f,
		onClick: () => {
			t.disabled || w(t, o);
		},
		children: b
	});
	return /* @__PURE__ */ y("li", {
		className: "min-w-0",
		children: [i ? /* @__PURE__ */ y(c, { children: [/* @__PURE__ */ v(u, {
			asChild: !0,
			children: x
		}), /* @__PURE__ */ v(l, {
			side: "right",
			align: "center",
			children: f
		})] }) : x, h ? /* @__PURE__ */ v("ul", {
			className: "mt-1 grid gap-1 border-l border-sidebar-border pl-3",
			children: t.items?.map((e) => /* @__PURE__ */ v(T, {
				item: e,
				currentPath: r,
				collapsed: i,
				renderLink: a,
				onNavigate: o,
				depth: s + 1
			}, e.id))
		}) : null]
	});
}
function E({ navigation: n, currentPath: a, renderLink: o, brand: s, brandIcon: c, top: l, footer: u, collapsed: d = !1, mobile: f = !1, labels: p, onNavigate: g, onCollapsedChange: _ }) {
	let b = x(p);
	return /* @__PURE__ */ y("div", {
		className: "flex h-full min-h-0 w-full flex-col",
		children: [
			/* @__PURE__ */ y("div", {
				className: e("flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-3", d && !f && "justify-center px-2"),
				children: [/* @__PURE__ */ v("div", {
					className: "min-w-0 flex-1 overflow-hidden",
					children: d && !f ? /* @__PURE__ */ v("div", {
						className: "flex size-8 items-center justify-center overflow-hidden rounded-md",
						children: c ?? s
					}) : s
				}), !f && _ ? /* @__PURE__ */ v(t, {
					type: "button",
					variant: "ghost",
					size: "icon_sm",
					"aria-label": d ? b.expandSidebar : b.collapseSidebar,
					title: d ? b.expandSidebar : b.collapseSidebar,
					onClick: () => _(!d),
					children: v(d ? h : m, {})
				}) : null]
			}),
			l && (!d || f) ? /* @__PURE__ */ v("div", {
				className: "shrink-0 border-b border-sidebar-border p-2",
				children: l
			}) : null,
			/* @__PURE__ */ v(i, {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ v("nav", {
					"aria-label": b.navigation,
					className: "grid gap-3 p-2",
					children: n.map((e, t) => /* @__PURE__ */ y("div", {
						className: "grid gap-1",
						children: [
							t > 0 && !d ? /* @__PURE__ */ v(r, { className: "my-1 bg-sidebar-border" }) : null,
							e.label && !d ? /* @__PURE__ */ v("div", {
								className: "px-2 py-1 text-xs font-medium text-sidebar-foreground/70",
								children: e.label
							}) : null,
							/* @__PURE__ */ v("ul", {
								className: "grid gap-1",
								children: e.items.map((e) => /* @__PURE__ */ v(T, {
									item: e,
									currentPath: a,
									collapsed: d && !f,
									renderLink: o,
									onNavigate: g
								}, e.id))
							})
						]
					}, e.id))
				})
			}),
			u && (!d || f) ? /* @__PURE__ */ v("div", {
				className: "shrink-0 border-t border-sidebar-border p-2",
				children: u
			}) : null
		]
	});
}
function D({ className: t, collapsed: n = !1, mobile: r = !1, ...i }) {
	return r ? /* @__PURE__ */ v("div", {
		"data-slot": "app-sidebar",
		"data-mobile": "true",
		className: e("flex h-full bg-sidebar text-sidebar-foreground", t),
		children: /* @__PURE__ */ v(E, {
			collapsed: !1,
			mobile: !0,
			...i
		})
	}) : /* @__PURE__ */ v("aside", {
		"data-slot": "app-sidebar",
		"data-state": n ? "collapsed" : "expanded",
		className: e("hidden h-dvh shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear md:flex", n ? "w-12" : "w-64", t),
		children: /* @__PURE__ */ v(E, {
			collapsed: n,
			...i
		})
	});
}
function O({ breadcrumbs: t, renderLink: n }) {
	return /* @__PURE__ */ v("div", {
		className: "flex min-w-0 flex-1 items-center gap-1 overflow-hidden",
		children: t.map((r, i) => {
			let a = i !== t.length - 1 && !!r.href && !!n, o = e("text-[13px] font-medium leading-4 whitespace-nowrap text-foreground transition-colors", a && "hover:text-primary");
			return /* @__PURE__ */ y(f.Fragment, { children: [i > 0 ? /* @__PURE__ */ v(p, { className: "size-4 shrink-0 text-muted-foreground" }) : null, a && r.href ? n({
				breadcrumb: r,
				href: r.href,
				className: o,
				children: r.label,
				title: r.title,
				onClick: () => r.onSelect?.()
			}) : /* @__PURE__ */ v("p", {
				className: o,
				title: r.title,
				children: r.label
			})] }, r.id);
		})
	});
}
function k({ title: n, breadcrumbs: r, actions: i, renderLink: a, labels: o, onSidebarOpen: s, className: c, ...l }) {
	let u = x(o);
	return /* @__PURE__ */ y("header", {
		"data-slot": "app-header",
		className: e("shrink-0 border-b border-border bg-background", c),
		...l,
		children: [/* @__PURE__ */ y("div", {
			className: "flex h-14 min-w-0 items-center gap-2 px-4 md:hidden",
			children: [
				s ? /* @__PURE__ */ v(t, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": u.openSidebar,
					title: u.openSidebar,
					onClick: s,
					children: /* @__PURE__ */ v(g, {})
				}) : null,
				n ? /* @__PURE__ */ v("span", {
					className: "min-w-0 flex-1 truncate text-sm font-semibold text-foreground",
					children: n
				}) : null,
				i ? /* @__PURE__ */ v("div", {
					className: "ml-auto flex shrink-0 items-center gap-1",
					children: i
				}) : null
			]
		}), /* @__PURE__ */ y("div", {
			className: "hidden h-14 min-w-0 items-center gap-2 px-4 md:flex",
			children: [r?.length ? /* @__PURE__ */ v(O, {
				breadcrumbs: r,
				renderLink: a
			}) : /* @__PURE__ */ v("div", {
				className: "min-w-0 flex-1",
				children: n ? /* @__PURE__ */ v("p", {
					className: "truncate text-[13px] font-medium leading-4 text-foreground",
					children: n
				}) : null
			}), i ? /* @__PURE__ */ v("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: i
			}) : null]
		})]
	});
}
function A({ navigation: t, currentPath: n, renderLink: r, brand: i, brandIcon: c, sidebarTop: l, sidebarFooter: u, headerTitle: p, headerBreadcrumbs: m, headerActions: h, children: g, defaultSidebarCollapsed: _ = !1, sidebarCollapsed: b, onSidebarCollapsedChange: S, sidebarStorageKey: C, closeMobileOnPathChange: w = !0, labels: T, sidebarClassName: E, headerClassName: O, mainClassName: A, className: j, ...M }) {
	let [N, P] = f.useState(!1), [F, I] = f.useState(_), L = b ?? F;
	f.useEffect(() => {
		if (!C || b !== void 0 || typeof window > "u") return;
		let e = window.localStorage.getItem(C);
		e === "collapsed" && I(!0), e === "expanded" && I(!1);
	}, [b, C]), f.useEffect(() => {
		w && P(!1);
	}, [w, n]);
	let R = f.useCallback((e) => {
		S?.(e), b === void 0 && I(e), C && typeof window < "u" && window.localStorage.setItem(C, e ? "collapsed" : "expanded");
	}, [
		S,
		b,
		C
	]), z = {
		navigation: t,
		currentPath: n,
		renderLink: r,
		brand: i,
		brandIcon: c,
		top: l,
		footer: u,
		labels: T,
		onNavigate: () => P(!1)
	};
	return /* @__PURE__ */ y("div", {
		"data-slot": "app-shell",
		className: e("flex min-h-dvh w-full bg-background text-foreground", j),
		...M,
		children: [
			/* @__PURE__ */ v(D, {
				...z,
				collapsed: L,
				onCollapsedChange: R,
				className: E
			}),
			/* @__PURE__ */ y("div", {
				className: "flex min-h-dvh min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ v(k, {
					title: p,
					breadcrumbs: m,
					actions: h,
					renderLink: r,
					labels: T,
					onSidebarOpen: () => P(!0),
					className: O
				}), /* @__PURE__ */ v("main", {
					"data-slot": "app-shell-main",
					className: e("min-h-0 flex-1 overflow-auto", A),
					children: g
				})]
			}),
			/* @__PURE__ */ v(a, {
				open: N,
				onOpenChange: P,
				children: /* @__PURE__ */ y(o, {
					side: "left",
					showCloseButton: !1,
					className: "w-[18rem] p-0 text-sidebar-foreground sm:max-w-none [&>button]:hidden",
					children: [/* @__PURE__ */ v(d, { children: /* @__PURE__ */ v(s, { children: x(T).navigation }) }), /* @__PURE__ */ v(D, {
						...z,
						mobile: !0
					})]
				})
			})
		]
	});
}
//#endregion
export { k as AppHeader, A as AppShell, D as AppSidebar };
