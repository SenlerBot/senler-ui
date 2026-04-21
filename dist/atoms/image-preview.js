import { cn as e } from "../lib/utils/cn.js";
import { Img as t } from "./image.js";
import * as n from "react";
import { ImageIcon as r } from "lucide-react";
import { jsx as i } from "react/jsx-runtime";
import { cva as a } from "class-variance-authority";
//#region src/atoms/image-preview.tsx
var o = a("flex justify-center items-center overflow-hidden bg-muted border border-border rounded-md", {
	variants: { variant: {
		banner: "min-h-[140px] w-full",
		icon: "w-20 h-20"
	} },
	defaultVariants: { variant: "banner" }
}), s = n.forwardRef(({ className: n, variant: a, src: s, ...c }, l) => /* @__PURE__ */ i("div", {
	ref: l,
	className: e(o({
		variant: a,
		className: n
	})),
	...c,
	children: s ? /* @__PURE__ */ i(t, {
		src: s,
		className: "h-full w-full object-cover",
		alt: "Preview"
	}) : /* @__PURE__ */ i(r, { className: "h-6 w-6 text-muted-foreground" })
}));
s.displayName = "ImagePreview";
//#endregion
export { s as ImagePreview, o as imagePreviewVariants };
