import { AlertDialog as e, AlertDialogAction as t, AlertDialogCancel as n, AlertDialogContent as r, AlertDialogDescription as i, AlertDialogFooter as a, AlertDialogHeader as o, AlertDialogTitle as s } from "../atoms/alert-dialog.js";
import { ArrowRight as c, RefreshCw as l, Sparkles as u } from "lucide-react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/compound/frontend-update-prompt.tsx
function p({ open: p, currentVersion: m, latestVersion: h, labels: g, onRemindLater: _, onRefresh: v }) {
	return /* @__PURE__ */ d(e, {
		open: p,
		onOpenChange: (e) => {
			e || _();
		},
		children: /* @__PURE__ */ f(r, {
			className: "overflow-hidden p-0 sm:max-w-md",
			children: [/* @__PURE__ */ f("div", {
				className: "bg-gradient-to-br from-primary/15 via-background to-background px-6 pt-6",
				children: [
					/* @__PURE__ */ d("div", {
						className: "mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20",
						children: /* @__PURE__ */ d(u, {
							className: "size-6",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ f(o, {
						className: "text-left",
						children: [/* @__PURE__ */ d(s, {
							className: "text-xl",
							children: g.title
						}), /* @__PURE__ */ d(i, {
							className: "text-sm leading-6",
							children: g.description
						})]
					}),
					/* @__PURE__ */ f("div", {
						className: "my-5 flex items-center gap-3 rounded-xl border border-border/70 bg-background/80 p-3 shadow-sm backdrop-blur",
						children: [
							/* @__PURE__ */ f("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ d("div", {
									className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
									children: g.currentVersion
								}), /* @__PURE__ */ d("div", {
									className: "truncate font-mono text-xs text-foreground",
									children: m
								})]
							}),
							/* @__PURE__ */ d(c, {
								className: "size-4 shrink-0 text-primary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ f("div", {
								className: "min-w-0 flex-1 text-right",
								children: [/* @__PURE__ */ d("div", {
									className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
									children: g.latestVersion
								}), /* @__PURE__ */ d("div", {
									className: "truncate font-mono text-xs text-foreground",
									children: h ?? "—"
								})]
							})
						]
					})
				]
			}), /* @__PURE__ */ f(a, {
				className: "border-t border-border bg-muted/30 px-6 py-4 sm:justify-between",
				children: [/* @__PURE__ */ d(n, {
					onClick: _,
					children: g.remindLater
				}), /* @__PURE__ */ f(t, {
					onClick: v,
					className: "gap-2",
					children: [/* @__PURE__ */ d(l, {
						className: "size-4",
						"aria-hidden": "true"
					}), g.refresh]
				})]
			})]
		})
	});
}
//#endregion
export { p as FrontendUpdatePrompt };
