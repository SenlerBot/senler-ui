import { SENLER_BRIDGE_PROTOCOL_VERSION, SENLER_BRIDGE_SOURCE } from './protocol.js';

export const SENLER_BRIDGE_VARIABLE_PICKER_TIMEOUT_MS = 5 * 60_000;
export type SenlerBridgeVariableScope = 'run' | 'lead' | 'dialog' | 'project';
export type SenlerBridgeVariableType = 'string' | 'number' | 'boolean' | 'json' | 'date' | 'array' | 'object' | 'reaction';

export interface SenlerBridgeVariablePickerRequest {
  /** read inserts a template; write chooses a result destination. */
  mode: 'read' | 'write';
  scopes?: SenlerBridgeVariableScope[];
  types?: SenlerBridgeVariableType[];
}

export interface SenlerBridgeVariableSelection {
  scope: SenlerBridgeVariableScope | 'lead_data';
  /** Variable path, including bracket notation for names that require it. */
  name: string;
  type?: SenlerBridgeVariableType;
  template: string;
}

const scopes = ['run', 'lead', 'dialog', 'project'];
const types = ['string', 'number', 'boolean', 'json', 'date', 'array', 'object', 'reaction'];
const REQUEST = 'senler:bridge:variable-picker';
const RESULT = 'senler:bridge:variable-picker-result';
const CANCEL = 'senler:bridge:variable-picker-cancel';

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function list(value: unknown, allowed: string[]): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.length <= allowed.length &&
    value.every(item => typeof item === 'string' && allowed.includes(item)) && new Set(value).size === value.length;
}

export function parseVariablePickerRequest(value: unknown): SenlerBridgeVariablePickerRequest | null {
  if (!record(value) || (value.mode !== 'read' && value.mode !== 'write') ||
    (value.scopes !== undefined && !list(value.scopes, scopes)) ||
    (value.types !== undefined && !list(value.types, types))) return null;
  return {
    mode: value.mode,
    ...(value.scopes ? { scopes: [...value.scopes] as SenlerBridgeVariableScope[] } : {}),
    ...(value.types ? { types: [...value.types] as SenlerBridgeVariableType[] } : {}),
  };
}

export function parseVariableSelection(value: unknown): SenlerBridgeVariableSelection | null {
  if (!record(value) || typeof value.scope !== 'string' || ![...scopes, 'lead_data'].includes(value.scope) ||
    typeof value.name !== 'string' || !value.name.trim() || value.name.length > 160 || /[\0\r\n]/u.test(value.name) ||
    typeof value.template !== 'string' || value.template.length > 1024 ||
    value.template !== `{{${value.scope}${value.name.startsWith('[') ? '' : '.'}${value.name}}}` ||
    (value.type !== undefined && (typeof value.type !== 'string' || !types.includes(value.type)))) return null;
  return {
    scope: value.scope as SenlerBridgeVariableSelection['scope'], name: value.name, template: value.template,
    ...(value.type ? { type: value.type as SenlerBridgeVariableType } : {}),
  };
}

export function variableSelectionMatches(request: SenlerBridgeVariablePickerRequest, selection: SenlerBridgeVariableSelection): boolean {
  return (selection.scope === 'lead_data'
    ? request.mode === 'read' && (!request.scopes || request.scopes.includes('lead'))
    : !request.scopes || request.scopes.includes(selection.scope)) &&
    (!request.types || !selection.type || request.types.includes(selection.type));
}

function envelope(value: unknown): value is Record<string, unknown> & { request_id: string } {
  return record(value) && value.source === SENLER_BRIDGE_SOURCE &&
    value.protocol_version === SENLER_BRIDGE_PROTOCOL_VERSION &&
    typeof value.request_id === 'string' && value.request_id.length > 0 && value.request_id.length <= 128;
}

function message(type: string, requestId: string) {
  return { source: SENLER_BRIDGE_SOURCE, protocol_version: SENLER_BRIDGE_PROTOCOL_VERSION, type, request_id: requestId };
}

export function createVariablePickerRequest(requestId: string, request: SenlerBridgeVariablePickerRequest) {
  return { ...message(REQUEST, requestId), request };
}
export function parseVariablePickerRequestMessage(value: unknown) {
  if (!envelope(value) || value.type !== REQUEST) return null;
  const request = parseVariablePickerRequest(value.request);
  return request ? { request_id: value.request_id, request } : null;
}
export function createVariablePickerResult(requestId: string, selection: SenlerBridgeVariableSelection | null, error: string | null = null) {
  return { ...message(RESULT, requestId), selection, error };
}
export function parseVariablePickerResult(value: unknown) {
  if (!envelope(value) || value.type !== RESULT ||
    !(value.error === null || (typeof value.error === 'string' && value.error.length <= 100))) return null;
  const selection = value.selection === null ? null : parseVariableSelection(value.selection);
  if (value.selection !== null && !selection) return null;
  return { request_id: value.request_id, selection, error: value.error };
}
export function createVariablePickerCancel(requestId: string) { return message(CANCEL, requestId); }
export function parseVariablePickerCancel(value: unknown) {
  return envelope(value) && value.type === CANCEL ? value.request_id : null;
}

export class SenlerBridgeVariablePickerError extends Error {
  constructor(readonly code: 'unsupported' | 'not_connected' | 'invalid_request' | 'busy' | 'request_timeout' | 'destroyed' | 'remote_error') {
    super(`Senler Bridge variable picker: ${code}`);
    this.name = 'SenlerBridgeVariablePickerError';
  }
}
