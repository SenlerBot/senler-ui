import { type SenlerBridgeContext, type SenlerBridgeElementActionRequest, type SenlerBridgeElementActionResult, type SenlerBridgeLanguage, type SenlerBridgeToolConfiguratorResult, type SenlerBridgeUiContext } from './protocol';
export interface SenlerBridgeClientOptions {
    parentOrigin: string;
    clientWindow?: Window;
    syncDocument?: boolean;
    connectTimeoutMs?: number;
}
export interface SenlerBridgeClient {
    connect(): Promise<SenlerBridgeContext>;
    getContext(): SenlerBridgeContext | null;
    onContextChange(listener: (context: SenlerBridgeContext) => void): () => void;
    onToolConfiguratorSubmit(handler: () => SenlerBridgeToolConfiguratorResult | Promise<SenlerBridgeToolConfiguratorResult>): () => void;
    onElementAction(handler: (request: SenlerBridgeElementActionRequest) => SenlerBridgeElementActionResult | Promise<SenlerBridgeElementActionResult>): () => void;
    onElementHighlightClear(handler: () => void): () => void;
    destroy(): void;
}
export declare function normalizeSenlerBridgeLanguage(language: string): SenlerBridgeLanguage;
export declare function resolveSenlerBridgeBootstrapUi(search: string, fallbackLanguage: string, prefersDark: boolean): SenlerBridgeUiContext;
export declare function applySenlerBridgeUiContext(ui: SenlerBridgeUiContext, root?: HTMLElement): void;
export declare function createSenlerBridgeClient(options: SenlerBridgeClientOptions): SenlerBridgeClient;
