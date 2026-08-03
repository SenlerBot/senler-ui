import type { SenlerBridgeElementActionRequest, SenlerBridgeElementActionResult } from './protocol';
export declare function clearSenlerBridgeElementHighlight(documentRoot?: Document): void;
export declare function executeSenlerBridgeElementAction(request: SenlerBridgeElementActionRequest, documentRoot?: Document): Promise<SenlerBridgeElementActionResult>;
