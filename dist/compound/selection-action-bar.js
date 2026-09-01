import { cn as e } from "../lib/utils/cn.js";
import { Button as t } from "../atoms/button.js";
import { CheckBox as n } from "../atoms/checkbox.js";
import { Tooltip as r, TooltipContent as i, TooltipTrigger as a } from "../atoms/tooltip.js";
import * as o from "react";
import { X as s } from "lucide-react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/compound/selection-action-bar.tsx
function u({ selectedCount: u, selectedCountLabel: d, selectAllChecked: f, selectAllLabel: p, clearLabel: m, onSelectAllChange: h, onClear: g, actions: _, children: v, controlsDisabled: y, minTop: b = 0, placement: x = "anchor", className: S, toolbarClassName: C, actionsClassName: w }) {
	let T = o.useRef(null), E = o.useRef(null), D = u > 0, [O, k] = o.useState(null), [A, j] = o.useState(null);
	return o.useLayoutEffect(() => {
		if (!D) {
			k(null);
			return;
		}
		let e = T.current;
		if (!e) return;
		let t = () => {
			let t = e.getBoundingClientRect(), n = {
				top: x === "anchor" ? Math.max(t.top, b) : 0,
				left: t.left,
				width: t.width
			};
			k((e) => e && e.top === n.top && e.left === n.left && e.width === n.width ? e : n);
		};
		t();
		let n = "ResizeObserver" in window ? new ResizeObserver(t) : null;
		return n?.observe(e), window.addEventListener("resize", t), window.addEventListener("scroll", t, !0), () => {
			n?.disconnect(), window.removeEventListener("resize", t), window.removeEventListener("scroll", t, !0);
		};
	}, [
		D,
		b,
		x
	]), o.useLayoutEffect(() => {
		if (!D || x === "viewport-bottom") {
			j(null);
			return;
		}
		let e = E.current;
		if (!e) return;
		let t = () => {
			let t = Math.ceil(e.getBoundingClientRect().height);
			j((e) => e === t ? e : t);
		};
		t();
		let n = "ResizeObserver" in window ? new ResizeObserver(t) : null;
		return n?.observe(e), window.addEventListener("resize", t), () => {
			n?.disconnect(), window.removeEventListener("resize", t);
		};
	}, [
		O?.width,
		D,
		x
	]), /* @__PURE__ */ l("div", {
		ref: T,
		className: e("min-h-10", S),
		style: D && A && x === "anchor" ? { minHeight: A } : void 0,
		children: [D && O ? /* @__PURE__ */ l("div", {
			ref: E,
			className: e("fixed z-30 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-background px-2 py-1 shadow-lg backdrop-blur", C),
			style: {
				left: O.left,
				width: O.width,
				...x === "viewport-bottom" ? { bottom: "calc(1rem + var(--app-safe-area-bottom, 0px))" } : { top: O.top }
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
				className: e("flex flex-wrap items-center justify-end gap-2", w),
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
		}) : null, !D || x === "viewport-bottom" ? v : null]
	});
}
//#endregion
export { u as SelectionActionBar };
