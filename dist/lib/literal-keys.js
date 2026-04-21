//#region src/lib/literal-keys.ts
function e(e) {
	return Object.keys(e).filter((t) => t in e);
}
//#endregion
export { e as literalKeys };
