import { type SenlerBridgeContext, type SenlerBridgeToolConfiguratorResult, type SenlerBridgeUiContext } from './protocol';
export interface SenlerBridgeHostOptions {
    targetOrigin: string;
    getTargetWindow: () => Window | null;
    context: SenlerBridgeContext;
    hostWindow?: Window;
    requestTimeoutMs?: number;
}
export interface SenlerBridgeHost {
    notifyFrameLoaded(): void;
    setContext(context: SenlerBridgeContext): void;
    setUi(ui: SenlerBridgeUiContext): void;
    requestToolConfiguratorSubmit(): Promise<SenlerBridgeToolConfiguratorResult>;
    destroy(): void;
}
export type SenlerBridgeHostErrorCode = 'destroyed' | 'invalid_context' | 'invalid_launch' | 'frame_unavailable' | 'request_timeout' | 'remote_error';
export declare class SenlerBridgeHostError extends Error {
    readonly code: SenlerBridgeHostErrorCode;
    constructor(code: SenlerBridgeHostErrorCode, message: string);
}
export declare function createSenlerBridgeHost(options: SenlerBridgeHostOptions): SenlerBridgeHost;
