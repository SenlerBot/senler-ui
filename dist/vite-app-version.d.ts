import type { Plugin } from 'vite';
export declare function resolveAppVersion(env: Record<string, string | undefined>, cwd?: string): string;
export declare function createVersionManifestPlugin(version: string, release?: string, basePath?: string): Plugin;
