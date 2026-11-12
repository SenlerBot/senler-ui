import type { Plugin } from 'vite';
export declare const DEFAULT_CSS_COMPATIBILITY_BROWSERS: ("ios_saf >= 15.4" | "last 2 Chrome versions" | "last 2 Edge versions" | "last 2 Firefox versions" | "last 2 Safari versions" | "not dead" | "safari >= 15.4")[];
export interface CssCompatibilityPluginOptions {
    browsers?: string[];
}
type CssCompatibilityAsset = {
    type: 'asset';
    name?: string;
    fileName: string;
    source: string | Uint8Array;
};
type CssCompatibilityChunk = {
    type: 'chunk';
    fileName: string;
    code: string;
    viteMetadata?: {
        importedAssets?: Set<string>;
        importedCss?: Set<string>;
    };
};
export type CssCompatibilityBundle = Record<string, CssCompatibilityAsset | CssCompatibilityChunk>;
export declare const normalizeBrowserCompatibleCss: (css: string) => string;
export declare const resolveCssCompatibilityBrowsers: (options?: CssCompatibilityPluginOptions) => string[];
export declare const transformCssForBrowserCompatibility: (css: string, fileName: string, options?: CssCompatibilityPluginOptions, minify?: boolean) => string;
export declare const applyCssCompatibilityToBundle: (bundle: CssCompatibilityBundle, options?: CssCompatibilityPluginOptions) => void;
export declare const createCssCompatibilityPlugin: (options?: CssCompatibilityPluginOptions) => Plugin;
export {};
