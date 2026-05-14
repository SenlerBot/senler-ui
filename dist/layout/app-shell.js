import { cn as e } from "../lib/utils/cn.js";
import { Button as t } from "../atoms/button.js";
import { Badge as n } from "../atoms/badge.js";
import { ScrollArea as r } from "../atoms/scroll-area.js";
import { Sheet as i, SheetContent as a, SheetTitle as o } from "../atoms/sheet.js";
import { VisuallyHidden as s } from "../atoms/visually-hidden.js";
import * as c from "react";
import { ChevronRightIcon as l, MenuIcon as u } from "lucide-react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/layout/app-shell.tsx
var m = {
	navigation: "Navigation",
	openSidebar: "Open navigation"
};
function h(e) {
	return {
		...m,
		...e
	};
}
function g(e, t) {
	return typeof e.active == "boolean" ? e.active : typeof e.match == "function" ? e.match(t) : (Array.isArray(e.match) ? e.match : e.match ? [e.match] : []).some((e) => t === e || t.startsWith(`${e}/`) || t.includes(e)) ? !0 : e.href ? e.exact ? t === e.href : t === e.href || t.startsWith(`${e.href}/`) : e.items?.some((e) => g(e, t)) ?? !1;
}
function _(e) {
	return e.title ? e.title : typeof e.label == "string" ? e.label : e.id;
}
function v(e, t) {
	e.onSelect?.(), t?.();
}
function y({ item: t, currentPath: r, renderLink: i, onNavigate: a, depth: o = 0 }) {
	let s = g(t, r), c = _(t), l = t.icon, u = !!t.items?.length && (s || t.defaultOpen), m = e("group/app-shell-nav-item flex h-8 w-full items-center gap-2 rounded-md text-sm outline-none transition-colors", "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", "focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50", "aria-disabled:pointer-events-none aria-disabled:opacity-50", s && "bg-muted font-medium text-foreground", "px-2", o > 0 && "h-7 text-[13px] text-sidebar-foreground/80"), h = /* @__PURE__ */ p(d, { children: [
		l ? /* @__PURE__ */ f(l, { className: "size-4 shrink-0 text-muted-foreground group-hover/app-shell-nav-item:text-inherit" }) : null,
		/* @__PURE__ */ f("span", {
			className: "min-w-0 flex-1 truncate",
			children: t.label
		}),
		t.badge === void 0 ? null : /* @__PURE__ */ f(n, {
			variant: "secondary",
			className: "ml-auto max-w-16 rounded-full px-1.5 py-0 text-[11px]",
			children: t.badge
		})
	] });
	return /* @__PURE__ */ p("li", {
		className: "min-w-0",
		children: [t.href && !t.disabled ? i({
			item: t,
			href: t.href,
			className: m,
			children: h,
			title: c,
			onClick: (e) => {
				if (t.disabled) {
					e.preventDefault();
					return;
				}
				v(t, a);
			},
			"aria-current": s ? "page" : void 0
		}) : /* @__PURE__ */ f("button", {
			type: "button",
			className: m,
			disabled: t.disabled,
			"aria-current": s ? "page" : void 0,
			"aria-disabled": t.disabled || void 0,
			title: c,
			onClick: () => {
				t.disabled || v(t, a);
			},
			children: h
		}), u ? /* @__PURE__ */ f("ul", {
			className: "mt-1 grid gap-1 border-l border-sidebar-border pl-3",
			children: t.items?.map((e) => /* @__PURE__ */ f(y, {
				item: e,
				currentPath: r,
				renderLink: i,
				onNavigate: a,
				depth: o + 1
			}, e.id))
		}) : null]
	});
}
function b({ navigation: e, currentPath: t, renderLink: n, brand: i, headerActions: a, top: o, footer: s, labels: c, onNavigate: l }) {
	let u = h(c);
	return /* @__PURE__ */ p("div", {
		className: "flex h-full min-h-0 w-full flex-col",
		children: [
			/* @__PURE__ */ p("div", {
				className: "flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-3",
				children: [/* @__PURE__ */ f("div", {
					className: "min-w-0 flex-1 overflow-hidden",
					children: i
				}), a ? /* @__PURE__ */ f("div", {
					className: "flex shrink-0 items-center gap-0.5",
					children: a
				}) : null]
			}),
			o ? /* @__PURE__ */ f("div", {
				className: "shrink-0 p-2",
				children: o
			}) : null,
			/* @__PURE__ */ f(r, {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ f("nav", {
					"aria-label": u.navigation,
					className: "grid gap-3 p-2",
					children: e.map((e) => /* @__PURE__ */ p("div", {
						className: "grid gap-1",
						children: [e.label ? /* @__PURE__ */ f("div", {
							className: "px-2 py-1 text-xs font-medium text-sidebar-foreground/70",
							children: e.label
						}) : null, /* @__PURE__ */ f("ul", {
							className: "grid gap-1",
							children: e.items.map((e) => /* @__PURE__ */ f(y, {
								item: e,
								currentPath: t,
								renderLink: n,
								onNavigate: l
							}, e.id))
						})]
					}, e.id))
				})
			}),
			s ? /* @__PURE__ */ f("div", {
				className: "shrink-0 p-2",
				children: s
			}) : null
		]
	});
}
function x({ className: t, mobile: n = !1, ...r }) {
	return n ? /* @__PURE__ */ f("div", {
		"data-slot": "app-sidebar",
		"data-mobile": "true",
		className: e("flex h-full bg-sidebar text-sidebar-foreground", t),
		children: /* @__PURE__ */ f(b, { ...r })
	}) : /* @__PURE__ */ f("aside", {
		"data-slot": "app-sidebar",
		"data-state": "expanded",
		className: e("hidden h-dvh w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex", t),
		children: /* @__PURE__ */ f(b, { ...r })
	});
}
function S({ breadcrumbs: t, renderLink: n }) {
	return /* @__PURE__ */ f("div", {
		className: "flex min-w-0 flex-1 items-center gap-1 overflow-hidden",
		children: t.map((r, i) => {
			let a = i !== t.length - 1 && !!r.href && !!n, o = e("text-[13px] font-medium leading-4 whitespace-nowrap text-foreground transition-colors", a && "hover:text-primary");
			return /* @__PURE__ */ p(c.Fragment, { children: [i > 0 ? /* @__PURE__ */ f(l, { className: "size-4 shrink-0 text-muted-foreground" }) : null, a && r.href ? n({
				breadcrumb: r,
				href: r.href,
				className: o,
				children: r.label,
				title: r.title,
				onClick: () => r.onSelect?.()
			}) : /* @__PURE__ */ f("p", {
				className: o,
				title: r.title,
				children: r.label
			})] }, r.id);
		})
	});
}
function C({ title: n, breadcrumbs: r, actions: i, renderLink: a, labels: o, onSidebarOpen: s, className: c, ...l }) {
	let d = h(o);
	return /* @__PURE__ */ p("header", {
		"data-slot": "app-header",
		className: e("shrink-0 border-b border-border bg-background", c),
		...l,
		children: [/* @__PURE__ */ p("div", {
			className: "flex h-14 min-w-0 items-center gap-2 px-4 md:hidden",
			children: [
				s ? /* @__PURE__ */ f(t, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": d.openSidebar,
					title: d.openSidebar,
					onClick: s,
					children: /* @__PURE__ */ f(u, {})
				}) : null,
				n ? /* @__PURE__ */ f("span", {
					className: "min-w-0 flex-1 truncate text-sm font-semibold text-foreground",
					children: n
				}) : null,
				i ? /* @__PURE__ */ f("div", {
					className: "ml-auto flex shrink-0 items-center gap-1",
					children: i
				}) : null
			]
		}), /* @__PURE__ */ p("div", {
			className: "hidden h-14 min-w-0 items-center gap-2 px-4 md:flex",
			children: [r?.length ? /* @__PURE__ */ f(S, {
				breadcrumbs: r,
				renderLink: a
			}) : /* @__PURE__ */ f("div", {
				className: "min-w-0 flex-1",
				children: n ? /* @__PURE__ */ f("p", {
					className: "truncate text-[13px] font-medium leading-4 text-foreground",
					children: n
				}) : null
			}), i ? /* @__PURE__ */ f("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: i
			}) : null]
		})]
	});
}
function w({ navigation: t, currentPath: n, renderLink: r, brand: l, sidebarHeaderActions: u, sidebarTop: d, sidebarFooter: m, headerTitle: g, headerBreadcrumbs: _, headerActions: v, children: y, closeMobileOnPathChange: b = !0, labels: S, sidebarClassName: w, headerClassName: T, mainClassName: E, className: D, ...O }) {
	let [k, A] = c.useState(!1);
	c.useEffect(() => {
		b && A(!1);
	}, [b, n]);
	let j = {
		navigation: t,
		currentPath: n,
		renderLink: r,
		brand: l,
		headerActions: u,
		top: d,
		footer: m,
		labels: S,
		onNavigate: () => A(!1)
	};
	return /* @__PURE__ */ p("div", {
		"data-slot": "app-shell",
		className: e("flex h-dvh min-h-0 w-full overflow-hidden bg-background text-foreground", D),
		...O,
		children: [
			/* @__PURE__ */ f(x, {
				...j,
				className: w
			}),
			/* @__PURE__ */ p("div", {
				className: "flex h-full min-h-0 min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ f(C, {
					title: g,
					breadcrumbs: _,
					actions: v,
					renderLink: r,
					labels: S,
					onSidebarOpen: () => A(!0),
					className: T
				}), /* @__PURE__ */ f("main", {
					"data-slot": "app-shell-main",
					className: e("min-h-0 flex-1 overflow-auto", E),
					children: y
				})]
			}),
			/* @__PURE__ */ f(i, {
				open: k,
				onOpenChange: A,
				children: /* @__PURE__ */ p(a, {
					side: "left",
					showCloseButton: !1,
					className: "w-[18rem] p-0 text-sidebar-foreground sm:max-w-none [&>button]:hidden",
					children: [/* @__PURE__ */ f(s, { children: /* @__PURE__ */ f(o, { children: h(S).navigation }) }), /* @__PURE__ */ f(x, {
						...j,
						mobile: !0
					})]
				})
			})
		]
	});
}
//#endregion
export { C as AppHeader, w as AppShell, x as AppSidebar };
