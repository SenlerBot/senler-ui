import { SENLER_BROWSER_COMPATIBILITY_BROWSERS as e, SENLER_JS_COMPATIBILITY_TARGET as t } from "./browser-support.js";
import { ByteLengthQueuingStrategy as n, CountQueuingStrategy as r, ReadableStream as i, TransformStream as a, WritableStream as o } from "web-streams-polyfill";
//#region src/browser-compat.ts
var s = (e, t) => {
	Reflect.has(globalThis, e) || Reflect.defineProperty(globalThis, e, {
		value: t,
		configurable: !0,
		writable: !0
	});
}, c = (e) => {
	if (!e) throw Error("TransformStream controller is not ready");
	return e;
}, l = class {
	readable;
	writable;
	constructor(e = {}) {
		let t = null, n = Promise.resolve();
		this.readable = new ReadableStream({ start(n) {
			if (t = n, e.start) return e.start(n);
		} }), this.writable = new WritableStream({
			write(r) {
				return n = n.then(() => {
					let n = c(t);
					if (e.transform) return e.transform(r, n);
					n.enqueue(r);
				}), n;
			},
			close() {
				return n.then(() => {
					let n = c(t);
					if (e.flush) return Promise.resolve(e.flush(n)).then(() => {
						n.close();
					});
					n.close();
				});
			},
			abort(e) {
				c(t).error(e);
			}
		});
	}
}, u = class {
	encoding = "utf-8";
	readable;
	writable;
	constructor() {
		let e = new TextEncoder(), t = new TransformStream({ transform(t, n) {
			n.enqueue(e.encode(String(t)));
		} });
		this.readable = t.readable, this.writable = t.writable;
	}
}, d = class {
	encoding;
	fatal;
	ignoreBOM;
	readable;
	writable;
	constructor(e, t) {
		let n = new TextDecoder(e, t), r = new TransformStream({
			transform(e, t) {
				t.enqueue(n.decode(e, { stream: !0 }));
			},
			flush(e) {
				let t = n.decode();
				t && e.enqueue(t);
			}
		});
		this.encoding = n.encoding, this.fatal = n.fatal, this.ignoreBOM = n.ignoreBOM, this.readable = r.readable, this.writable = r.writable;
	}
}, f = () => {
	s("ReadableStream", i), s("WritableStream", o), s("ByteLengthQueuingStrategy", n), s("CountQueuingStrategy", r), s("TransformStream", Reflect.has(globalThis, "ReadableStream") && Reflect.has(globalThis, "WritableStream") ? l : a), Reflect.has(globalThis, "TextEncoder") && s("TextEncoderStream", u), Reflect.has(globalThis, "TextDecoder") && s("TextDecoderStream", d);
};
f();
//#endregion
export { e as SENLER_BROWSER_COMPATIBILITY_BROWSERS, t as SENLER_JS_COMPATIBILITY_TARGET, f as installBrowserCompatibilityPolyfills };
