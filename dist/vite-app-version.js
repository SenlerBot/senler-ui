import { execFileSync as e } from "node:child_process";
import { readFileSync as t } from "node:fs";
import { join as n } from "node:path";
//#region src/vite-app-version.ts
var r = "dev";
function i(e) {
	return typeof e == "string" && e.trim() ? e.trim() : null;
}
function a(e) {
	return String(e).padStart(2, "0");
}
function o(e) {
	if (!e) return null;
	let t = Number.parseInt(e, 10);
	if (!Number.isFinite(t) || t <= 0) return null;
	let n = /* @__PURE__ */ new Date(t * 1e3);
	return Number.isNaN(n.getTime()) ? null : [
		n.getUTCFullYear(),
		a(n.getUTCMonth() + 1),
		a(n.getUTCDate()),
		`${a(n.getUTCHours())}${a(n.getUTCMinutes())}${a(n.getUTCSeconds())}`
	].join(".");
}
function s(t) {
	try {
		return i(e("git", [
			"log",
			"-1",
			"--format=%ct"
		], {
			cwd: t,
			env: {
				...process.env,
				GIT_OPTIONAL_LOCKS: "0"
			},
			stdio: [
				"ignore",
				"pipe",
				"ignore"
			]
		}).toString("utf8"));
	} catch {
		return null;
	}
}
function c(e) {
	try {
		let r = JSON.parse(t(n(e, "package.json"), "utf8"));
		return typeof r != "object" || !r || Array.isArray(r) || !("version" in r) ? null : i(r.version);
	} catch {
		return null;
	}
}
function l(e, t = process.cwd()) {
	return i(e.VITE_APP_VERSION) ?? i(process.env.VITE_APP_VERSION) ?? o(s(t)) ?? c(t) ?? r;
}
function u(e) {
	if (!e || e === "/") return "";
	let t = e.startsWith("/") ? e : `/${e}`;
	return t.endsWith("/") ? t.slice(0, -1) : t;
}
function d(e, t = "", n = "/") {
	let r = JSON.stringify({
		version: e,
		...t ? { release: t } : {}
	}, null, 2), i = u(n), a = /* @__PURE__ */ new Set(["/version.json"]);
	return i && a.add(`${i}/version.json`), {
		name: "senler-frontend-version-manifest",
		configureServer(e) {
			e.middlewares.use((e, t, n) => {
				let i = e.url?.split("?")[0] ?? "";
				if (!a.has(i)) {
					n();
					return;
				}
				t.setHeader("Content-Type", "application/json; charset=utf-8"), t.setHeader("Cache-Control", "no-store"), t.end(r);
			});
		},
		generateBundle() {
			this.emitFile({
				type: "asset",
				fileName: "version.json",
				source: r
			});
		}
	};
}
//#endregion
export { d as createVersionManifestPlugin, l as resolveAppVersion };
