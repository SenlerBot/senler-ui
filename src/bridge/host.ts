import {
  createInitMessage,
  createSubmitRequestMessage,
  createUiMessage,
  isSenlerBridgeReadyMessage,
  parseSenlerBridgeContext,
  parseSenlerBridgeResponseMessage,
  parseSenlerBridgeUiContext,
  type SenlerBridgeContext,
  type SenlerBridgeToolConfiguratorResult,
  type SenlerBridgeUiContext,
} from './protocol';

const DEFAULT_REQUEST_TIMEOUT_MS = 20_000;

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

export type SenlerBridgeHostErrorCode =
  | 'destroyed'
  | 'invalid_context'
  | 'invalid_launch'
  | 'frame_unavailable'
  | 'request_timeout'
  | 'remote_error';

export class SenlerBridgeHostError extends Error {
  constructor(
    readonly code: SenlerBridgeHostErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'SenlerBridgeHostError';
  }
}

interface PendingRequest {
  resolve: (result: SenlerBridgeToolConfiguratorResult) => void;
  reject: (error: Error) => void;
  timeoutId: number;
}

function normalizeOrigin(origin: string): string {
  const normalized = new URL(origin).origin;
  if (normalized === 'null') throw new Error('Senler Bridge targetOrigin is invalid');
  return normalized;
}

function createRequestId(hostWindow: Window): string {
  if (typeof hostWindow.crypto?.randomUUID === 'function') {
    return hostWindow.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createSenlerBridgeHost(
  options: SenlerBridgeHostOptions,
): SenlerBridgeHost {
  const hostWindow = options.hostWindow ?? window;
  const targetOrigin = normalizeOrigin(options.targetOrigin);
  const requestTimeoutMs =
    options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
  const initialContext = parseSenlerBridgeContext(options.context);
  if (!initialContext) {
    throw new SenlerBridgeHostError(
      'invalid_context',
      'Senler Bridge context is invalid',
    );
  }
  let context = initialContext;
  let connected = false;
  let destroyed = false;
  const pendingRequests = new Map<string, PendingRequest>();

  const postToFrame = (message: unknown): boolean => {
    if (destroyed) return false;
    const targetWindow = options.getTargetWindow();
    if (!targetWindow) return false;
    targetWindow.postMessage(message, targetOrigin);
    return true;
  };

  const sendInit = () => postToFrame(createInitMessage(context));

  const handleMessage = (event: MessageEvent<unknown>) => {
    if (
      destroyed ||
      event.origin !== targetOrigin ||
      event.source !== options.getTargetWindow()
    ) {
      return;
    }
    if (isSenlerBridgeReadyMessage(event.data)) {
      connected = true;
      sendInit();
      return;
    }
    const response = parseSenlerBridgeResponseMessage(event.data);
    if (!response) return;
    const pending = pendingRequests.get(response.request_id);
    if (!pending) return;
    hostWindow.clearTimeout(pending.timeoutId);
    pendingRequests.delete(response.request_id);
    if (response.ok) pending.resolve(response.result);
    else pending.reject(new SenlerBridgeHostError('remote_error', response.error));
  };

  hostWindow.addEventListener('message', handleMessage);

  return {
    notifyFrameLoaded() {
      connected = true;
      sendInit();
    },
    setContext(nextContext) {
      const parsedContext = parseSenlerBridgeContext(nextContext);
      if (!parsedContext) {
        throw new SenlerBridgeHostError(
          'invalid_context',
          'Senler Bridge context is invalid',
        );
      }
      context = parsedContext;
      if (connected) sendInit();
    },
    setUi(ui) {
      const parsedUi = parseSenlerBridgeUiContext(ui);
      if (!parsedUi) {
        throw new SenlerBridgeHostError(
          'invalid_context',
          'Senler Bridge UI context is invalid',
        );
      }
      context = { ...context, ui: parsedUi };
      if (connected) postToFrame(createUiMessage(parsedUi));
    },
    requestToolConfiguratorSubmit() {
      if (destroyed) {
        return Promise.reject(
          new SenlerBridgeHostError('destroyed', 'Senler Bridge host is destroyed'),
        );
      }
      if (context.launch.type !== 'tool_configurator') {
        return Promise.reject(
          new SenlerBridgeHostError(
            'invalid_launch',
            'Tool configurator is unavailable for this iframe',
          ),
        );
      }
      const requestId = createRequestId(hostWindow);
      return new Promise<SenlerBridgeToolConfiguratorResult>((resolve, reject) => {
        const timeoutId = hostWindow.setTimeout(() => {
          pendingRequests.delete(requestId);
          reject(
            new SenlerBridgeHostError(
              'request_timeout',
              'The embedded application did not respond in time',
            ),
          );
        }, requestTimeoutMs);
        pendingRequests.set(requestId, { resolve, reject, timeoutId });
        if (!postToFrame(createSubmitRequestMessage(requestId))) {
          hostWindow.clearTimeout(timeoutId);
          pendingRequests.delete(requestId);
          reject(
            new SenlerBridgeHostError(
              'frame_unavailable',
              'The embedded application is unavailable',
            ),
          );
        }
      });
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      hostWindow.removeEventListener('message', handleMessage);
      for (const pending of pendingRequests.values()) {
        hostWindow.clearTimeout(pending.timeoutId);
        pending.reject(
          new SenlerBridgeHostError(
            'destroyed',
            'Senler Bridge host is destroyed',
          ),
        );
      }
      pendingRequests.clear();
    },
  };
}
