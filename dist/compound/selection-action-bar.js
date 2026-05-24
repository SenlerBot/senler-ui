import { cn as e } from "../lib/utils/cn.js";
import { Button as t } from "../atoms/button.js";
import { CheckBox as n } from "../atoms/checkbox.js";
import { Tooltip as r, TooltipContent as i, TooltipTrigger as a } from "../atoms/tooltip.js";
import * as o from "react";
import { X as s } from "lucide-react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/compound/selection-action-bar.tsx
function u({ selectedCount: u, selectedCountLabel: d, selectAllChecked: f, selectAllLabel: p, clearLabel: m, onSelectAllChange: h, onClear: g, actions: _, children: v, controlsDisabled: y, minTop: b = 0, className: x, toolbarClassName: S, actionsClassName: C }) {
	let w = o.useRef(null), T = o.useRef(null), E = u > 0, [D, O] = o.useState(null), [k, A] = o.useState(null);
	return o.useLayoutEffect(() => {
		if (!E) {
			O(null);
			return;
		}
		let e = w.current;
		if (!e) return;
		let t = () => {
			let t = e.getBoundingClientRect(), n = {
				top: Math.max(t.top, b),
				left: t.left,
				width: t.width
			};
			O((e) => e && e.top === n.top && e.left === n.left && e.width === n.width ? e : n);
		};
		t();
		let n = "ResizeObserver" in window ? new ResizeObserver(t) : null;
		return n?.observe(e), window.addEventListener("resize", t), window.addEventListener("scroll", t, !0), () => {
			n?.disconnect(), window.removeEventListener("resize", t), window.removeEventListener("scroll", t, !0);
		};
	}, [E, b]), o.useLayoutEffect(() => {
		if (!E) {
			A(null);
			return;
		}
		let e = T.current;
		if (!e) return;
		let t = () => {
			let t = Math.ceil(e.getBoundingClientRect().height);
			A((e) => e === t ? e : t);
		};
		t();
		let n = "ResizeObserver" in window ? new ResizeObserver(t) : null;
		return n?.observe(e), window.addEventListener("resize", t), () => {
			n?.disconnect(), window.removeEventListener("resize", t);
		};
	}, [D?.width, E]), /* @__PURE__ */ l("div", {
		ref: w,
		className: e("min-h-10", x),
		style: E && k ? { minHeight: k } : void 0,
		children: [E && D ? /* @__PURE__ */ l("div", {
			ref: T,
			className: e("fixed z-30 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-background px-2 py-1 shadow-lg backdrop-blur", S),
			style: {
				top: D.top,
				left: D.left,
				width: D.width
			},
			children: [/* @__PURE__ */ l("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ c(n, {
					checked: f,
					onCheckedChange: h,
					disabled: y,
					"aria-label": p,
					title: p
				}), /* @__PURE__ */ c("div", {
					className: "min-w-0 truncate text-sm font-medium",
					"aria-live": "polite",
					children: d
				})]
			}), /* @__PURE__ */ l("div", {
				className: e("flex flex-wrap items-center justify-end gap-2", C),
				children: [_, /* @__PURE__ */ l(r, { children: [/* @__PURE__ */ c(a, {
					asChild: !0,
					children: /* @__PURE__ */ c(t, {
						type: "button",
						variant: "ghost",
						size: "icon_sm",
						onClick: g,
						disabled: y,
						"aria-label": m,
						title: m,
						children: /* @__PURE__ */ c(s, { className: "h-4 w-4" })
					})
				}), /* @__PURE__ */ c(i, { children: m })] })]
			})]
		}) : null, E ? null : v]
	});
}
//#endregion
export { u as SelectionActionBar };
