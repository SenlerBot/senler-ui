import { cn as e } from "../lib/utils/cn.js";
import * as t from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/atoms/progress.tsx
var r = t.forwardRef(({ className: t, value: r = 0, max: i = 100, indicatorClassName: a, ...o }, s) => {
	let c = Math.min(100, Math.max(0, r / i * 100));
	return /* @__PURE__ */ n("div", {
		ref: s,
		className: e("relative h-4 w-full overflow-hidden rounded-full bg-secondary", t),
		...o,
		children: /* @__PURE__ */ n("div", {
			className: e("h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out", a),
			style: { transform: `translateX(-${100 - c}%)` }
		})
	});
});
r.displayName = "Progress";
//#endregion
export { r as Progress };
