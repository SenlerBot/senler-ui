import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';

const DEFAULT_SYNC_INTERVAL_MS = 60_000;
export const FRONTEND_UPDATE_PROMPT_COOLDOWN_MS = 3 * 60 * 60 * 1000;

export type FrontendReleaseState = 'unknown' | 'current' | 'outdated';

export interface FrontendReleaseManifest {
  version: string;
  release: string | null;
}

export interface FrontendReleaseConfiguration {
  appName: string;
  currentVersion: string;
  currentRelease: string | null;
  manifestUrl: string;
}

export interface FrontendReleaseSnapshot {
  appName: string;
  currentVersion: string;
  currentRelease: string | null;
  latestVersion: string | null;
  latestRelease: string | null;
  state: FrontendReleaseState;
  checkedAt: number | null;
}

interface StoredPromptState {
  hiddenUntil: number;
}

let configuration: FrontendReleaseConfiguration | null = null;
let snapshot: FrontendReleaseSnapshot = createEmptySnapshot();
let syncPromise: Promise<FrontendReleaseSnapshot> | null = null;
const listeners = new Set<() => void>();
const inMemoryPromptHiddenUntil = new Map<string, number>();

function normalizeValue(value: string | null | undefined): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function createEmptySnapshot(
  nextConfiguration: FrontendReleaseConfiguration | null = configuration,
): FrontendReleaseSnapshot {
  return {
    appName: nextConfiguration?.appName ?? 'unknown',
    currentVersion: nextConfiguration?.currentVersion ?? 'unknown',
    currentRelease: nextConfiguration?.currentRelease ?? null,
    latestVersion: null,
    latestRelease: null,
    state: 'unknown',
    checkedAt: null,
  };
}

function emitSnapshot(): void {
  listeners.forEach((listener) => listener());
}

function isManifestPayload(value: unknown): value is { version: string; release?: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    'version' in value &&
    typeof value.version === 'string' &&
    value.version.trim().length > 0 &&
    (!('release' in value) || value.release === undefined || typeof value.release === 'string')
  );
}

function resolveReleaseState(
  currentConfiguration: FrontendReleaseConfiguration,
  manifest: FrontendReleaseManifest,
): FrontendReleaseState {
  if (currentConfiguration.currentRelease && manifest.release) {
    return currentConfiguration.currentRelease === manifest.release ? 'current' : 'outdated';
  }

  return currentConfiguration.currentVersion === manifest.version ? 'current' : 'outdated';
}

function getLatestIdentity(currentSnapshot: FrontendReleaseSnapshot): string | null {
  return currentSnapshot.latestRelease ?? currentSnapshot.latestVersion;
}

function getPromptStorageKey(currentSnapshot: FrontendReleaseSnapshot): string | null {
  const latestIdentity = getLatestIdentity(currentSnapshot);
  if (!latestIdentity) {
    return null;
  }

  return `senler:frontend-update:${currentSnapshot.appName}:${latestIdentity}`;
}

function readStoredPromptState(storageKey: string): StoredPromptState | null {
  const inMemoryHiddenUntil = inMemoryPromptHiddenUntil.get(storageKey) ?? 0;
  if (typeof window === 'undefined') {
    return inMemoryHiddenUntil > 0 ? { hiddenUntil: inMemoryHiddenUntil } : null;
  }

  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? 'null');
    if (
      typeof value !== 'object' ||
      value === null ||
      Array.isArray(value) ||
      !('hiddenUntil' in value) ||
      typeof value.hiddenUntil !== 'number' ||
      !Number.isFinite(value.hiddenUntil)
    ) {
      return inMemoryHiddenUntil > 0 ? { hiddenUntil: inMemoryHiddenUntil } : null;
    }

    return { hiddenUntil: Math.max(value.hiddenUntil, inMemoryHiddenUntil) };
  } catch {
    return inMemoryHiddenUntil > 0 ? { hiddenUntil: inMemoryHiddenUntil } : null;
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function configureFrontendRelease(
  nextConfiguration: FrontendReleaseConfiguration,
): void {
  const normalizedConfiguration: FrontendReleaseConfiguration = {
    appName: nextConfiguration.appName.trim(),
    currentVersion: nextConfiguration.currentVersion.trim(),
    currentRelease: normalizeValue(nextConfiguration.currentRelease),
    manifestUrl: nextConfiguration.manifestUrl.trim(),
  };

  if (
    !normalizedConfiguration.appName ||
    !normalizedConfiguration.currentVersion ||
    !normalizedConfiguration.manifestUrl
  ) {
    throw new Error('Frontend release configuration is incomplete');
  }

  const previousConfiguration = configuration;
  const configurationChanged =
    previousConfiguration === null ||
    previousConfiguration.appName !== normalizedConfiguration.appName ||
    previousConfiguration.currentVersion !== normalizedConfiguration.currentVersion ||
    previousConfiguration.currentRelease !== normalizedConfiguration.currentRelease ||
    previousConfiguration.manifestUrl !== normalizedConfiguration.manifestUrl;

  configuration = normalizedConfiguration;
  if (configurationChanged) {
    snapshot = createEmptySnapshot(normalizedConfiguration);
    syncPromise = null;
    emitSnapshot();
  }
}

export function getFrontendReleaseSnapshot(): FrontendReleaseSnapshot {
  return snapshot;
}

export async function syncFrontendRelease(options: {
  force?: boolean;
  maxAgeMs?: number;
  signal?: AbortSignal;
} = {}): Promise<FrontendReleaseSnapshot> {
  if (!configuration || typeof fetch === 'undefined') {
    return snapshot;
  }

  const maxAgeMs = options.maxAgeMs ?? DEFAULT_SYNC_INTERVAL_MS;
  if (
    !options.force &&
    snapshot.checkedAt !== null &&
    Date.now() - snapshot.checkedAt < maxAgeMs
  ) {
    return snapshot;
  }

  if (syncPromise) {
    return syncPromise;
  }

  const activeConfiguration = configuration;
  syncPromise = fetch(activeConfiguration.manifestUrl, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
    signal: options.signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        return snapshot;
      }

      const payload: unknown = await response.json();
      if (!isManifestPayload(payload)) {
        return snapshot;
      }

      const manifest: FrontendReleaseManifest = {
        version: payload.version.trim(),
        release: normalizeValue(payload.release),
      };
      snapshot = {
        appName: activeConfiguration.appName,
        currentVersion: activeConfiguration.currentVersion,
        currentRelease: activeConfiguration.currentRelease,
        latestVersion: manifest.version,
        latestRelease: manifest.release,
        state: resolveReleaseState(activeConfiguration, manifest),
        checkedAt: Date.now(),
      };
      emitSnapshot();
      return snapshot;
    })
    .catch(() => snapshot)
    .finally(() => {
      syncPromise = null;
    });

  return syncPromise;
}

export async function shouldSuppressOutdatedFrontendError(
  errorName: string | null,
): Promise<boolean> {
  if (errorName !== 'ApiValidationError') {
    return false;
  }

  const currentSnapshot = await syncFrontendRelease();
  return currentSnapshot.state === 'outdated';
}

export function useFrontendReleaseStatus(
  syncIntervalMs = DEFAULT_SYNC_INTERVAL_MS,
): FrontendReleaseSnapshot {
  const currentSnapshot = useSyncExternalStore(
    subscribe,
    getFrontendReleaseSnapshot,
    getFrontendReleaseSnapshot,
  );

  useEffect(() => {
    const controller = new AbortController();
    void syncFrontendRelease({ force: true, signal: controller.signal });

    const intervalId = window.setInterval(() => {
      void syncFrontendRelease({ force: true });
    }, syncIntervalMs);

    const handleFocus = () => {
      void syncFrontendRelease({ force: true });
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void syncFrontendRelease({ force: true });
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [syncIntervalMs]);

  return currentSnapshot;
}

export interface FrontendUpdatePromptState {
  isOpen: boolean;
  status: FrontendReleaseSnapshot;
  remindLater: () => void;
  refresh: () => void;
}

export function useFrontendUpdatePrompt(
  cooldownMs = FRONTEND_UPDATE_PROMPT_COOLDOWN_MS,
): FrontendUpdatePromptState {
  const status = useFrontendReleaseStatus();
  const [visibilityNow, setVisibilityNow] = useState(() => Date.now());

  useEffect(() => {
    const refreshVisibility = () => {
      setVisibilityNow(Date.now());
    };
    const intervalId = window.setInterval(refreshVisibility, DEFAULT_SYNC_INTERVAL_MS);
    window.addEventListener('storage', refreshVisibility);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('storage', refreshVisibility);
    };
  }, []);

  const storageKey = getPromptStorageKey(status);
  const hiddenUntil = storageKey
    ? readStoredPromptState(storageKey)?.hiddenUntil ?? 0
    : 0;
  const isOpen =
    status.state === 'outdated' &&
    visibilityNow >= hiddenUntil;

  const remindLater = useCallback(() => {
    const currentStorageKey = getPromptStorageKey(getFrontendReleaseSnapshot());
    if (!currentStorageKey || typeof window === 'undefined') {
      emitSnapshot();
      return;
    }

    const hiddenUntilValue = Date.now() + cooldownMs;
    inMemoryPromptHiddenUntil.set(currentStorageKey, hiddenUntilValue);
    try {
      window.localStorage.setItem(
        currentStorageKey,
        JSON.stringify({ hiddenUntil: hiddenUntilValue }),
      );
    } catch {
      // In-memory state still closes the prompt when storage is unavailable.
    }
    setVisibilityNow(Date.now());
  }, [cooldownMs]);

  const refresh = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }, []);

  return { isOpen, status, remindLater, refresh };
}
