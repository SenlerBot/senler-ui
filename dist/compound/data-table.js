import { CheckBox as e } from "../atoms/checkbox.js";
import { Table as t, TableBody as n, TableCell as r, TableContainer as i, TableHead as a, TableHeadCell as o, TableRow as s } from "../atoms/table.js";
import { cn as c } from "../lib/utils/cn.js";
import * as l from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
// src/compound/data-table.tsx
function f(e, t, n) {
	return typeof e == "function" ? e(t, n) : e;
}
function p({ items: p, columns: m, getItemId: h, selection: g, onRowClick: _, isRowInteractive: v, getRowDataAttributes: y, containerClassName: b, tableClassName: x, headClassName: S, bodyClassName: C, rowClassName: w, selectedRowClassName: T = "[&_td]:bg-primary/5", selectionHeadCellClassName: E, selectionCellClassName: D }) {
	let O = m.some((e) => e.truncate === !0), k = g !== void 0, A = k && (g?.selectedIds.length ?? 0) > 0, j = l.useMemo(() => new Set(g?.selectedIds ?? []), [g?.selectedIds]), M = l.useMemo(() => g ? p.filter((e) => g.isRowSelectable?.(e) ?? !0).map(h) : [], [
		h,
		p,
		g
	]), N = M.filter((e) => j.has(e)), P = M.length > 0 && N.length === M.length || N.length > 0 && "indeterminate", F = P === !0 && g?.deselectAllLabel ? g.deselectAllLabel : g?.selectAllLabel, I = (e) => {
		g?.onSelectedIdsChange(e);
	}, L = (e) => {
		if (!g) return;
		if (e === !0) {
			let e = [...g.selectedIds];
			for (let t of M) e.includes(t) || e.push(t);
			I(e);
			return;
		}
		let t = new Set(M);
		I(g.selectedIds.filter((e) => !t.has(e)));
	}, R = (e, t) => {
		if (!g) return;
		let n = h(e);
		if (t) {
			if (g.selectedIds.includes(n)) return;
			I([...g.selectedIds, n]);
		} else I(g.selectedIds.filter((e) => e !== n));
	}, z = (e, t, n, r) => {
		n && t.isSelectionMode ? R(e, !t.isSelected) : r && _?.(e);
	};
	return /* @__PURE__ */ u(i, {
		className: c("min-w-0 max-w-full bg-transparent", b),
		children: /* @__PURE__ */ d(t, {
			className: c("border-separate border-spacing-y-0", O ? "table-fixed" : "table-auto", x),
			children: [/* @__PURE__ */ u(a, {
				className: c("hidden sm:table-header-group", S),
				children: /* @__PURE__ */ d(s, { children: [k ? /* @__PURE__ */ u(o, {
					className: c("w-10 border-0 px-2 py-1 sm:px-3", E),
					children: /* @__PURE__ */ u(e, {
						checked: P,
						disabled: M.length === 0,
						onCheckedChange: L,
						"aria-label": F,
						title: F
					})
				}) : null, m.map((e) => /* @__PURE__ */ u(o, {
					className: c("border-0 px-3 py-1 text-xs font-medium text-muted-foreground", e.truncate && "min-w-0 max-w-0 overflow-hidden", e.headClassName),
					children: e.header
				}, e.id))] })
			}), /* @__PURE__ */ u(n, {
				className: C,
				children: p.map((t) => {
					let n = h(t), i = g !== void 0 && (g.isRowSelectable?.(t) ?? !0), a = i && j.has(n), o = {
						item: t,
						itemId: n,
						isSelected: a,
						isSelectionEnabled: k,
						isSelectionMode: A
					}, l = _ !== void 0 && (v?.(t) ?? !0), p = l || i && A;
					return /* @__PURE__ */ d(s, {
						className: c("group transition-colors", f(w, t, o), a && T),
						tabIndex: p ? 0 : void 0,
						role: p ? "button" : void 0,
						onClick: () => z(t, o, i, l),
						onKeyDown: (e) => {
							e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), z(t, o, i, l));
						},
						...y?.(t),
						children: [k ? /* @__PURE__ */ u(r, {
							className: c("w-10 rounded-l-xl border-0 bg-card px-2 py-2 group-hover:bg-muted/50 sm:px-3 sm:py-3", f(D, t, o)),
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ u(e, {
								checked: a,
								disabled: !i,
								onCheckedChange: (e) => R(t, e === !0),
								"aria-label": g.getRowLabel(t),
								title: g.getRowLabel(t)
							})
						}) : null, m.map((e, n) => /* @__PURE__ */ u(r, {
							className: c("border-0 bg-card px-2 py-2 group-hover:bg-muted/50 sm:px-3 sm:py-3", e.truncate && "min-w-0 max-w-0 overflow-hidden", !k && n === 0 && "rounded-l-xl", n === m.length - 1 && "rounded-r-xl", f(e.cellClassName, t, o)),
							onClick: e.preventRowClick ? (e) => e.stopPropagation() : void 0,
							children: e.cell(t, o)
						}, e.id))]
					}, n);
				})
			})]
		})
	});
}
export { p as DataTable };
