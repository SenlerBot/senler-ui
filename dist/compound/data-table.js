import { cn as e } from "../lib/utils/cn.js";
import { CheckBox as t } from "../atoms/checkbox.js";
import { Table as n, TableBody as r, TableCell as i, TableContainer as a, TableHead as o, TableHeadCell as s, TableRow as c } from "../atoms/table.js";
import * as l from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/compound/data-table.tsx
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
			return;
		}
		I(g.selectedIds.filter((e) => e !== n));
	}, z = (e, t, n, r) => {
		if (n && t.isSelectionMode) {
			R(e, !t.isSelected);
			return;
		}
		r && _?.(e);
	};
	return /* @__PURE__ */ u(a, {
		className: e("min-w-0 max-w-full bg-transparent", b),
		children: /* @__PURE__ */ d(n, {
			className: e("border-separate border-spacing-y-0", O ? "table-fixed" : "table-auto", x),
			children: [/* @__PURE__ */ u(o, {
				className: e("hidden sm:table-header-group", S),
				children: /* @__PURE__ */ d(c, { children: [k ? /* @__PURE__ */ u(s, {
					className: e("w-10 border-0 px-2 py-1 sm:px-3", E),
					children: /* @__PURE__ */ u(t, {
						checked: P,
						disabled: M.length === 0,
						onCheckedChange: L,
						"aria-label": F,
						title: F
					})
				}) : null, m.map((t) => /* @__PURE__ */ u(s, {
					className: e("border-0 px-3 py-1 text-xs font-medium text-muted-foreground", t.truncate && "min-w-0 max-w-0 overflow-hidden", t.headClassName),
					children: t.header
				}, t.id))] })
			}), /* @__PURE__ */ u(r, {
				className: C,
				children: p.map((n) => {
					let r = h(n), a = g !== void 0 && (g.isRowSelectable?.(n) ?? !0), o = a && j.has(r), s = {
						item: n,
						itemId: r,
						isSelected: o,
						isSelectionEnabled: k,
						isSelectionMode: A
					}, l = _ !== void 0 && (v?.(n) ?? !0), p = l || a && A;
					return /* @__PURE__ */ d(c, {
						className: e("group transition-colors", f(w, n, s), o && T),
						tabIndex: p ? 0 : void 0,
						role: p ? "button" : void 0,
						onClick: () => z(n, s, a, l),
						onKeyDown: (e) => {
							e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), z(n, s, a, l));
						},
						...y?.(n),
						children: [k ? /* @__PURE__ */ u(i, {
							className: e("w-10 rounded-l-xl border-0 bg-card px-2 py-2 group-hover:bg-muted/50 sm:px-3 sm:py-3", f(D, n, s)),
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ u(t, {
								checked: o,
								disabled: !a,
								onCheckedChange: (e) => R(n, e === !0),
								"aria-label": g.getRowLabel(n),
								title: g.getRowLabel(n)
							})
						}) : null, m.map((t, r) => /* @__PURE__ */ u(i, {
							className: e("border-0 bg-card px-2 py-2 group-hover:bg-muted/50 sm:px-3 sm:py-3", t.truncate && "min-w-0 max-w-0 overflow-hidden", !k && r === 0 && "rounded-l-xl", r === m.length - 1 && "rounded-r-xl", f(t.cellClassName, n, s)),
							onClick: t.preventRowClick ? (e) => e.stopPropagation() : void 0,
							children: t.cell(n, s)
						}, t.id))]
					}, r);
				})
			})]
		})
	});
}
//#endregion
export { p as DataTable };
