export declare const FRONTEND_UPDATE_PROMPT_COOLDOWN_MS: number;
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
export declare function configureFrontendRelease(nextConfiguration: FrontendReleaseConfiguration): void;
export declare function getFrontendReleaseSnapshot(): FrontendReleaseSnapshot;
export declare function syncFrontendRelease(options?: {
    force?: boolean;
    maxAgeMs?: number;
    signal?: AbortSignal;
}): Promise<FrontendReleaseSnapshot>;
export declare function shouldSuppressOutdatedFrontendError(errorName: string | null): Promise<boolean>;
export declare function useFrontendReleaseStatus(syncIntervalMs?: number): FrontendReleaseSnapshot;
export interface FrontendUpdatePromptState {
    isOpen: boolean;
    status: FrontendReleaseSnapshot;
    remindLater: () => void;
    refresh: () => void;
}
export declare function useFrontendUpdatePrompt(cooldownMs?: number): FrontendUpdatePromptState;
