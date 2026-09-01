import { cn as e } from "../lib/utils/cn.js";
import { Button as t } from "../atoms/button.js";
import { Badge as n } from "../atoms/badge.js";
import { ScrollArea as r } from "../atoms/scroll-area.js";
import { Sheet as i, SheetContent as a, SheetTitle as o } from "../atoms/sheet.js";
import { VisuallyHidden as s } from "../atoms/visually-hidden.js";
import * as c from "react";
import { ChevronDownIcon as l, ChevronRightIcon as u, MenuIcon as d } from "lucide-react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/layout/app-shell.tsx
var h = {
	navigation: "Navigation",
	openSidebar: "Open navigation"
};
function g(e) {
	return {
		...h,
		...e
	};
}
function _(e, t) {
	return typeof e.active == "boolean" ? e.active : typeof e.match == "function" ? e.match(t) : (Array.isArray(e.match) ? e.match : e.match ? [e.match] : []).some((e) => t === e || t.startsWith(`${e}/`) || t.includes(e)) ? !0 : e.href ? e.exact ? t === e.href : t === e.href || t.startsWith(`${e.href}/`) : e.items?.some((e) => _(e, t)) ?? !1;
}
function v(e) {
	return e.title ? e.title : typeof e.label == "string" ? e.label : e.id;
}
function y(e, t) {
	e.onSelect?.(), t?.();
}
function b({ item: t, currentPath: r, renderLink: i, onNavigate: a, density: o, itemClassName: s, showDisclosureIcons: u, disclosureBehavior: d, depth: h = 0 }) {
	let g = _(t, r), x = v(t), S = t.icon, C = !!t.items?.length, [w, T] = c.useState(t.defaultOpen ?? g), E = d === "interactive" || t.expanded !== void 0 || t.onExpandedChange !== void 0, D = C && (E ? t.expanded ?? (g || w) : g || t.defaultOpen === !0), O = typeof s == "function" ? s(t, {
		active: g,
		depth: h,
		expanded: D,
		hasChildren: C
	}) : s, k = e("group/app-shell-nav-item flex w-full cursor-pointer items-center text-sm outline-none transition-colors", "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", "focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50", "aria-disabled:pointer-events-none aria-disabled:opacity-50", g && "bg-muted font-medium text-foreground", o === "comfortable" ? "h-9 gap-1.5 rounded-[10px] px-2.5 font-medium" : "h-8 gap-2 rounded-md px-2", h > 0 && (o === "comfortable" ? "h-8 text-[13px] text-sidebar-foreground/80" : "h-7 text-[13px] text-sidebar-foreground/80"), O, t.className), A = /* @__PURE__ */ m(f, { children: [
		S ? /* @__PURE__ */ p(S, { className: "size-4 shrink-0 text-muted-foreground group-hover/app-shell-nav-item:text-inherit" }) : null,
		/* @__PURE__ */ p("span", {
			className: "min-w-0 flex-1 truncate",
			children: t.label
		}),
		t.badge !== void 0 && t.badgeAppearance !== "plain" ? /* @__PURE__ */ p(n, {
			variant: "secondary",
			className: "ml-auto max-w-16 rounded-full px-1.5 py-0 text-[11px]",
			children: t.badge
		}) : null,
		t.badge !== void 0 && t.badgeAppearance === "plain" ? /* @__PURE__ */ p("span", {
			className: "ml-auto shrink-0 text-[13px] font-medium tabular-nums text-muted-foreground",
			children: t.badge
		}) : null,
		t.trailing,
		C && u ? /* @__PURE__ */ p(l, {
			"aria-hidden": "true",
			className: e("size-4 shrink-0 text-muted-foreground transition-transform", D && "rotate-180")
		}) : null
	] }), j = (e) => {
		t.expanded === void 0 && T(e), t.onExpandedChange?.(e);
	}, M = t.href && !t.disabled ? i({
		item: t,
		href: t.href,
		className: k,
		children: A,
		title: x,
		onClick: (e) => {
			if (t.disabled) {
				e.preventDefault();
				return;
			}
			y(t, a);
		},
		"aria-current": g ? "page" : void 0,
		"aria-expanded": C ? D : void 0,
		...t.attributes
	}) : /* @__PURE__ */ p("button", {
		type: "button",
		className: k,
		disabled: t.disabled,
		"aria-current": g ? "page" : void 0,
		"aria-expanded": C ? D : void 0,
		"aria-disabled": t.disabled || void 0,
		title: x,
		onClick: () => {
			if (!t.disabled) {
				if (E && C && !t.href) {
					j(!D), t.onSelect?.();
					return;
				}
				y(t, a);
			}
		},
		...t.attributes,
		children: A
	});
	return /* @__PURE__ */ m("li", {
		className: "min-w-0",
		children: [M, D ? /* @__PURE__ */ p("ul", {
			className: e("mt-1 grid gap-1 border-l border-sidebar-border pl-3", t.childrenClassName),
			children: t.items?.map((e) => /* @__PURE__ */ p(b, {
				item: e,
				currentPath: r,
				renderLink: i,
				onNavigate: a,
				density: o,
				itemClassName: s,
				showDisclosureIcons: u,
				disclosureBehavior: d,
				depth: h + 1
			}, e.id))
		}) : null]
	});
}
function x({ navigation: t, currentPath: n, renderLink: i, brand: a, headerActions: o, top: s, footer: c, labels: l, onNavigate: u, density: d = "standard", headerClassName: f, topClassName: h, navigationClassName: _, groupClassName: v, groupLabelClassName: y, footerClassName: x, itemClassName: S, disclosureBehavior: C = "legacy", showDisclosureIcons: w = C === "interactive" }) {
	let T = g(l);
	return /* @__PURE__ */ m("div", {
		className: "flex h-full min-h-0 w-full flex-col",
		children: [
			/* @__PURE__ */ m("div", {
				className: e("flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-3", f),
				children: [/* @__PURE__ */ p("div", {
					className: "min-w-0 flex-1 overflow-hidden",
					children: a
				}), o ? /* @__PURE__ */ p("div", {
					className: "flex shrink-0 items-center gap-0.5",
					children: o
				}) : null]
			}),
			s ? /* @__PURE__ */ p("div", {
				className: e("shrink-0 p-2", h),
				children: s
			}) : null,
			/* @__PURE__ */ p(r, {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ p("nav", {
					"aria-label": T.navigation,
					className: e("grid gap-3 p-2", _),
					children: t.map((t) => /* @__PURE__ */ m("div", {
						className: e("grid gap-1", v, t.className),
						...t.attributes,
						children: [t.label ? /* @__PURE__ */ p("div", {
							className: e("px-2 py-1 text-xs font-medium text-sidebar-foreground/70", y, t.labelClassName),
							children: t.label
						}) : null, /* @__PURE__ */ p("ul", {
							className: e("grid gap-1", t.itemsClassName),
							children: t.items.map((e) => /* @__PURE__ */ p(b, {
								item: e,
								currentPath: n,
								renderLink: i,
								onNavigate: u,
								density: d,
								itemClassName: S,
								showDisclosureIcons: w,
								disclosureBehavior: C
							}, e.id))
						})]
					}, t.id))
				})
			}),
			c ? /* @__PURE__ */ p("div", {
				className: e("shrink-0 p-2", x),
				children: c
			}) : null
		]
	});
}
function S({ className: t, mobile: n = !1, density: r = "standard", width: i, mobileWidth: a, style: o, ...s }) {
	return n ? /* @__PURE__ */ p("div", {
		"data-slot": "app-sidebar",
		"data-mobile": "true",
		"data-density": r,
		className: e("flex h-full bg-sidebar text-sidebar-foreground", a && "w-(--app-sidebar-mobile-width)", t),
		style: {
			...o,
			"--app-sidebar-mobile-width": a
		},
		children: /* @__PURE__ */ p(x, {
			...s,
			density: r
		})
	}) : /* @__PURE__ */ p("aside", {
		"data-slot": "app-sidebar",
		"data-state": "expanded",
		"data-density": r,
		className: e("hidden h-dvh shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex", i ? "w-(--app-sidebar-width)" : r === "comfortable" ? "w-[16.25rem]" : "w-64", t),
		style: {
			...o,
			"--app-sidebar-width": i
		},
		children: /* @__PURE__ */ p(x, {
			...s,
			density: r
		})
	});
}
function C({ breadcrumbs: t, renderLink: n }) {
	return /* @__PURE__ */ p("div", {
		className: "flex min-w-0 flex-1 items-center gap-1 overflow-hidden",
		children: t.map((r, i) => {
			let a = i !== t.length - 1 && !!r.href && !!n, o = e("text-[13px] font-medium leading-4 whitespace-nowrap text-foreground transition-colors", a && "cursor-pointer hover:text-primary");
			return /* @__PURE__ */ m(c.Fragment, { children: [i > 0 ? /* @__PURE__ */ p(u, { className: "size-4 shrink-0 text-muted-foreground" }) : null, a && r.href ? n({
				breadcrumb: r,
				href: r.href,
				className: o,
				children: r.label,
				title: r.title,
				onClick: () => r.onSelect?.()
			}) : /* @__PURE__ */ p("p", {
				className: o,
				title: r.title,
				children: r.label
			})] }, r.id);
		})
	});
}
function w({ title: n, breadcrumbs: r, actions: i, renderLink: a, labels: o, onSidebarOpen: s, className: c, ...l }) {
	let u = g(o);
	return /* @__PURE__ */ m("header", {
		"data-slot": "app-header",
		className: e("shrink-0 border-b border-border bg-background", c),
		...l,
		children: [/* @__PURE__ */ m("div", {
			className: "flex h-14 min-w-0 items-center gap-2 px-4 md:hidden",
			children: [
				s ? /* @__PURE__ */ p(t, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": u.openSidebar,
					title: u.openSidebar,
					onClick: s,
					children: /* @__PURE__ */ p(d, {})
				}) : null,
				n ? /* @__PURE__ */ p("span", {
					className: "min-w-0 flex-1 truncate text-sm font-semibold text-foreground",
					children: n
				}) : null,
				i ? /* @__PURE__ */ p("div", {
					className: "ml-auto flex shrink-0 items-center gap-1",
					children: i
				}) : null
			]
		}), /* @__PURE__ */ m("div", {
			className: "hidden h-14 min-w-0 items-center gap-2 px-4 md:flex",
			children: [r?.length ? /* @__PURE__ */ p(C, {
				breadcrumbs: r,
				renderLink: a
			}) : /* @__PURE__ */ p("div", {
				className: "min-w-0 flex-1",
				children: n ? /* @__PURE__ */ p("p", {
					className: "truncate text-[13px] font-medium leading-4 text-foreground",
					children: n
				}) : null
			}), i ? /* @__PURE__ */ p("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: i
			}) : null]
		})]
	});
}
function T({ navigation: t, currentPath: n, renderLink: r, brand: l, sidebarHeaderActions: u, sidebarTop: d, sidebarFooter: f, headerTitle: h, headerBreadcrumbs: _, headerActions: v, children: y, closeMobileOnPathChange: b = !0, mobileSidebarOpen: x, defaultMobileSidebarOpen: C = !1, onMobileSidebarOpenChange: T, renderHeader: E, labels: D, sidebarDensity: O = "standard", sidebarWidth: k, sidebarMobileWidth: A, sidebarHeaderClassName: j, sidebarTopClassName: M, sidebarNavigationClassName: N, sidebarGroupClassName: P, sidebarGroupLabelClassName: F, sidebarFooterClassName: I, sidebarItemClassName: L, sidebarShowDisclosureIcons: R, sidebarDisclosureBehavior: z = "legacy", sidebarClassName: B, headerClassName: V, mainClassName: H, className: U, ...W }) {
	let [G, K] = c.useState(C), q = x ?? G, J = c.useCallback((e) => {
		x === void 0 && K(e), T?.(e);
	}, [x, T]), Y = c.useRef(n);
	c.useEffect(() => {
		b && Y.current !== n && J(!1), Y.current = n;
	}, [
		b,
		n,
		J
	]);
	let X = c.useCallback(() => {
		J(!0);
	}, [J]), Z = c.useCallback(() => {
		J(!1);
	}, [J]), ee = c.useCallback(() => {
		J(!q);
	}, [q, J]), Q = {
		navigation: t,
		currentPath: n,
		renderLink: r,
		brand: l,
		headerActions: u,
		top: d,
		footer: f,
		labels: D,
		density: O,
		width: k,
		mobileWidth: A,
		headerClassName: j,
		topClassName: M,
		navigationClassName: N,
		groupClassName: P,
		groupLabelClassName: F,
		footerClassName: I,
		itemClassName: L,
		showDisclosureIcons: R,
		disclosureBehavior: z,
		onNavigate: Z
	}, $ = {
		mobileSidebarOpen: q,
		openMobileSidebar: X,
		closeMobileSidebar: Z,
		toggleMobileSidebar: ee
	};
	return /* @__PURE__ */ m("div", {
		"data-slot": "app-shell",
		className: e("flex h-dvh min-h-0 w-full overflow-hidden bg-background text-foreground", U),
		...W,
		children: [
			/* @__PURE__ */ p(S, {
				...Q,
				className: B
			}),
			/* @__PURE__ */ m("div", {
				className: "flex h-full min-h-0 min-w-0 flex-1 flex-col",
				children: [E ? E($) : /* @__PURE__ */ p(w, {
					title: h,
					breadcrumbs: _,
					actions: v,
					renderLink: r,
					labels: D,
					onSidebarOpen: $.openMobileSidebar,
					className: V
				}), /* @__PURE__ */ p("main", {
					"data-slot": "app-shell-main",
					className: e("min-h-0 flex-1 overflow-auto", H),
					children: y
				})]
			}),
			/* @__PURE__ */ p(i, {
				open: q,
				onOpenChange: J,
				children: /* @__PURE__ */ m(a, {
					side: "left",
					showCloseButton: !1,
					className: e("p-0 text-sidebar-foreground sm:max-w-none [&>button]:hidden", A ? "w-(--app-sidebar-mobile-width)" : O === "comfortable" ? "w-[16.25rem]" : "w-[18rem]"),
					style: { "--app-sidebar-mobile-width": A },
					children: [/* @__PURE__ */ p(s, { children: /* @__PURE__ */ p(o, { children: g(D).navigation }) }), /* @__PURE__ */ p(S, {
						...Q,
						mobile: !0
					})]
				})
			})
		]
	});
}
//#endregion
export { w as AppHeader, T as AppShell, S as AppSidebar };
