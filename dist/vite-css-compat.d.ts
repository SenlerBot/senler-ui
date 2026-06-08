import type { Plugin } from 'vite';
export declare const DEFAULT_CSS_COMPATIBILITY_BROWSERS: string[];
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
};
export type CssCompatibilityBundle = Record<string, CssCompatibilityAsset | CssCompatibilityChunk>;
export declare const normalizeBrowserCompatibleCss: (css: string) => string;
export declare const applyCssCompatibilityToBundle: (bundle: CssCompatibilityBundle, options?: CssCompatibilityPluginOptions) => void;
export declare const createCssCompatibilityPlugin: (options?: CssCompatibilityPluginOptions) => Plugin;
export {};
