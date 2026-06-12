import type { Plugin } from 'vite'
import { SENLER_BROWSER_COMPATIBILITY_BROWSERS, SENLER_JS_COMPATIBILITY_TARGET } from './browser-support'
import { createCssCompatibilityPlugin, type CssCompatibilityPluginOptions } from './vite-css-compat'

export {
  DEFAULT_CSS_COMPATIBILITY_BROWSERS,
  applyCssCompatibilityToBundle,
  createCssCompatibilityPlugin,
  normalizeBrowserCompatibleCss,
  transformCssForBrowserCompatibility,
} from './vite-css-compat'
export {
  SENLER_BROWSER_COMPATIBILITY_BROWSERS,
  SENLER_JS_COMPATIBILITY_TARGET,
} from './browser-support'
export type {
  CssCompatibilityBundle,
  CssCompatibilityPluginOptions,
} from './vite-css-compat'

export interface BrowserCompatibilityPluginOptions {
  css?: CssCompatibilityPluginOptions
  dependencySyntaxPatches?: boolean
}

const patchSafariIncompatibleDependencySyntax = (code: string, id: string) => {
  if (id.includes('mdast-util-gfm-autolink-literal')) {
    return code.split('(?<=^|\\s|\\p{P}|\\p{S})').join('')
  }

  if (id.includes('@lexical/markdown')) {
    return code.replace(/\(\?<([=!])[^)]*\)/g, '')
  }

  return code
}

export const createDependencySyntaxCompatibilityPlugin = (): Plugin => ({
  name: 'dependency-syntax-compatibility',
  enforce: 'pre',
  transform(code, id) {
    const transformed = patchSafariIncompatibleDependencySyntax(code, id)

    if (transformed === code) {
      return null
    }

    return {
      code: transformed,
      map: null,
    }
  },
})

export const createBrowserCompatibilityPlugins = (
  options: BrowserCompatibilityPluginOptions = {},
): Plugin[] => {
  const plugins = [createCssCompatibilityPlugin(options.css)]

  if (options.dependencySyntaxPatches !== false) {
    plugins.unshift(createDependencySyntaxCompatibilityPlugin())
  }

  return plugins
}

export const SENLER_VITE_BROWSER_COMPATIBILITY = {
  browsers: SENLER_BROWSER_COMPATIBILITY_BROWSERS,
  jsTarget: SENLER_JS_COMPATIBILITY_TARGET,
  createPlugins: createBrowserCompatibilityPlugins,
} as const
