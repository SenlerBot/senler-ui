import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';

const FALLBACK_APP_VERSION = 'dev';

function normalizeValue(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function padVersionPart(value: number): string {
  return String(value).padStart(2, '0');
}

function formatUtcVersionFromEpochSeconds(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const epochSeconds = Number.parseInt(value, 10);
  if (!Number.isFinite(epochSeconds) || epochSeconds <= 0) {
    return null;
  }

  const date = new Date(epochSeconds * 1000);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return [
    date.getUTCFullYear(),
    padVersionPart(date.getUTCMonth() + 1),
    padVersionPart(date.getUTCDate()),
    `${padVersionPart(date.getUTCHours())}${padVersionPart(date.getUTCMinutes())}${padVersionPart(date.getUTCSeconds())}`,
  ].join('.');
}

function readGitCommitTimestamp(cwd: string): string | null {
  try {
    return normalizeValue(
      execFileSync('git', ['log', '-1', '--format=%ct'], {
        cwd,
        env: {
          ...process.env,
          GIT_OPTIONAL_LOCKS: '0',
        },
        stdio: ['ignore', 'pipe', 'ignore'],
      }).toString('utf8'),
    );
  } catch {
    return null;
  }
}

function resolvePackageVersion(cwd: string): string | null {
  try {
    const packageJson: unknown = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8'));
    if (
      typeof packageJson !== 'object' ||
      packageJson === null ||
      Array.isArray(packageJson) ||
      !('version' in packageJson)
    ) {
      return null;
    }

    return normalizeValue(packageJson.version);
  } catch {
    return null;
  }
}

export function resolveAppVersion(
  env: Record<string, string | undefined>,
  cwd = process.cwd(),
): string {
  return (
    normalizeValue(env.VITE_APP_VERSION) ??
    normalizeValue(process.env.VITE_APP_VERSION) ??
    formatUtcVersionFromEpochSeconds(readGitCommitTimestamp(cwd)) ??
    resolvePackageVersion(cwd) ??
    FALLBACK_APP_VERSION
  );
}

function normalizeBasePath(basePath: string): string {
  if (!basePath || basePath === '/') {
    return '';
  }

  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

export function createVersionManifestPlugin(
  version: string,
  release = '',
  basePath = '/',
): Plugin {
  const payload = JSON.stringify(
    {
      version,
      ...(release ? { release } : {}),
    },
    null,
    2,
  );
  const normalizedBasePath = normalizeBasePath(basePath);
  const allowedPaths = new Set(['/version.json']);

  if (normalizedBasePath) {
    allowedPaths.add(`${normalizedBasePath}/version.json`);
  }

  return {
    name: 'senler-frontend-version-manifest',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const requestPath = request.url?.split('?')[0] ?? '';
        if (!allowedPaths.has(requestPath)) {
          next();
          return;
        }

        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        response.setHeader('Cache-Control', 'no-store');
        response.end(payload);
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: payload,
      });
    },
  };
}
