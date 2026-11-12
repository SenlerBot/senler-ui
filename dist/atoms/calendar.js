import { Button as e, buttonVariants as t } from "./button.js";
import { cn as n } from "../lib/utils/cn.js";
import * as r from "react";
import { ChevronDownIcon as i, ChevronLeftIcon as a, ChevronRightIcon as o } from "lucide-react";
import { jsx as s } from "react/jsx-runtime";
import { DayPicker as c, getDefaultClassNames as l } from "react-day-picker";
import { ru as u } from "react-day-picker/locale";
// src/atoms/calendar.tsx
function d(e) {
	return e?.code ?? "ru-RU";
}
function f({ className: e, classNames: r, showOutsideDays: f = !0, captionLayout: m = "label", buttonVariant: h = "outline", formatters: g, components: _, locale: v = u, ...y }) {
	let b = l();
	return /* @__PURE__ */ s(c, {
		locale: v,
		showOutsideDays: f,
		className: n("bg-card group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, e),
		captionLayout: m,
		formatters: {
			formatMonthDropdown: (e) => e.toLocaleString(d(v), { month: "short" }),
			...g
		},
		classNames: {
			root: n("w-fit", b.root),
			months: n("relative flex flex-col gap-4 font-medium capitalize md:flex-row", b.months),
			month: n("flex w-full flex-col gap-4", b.month),
			nav: n("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", b.nav),
			button_previous: n(t({ variant: h }), "size-(--cell-size) select-none p-0 aria-disabled:opacity-50", b.button_previous),
			button_next: n(t({ variant: h }), "size-(--cell-size) select-none p-0 aria-disabled:opacity-50", b.button_next),
			month_caption: n("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", b.month_caption),
			dropdowns: n("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", b.dropdowns),
			dropdown_root: n("relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50", b.dropdown_root),
			dropdown: n("absolute inset-0 bg-popover opacity-0", b.dropdown),
			caption_label: n("select-none font-medium", m === "label" ? "text-sm" : "flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground", b.caption_label),
			month_grid: n("w-full border-collapse", b.month_grid),
			weekdays: n("flex", b.weekdays),
			weekday: n("flex-1 select-none rounded-md text-[0.8rem] font-normal text-muted-foreground", b.weekday),
			week: n("mt-2 flex w-full", b.week),
			week_number_header: n("w-(--cell-size) select-none", b.week_number_header),
			week_number: n("select-none text-[0.8rem] text-muted-foreground", b.week_number),
			day: n("group/day relative aspect-square h-full w-full select-none p-0 text-center font-medium [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", b.day),
			range_start: n("rounded-l-md bg-accent", b.range_start),
			range_middle: n("rounded-none", b.range_middle),
			range_end: n("rounded-r-md bg-accent", b.range_end),
			today: n("rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none", b.today),
			outside: n("text-muted-foreground aria-selected:text-muted-foreground", b.outside),
			disabled: n("text-muted-foreground opacity-50", b.disabled),
			hidden: n("invisible", b.hidden),
			...r
		},
		components: {
			Root: ({ className: e, rootRef: t, ...r }) => /* @__PURE__ */ s("div", {
				"data-slot": "calendar",
				ref: t,
				className: n(e),
				...r
			}),
			Chevron: ({ className: e, orientation: t, ...r }) => s(t === "left" ? a : t === "right" ? o : i, {
				className: n("size-4", e),
				...r
			}),
			DayButton: p,
			WeekNumber: ({ children: e, ...t }) => /* @__PURE__ */ s("td", {
				...t,
				children: /* @__PURE__ */ s("div", {
					className: "flex size-(--cell-size) items-center justify-center text-center",
					children: e
				})
			}),
			..._
		},
		...y
	});
}
function p({ className: t, day: i, modifiers: a, ...o }) {
	let c = l(), u = r.useRef(null);
	return r.useEffect(() => {
		a.focused && u.current?.focus();
	}, [a.focused]), /* @__PURE__ */ s(e, {
		ref: u,
		variant: "ghost",
		size: "icon",
		"data-day": i.date.toLocaleDateString(),
		"data-selected-single": a.selected && !a.range_start && !a.range_end && !a.range_middle,
		"data-range-start": a.range_start,
		"data-range-end": a.range_end,
		"data-range-middle": a.range_middle,
		className: n("flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-accent data-[range-end=true]:text-accent-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent/50 data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-accent data-[range-start=true]:text-accent-foreground data-[selected-single=true]:bg-accent data-[selected-single=true]:text-accent-foreground dark:hover:text-accent-foreground group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 [&>span]:text-xs [&>span]:opacity-70", c.day, t),
		...o
	});
}
export { f as Calendar, p as CalendarDayButton };
