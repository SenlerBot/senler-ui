import { SENLER_BRIDGE_PROTOCOL_VERSION, SENLER_BRIDGE_SOURCE } from './protocol.js';

export const SENLER_BRIDGE_DEFAULT_FRAME_MAX_WIDTH = 1024;
export const SENLER_BRIDGE_MAX_FRAME_WIDTH = 100_000;
const REQUEST = 'senler:bridge:frame-max-width';
const RESULT = 'senler:bridge:frame-max-width-result';

export function isSenlerBridgeFrameMaxWidth(value: unknown): value is number | null {
  return value === null || (
    typeof value === 'number' && Number.isInteger(value) &&
    value >= 1 && value <= SENLER_BRIDGE_MAX_FRAME_WIDTH
  );
}

function envelope(value: unknown): value is Record<string, unknown> & { request_id: string } {
  return typeof value === 'object' && value !== null &&
    'source' in value && value.source === SENLER_BRIDGE_SOURCE &&
    'protocol_version' in value && value.protocol_version === SENLER_BRIDGE_PROTOCOL_VERSION &&
    'request_id' in value && typeof value.request_id === 'string' &&
    value.request_id.length > 0 && value.request_id.length <= 128;
}

export function createFrameMaxWidthRequest(requestId: string, maxWidth: number | null) {
  return {
    source: SENLER_BRIDGE_SOURCE, protocol_version: SENLER_BRIDGE_PROTOCOL_VERSION,
    type: REQUEST, request_id: requestId, max_width: maxWidth,
  };
}

export function parseFrameMaxWidthRequest(value: unknown) {
  if (!envelope(value) || value.type !== REQUEST || !isSenlerBridgeFrameMaxWidth(value.max_width)) return null;
  return { request_id: value.request_id, max_width: value.max_width };
}

export function createFrameMaxWidthResult(requestId: string, error: string | null = null) {
  return {
    source: SENLER_BRIDGE_SOURCE, protocol_version: SENLER_BRIDGE_PROTOCOL_VERSION,
    type: RESULT, request_id: requestId, error,
  };
}

export function parseFrameMaxWidthResult(value: unknown) {
  if (!envelope(value) || value.type !== RESULT ||
    !(value.error === null || (typeof value.error === 'string' && value.error.length <= 1000))) return null;
  return { request_id: value.request_id, error: value.error };
}

export class SenlerBridgeFrameWidthError extends Error {
  constructor(readonly code: 'unsupported' | 'not_connected' | 'invalid_width' | 'request_timeout' | 'destroyed' | 'remote_error') {
    super(`Senler Bridge frame width: ${code}`);
    this.name = 'SenlerBridgeFrameWidthError';
  }
}
