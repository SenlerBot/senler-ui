// src/lib/literal-keys.ts
function e(e) {
	return Object.keys(e).filter((t) => t in e);
}
export { e as literalKeys };
