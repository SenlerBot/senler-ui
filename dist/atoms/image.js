import { cn as e } from "../lib/utils/cn.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
// src/atoms/image.tsx
var n = ({ className: n, alt: r, ...i }) => /* @__PURE__ */ t("img", {
	alt: r ?? "image",
	className: e("max-w-full", n),
	...i
});
export { n as Img };
