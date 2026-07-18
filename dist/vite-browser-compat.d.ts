import type { Plugin } from 'vite';
import { type CssCompatibilityPluginOptions } from './vite-css-compat';
export { DEFAULT_CSS_COMPATIBILITY_BROWSERS, applyCssCompatibilityToBundle, createCssCompatibilityPlugin, normalizeBrowserCompatibleCss, transformCssForBrowserCompatibility, } from './vite-css-compat';
export { SENLER_BROWSER_COMPATIBILITY_BROWSERS, SENLER_JS_COMPATIBILITY_TARGET, } from './browser-support';
export type { CssCompatibilityBundle, CssCompatibilityPluginOptions, } from './vite-css-compat';
export interface BrowserCompatibilityPluginOptions {
    css?: CssCompatibilityPluginOptions;
    dependencySyntaxPatches?: boolean;
}
export declare const createDependencySyntaxCompatibilityPlugin: () => Plugin;
export declare const createBrowserCompatibilityPlugins: (options?: BrowserCompatibilityPluginOptions) => Plugin[];
export declare const SENLER_VITE_BROWSER_COMPATIBILITY: {
    readonly browsers: readonly ["last 2 Chrome versions", "last 2 Edge versions", "last 2 Firefox versions", "last 2 Safari versions", "ios_saf >= 15.4", "safari >= 15.4", "not dead"];
    readonly jsTarget: "es2020";
    readonly createPlugins: (options?: BrowserCompatibilityPluginOptions) => Plugin[];
};
