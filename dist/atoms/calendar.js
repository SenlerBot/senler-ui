import { cn as e } from "../lib/utils/cn.js";
import { Button as t, buttonVariants as n } from "./button.js";
import * as r from "react";
import { ChevronDownIcon as i, ChevronLeftIcon as a, ChevronRightIcon as o } from "lucide-react";
import { jsx as s } from "react/jsx-runtime";
import { DayPicker as c, getDefaultClassNames as l } from "react-day-picker";
import { ru as u } from "react-day-picker/locale";
//#region src/atoms/calendar.tsx
function d(e) {
	return e?.code ?? "ru-RU";
}
function f({ className: t, classNames: r, showOutsideDays: f = !0, captionLayout: m = "label", buttonVariant: h = "outline", formatters: g, components: _, locale: v = u, ...y }) {
	let b = l();
	return /* @__PURE__ */ s(c, {
		locale: v,
		showOutsideDays: f,
		className: e("bg-card group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, t),
		captionLayout: m,
		formatters: {
			formatMonthDropdown: (e) => e.toLocaleString(d(v), { month: "short" }),
			...g
		},
		classNames: {
			root: e("w-fit", b.root),
			months: e("relative flex flex-col gap-4 font-medium capitalize md:flex-row", b.months),
			month: e("flex w-full flex-col gap-4", b.month),
			nav: e("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", b.nav),
			button_previous: e(n({ variant: h }), "size-(--cell-size) select-none p-0 aria-disabled:opacity-50", b.button_previous),
			button_next: e(n({ variant: h }), "size-(--cell-size) select-none p-0 aria-disabled:opacity-50", b.button_next),
			month_caption: e("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", b.month_caption),
			dropdowns: e("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", b.dropdowns),
			dropdown_root: e("relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50", b.dropdown_root),
			dropdown: e("absolute inset-0 bg-popover opacity-0", b.dropdown),
			caption_label: e("select-none font-medium", m === "label" ? "text-sm" : "flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground", b.caption_label),
			table: "w-full border-collapse",
			weekdays: e("flex", b.weekdays),
			weekday: e("flex-1 select-none rounded-md text-[0.8rem] font-normal text-muted-foreground", b.weekday),
			week: e("mt-2 flex w-full", b.week),
			week_number_header: e("w-(--cell-size) select-none", b.week_number_header),
			week_number: e("select-none text-[0.8rem] text-muted-foreground", b.week_number),
			day: e("group/day relative aspect-square h-full w-full select-none p-0 text-center font-medium [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", b.day),
			range_start: e("rounded-l-md bg-accent", b.range_start),
			range_middle: e("rounded-none", b.range_middle),
			range_end: e("rounded-r-md bg-accent", b.range_end),
			today: e("rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none", b.today),
			outside: e("text-muted-foreground aria-selected:text-muted-foreground", b.outside),
			disabled: e("text-muted-foreground opacity-50", b.disabled),
			hidden: e("invisible", b.hidden),
			...r
		},
		components: {
			Root: ({ className: t, rootRef: n, ...r }) => /* @__PURE__ */ s("div", {
				"data-slot": "calendar",
				ref: n,
				className: e(t),
				...r
			}),
			Chevron: ({ className: t, orientation: n, ...r }) => s(n === "left" ? a : n === "right" ? o : i, {
				className: e("size-4", t),
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
function p({ className: n, day: i, modifiers: a, ...o }) {
	let c = l(), u = r.useRef(null);
	return r.useEffect(() => {
		a.focused && u.current?.focus();
	}, [a.focused]), /* @__PURE__ */ s(t, {
		ref: u,
		variant: "ghost",
		size: "icon",
		"data-day": i.date.toLocaleDateString(),
		"data-selected-single": a.selected && !a.range_start && !a.range_end && !a.range_middle,
		"data-range-start": a.range_start,
		"data-range-end": a.range_end,
		"data-range-middle": a.range_middle,
		className: e("flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-accent data-[range-end=true]:text-accent-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent/50 data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-accent data-[range-start=true]:text-accent-foreground data-[selected-single=true]:bg-accent data-[selected-single=true]:text-accent-foreground dark:hover:text-accent-foreground group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 [&>span]:text-xs [&>span]:opacity-70", c.day, n),
		...o
	});
}
//#endregion
export { f as Calendar, p as CalendarDayButton };
