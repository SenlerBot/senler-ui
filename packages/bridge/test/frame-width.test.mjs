import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createSenlerBridgeClient, createSenlerBridgeHost,
  createFrameMaxWidthRequest, parseSenlerBridgeContext,
} from '../dist/index.js';

function fixture(supported = true, timeout = 100) {
  const parent = new EventTarget();
  const frame = new EventTarget();
  const changes = [];
  const dispatch = (target, data, origin, source) => {
    const event = new Event('message');
    Object.defineProperties(event, {
      data: { value: data }, origin: { value: origin }, source: { value: source },
    });
    target.dispatchEvent(event);
  };
  Object.assign(parent, {
    setTimeout, clearTimeout,
    postMessage: (data) => dispatch(parent, data, 'https://plugin.example', frame),
  });
  Object.assign(frame, {
    parent, setTimeout, clearTimeout,
    postMessage: (data) => dispatch(frame, data, 'https://host.example', parent),
  });
  const context = {
    ui: { language: 'en', theme: 'light' },
    launch: { type: 'embedded_page', app_id: 'app', project_id: 'project', mode: 'test' },
    frame_max_width: supported,
  };
  const host = createSenlerBridgeHost({
    hostWindow: parent, targetOrigin: 'https://plugin.example',
    getTargetWindow: () => frame, context,
    onFrameMaxWidthChange: (width) => changes.push(width),
  });
  const client = createSenlerBridgeClient({
    clientWindow: frame, parentOrigin: 'https://host.example',
    syncDocument: false, connectTimeoutMs: timeout,
  });
  return { client, host, changes, parent, frame, context, dispatch,
    close: () => { client.destroy(); host.destroy(); } };
}

test('changes and resets the limit after the host acknowledges, preserving context', async () => {
  const f = fixture();
  try {
    await assert.rejects(f.client.setFrameMaxWidth(1200), { code: 'not_connected' });
    await f.client.connect();
    await f.client.setFrameMaxWidth(1200);
    await f.client.setFrameMaxWidth(640);
    await f.client.setFrameMaxWidth(null);
    assert.deepEqual(f.changes, [1200, 640, null]);
    assert.deepEqual(f.client.getContext(), f.context);
  } finally { f.close(); }
});

test('inline and older hosts explicitly reject width changes', async () => {
  const f = fixture(false);
  try {
    await f.client.connect();
    await assert.rejects(f.client.setFrameMaxWidth(1200), { code: 'unsupported' });
    const { frame_max_width, ...oldContext } = f.context;
    f.host.setContext(oldContext);
    await assert.rejects(f.client.setFrameMaxWidth(null), { code: 'unsupported' });
    assert.deepEqual(f.changes, []);
  } finally { f.close(); }
});

test('validates width, sender, origin and capability', async () => {
  const f = fixture();
  try {
    await f.client.connect();
    for (const value of [0, -1, 1.5, NaN, Infinity, 100001, '1200', undefined]) {
      await assert.rejects(f.client.setFrameMaxWidth(value), { code: 'invalid_width' });
      f.parent.postMessage(createFrameMaxWidthRequest('invalid', value));
    }
    const message = createFrameMaxWidthRequest('forged', 900);
    f.dispatch(f.parent, message, 'https://evil.example', f.frame);
    f.dispatch(f.parent, message, 'https://plugin.example', new EventTarget());
    assert.deepEqual(f.changes, []);
    assert.equal(parseSenlerBridgeContext({ ...f.context, frame_max_width: 'yes' }), null);
  } finally { f.close(); }
});

test('missing acknowledgements time out and destroy rejects pending requests', async () => {
  const f = fixture(true, 20);
  try {
    await f.client.connect();
    f.host.destroy();
    await assert.rejects(f.client.setFrameMaxWidth(1200), { code: 'request_timeout' });
    const pending = assert.rejects(f.client.setFrameMaxWidth(640), { code: 'destroyed' });
    f.client.destroy();
    await pending;
    await assert.rejects(f.client.setFrameMaxWidth(null), { code: 'destroyed' });
  } finally { f.close(); }
});

test('load, context refresh and reconnect do not replay accepted width requests', async () => {
  const f = fixture();
  try {
    await f.client.connect();
    await f.client.setFrameMaxWidth(1200);
    f.host.notifyFrameLoaded();
    f.host.setContext(f.context);
    await f.client.connect();
    assert.deepEqual(f.changes, [1200]);

    await f.client.setFrameMaxWidth(null);
    f.host.notifyFrameLoaded();
    assert.deepEqual(f.changes, [1200, null]);

    f.client.destroy();
    const nextDocument = createSenlerBridgeClient({
      clientWindow: f.frame, parentOrigin: 'https://host.example',
      syncDocument: false,
    });
    try {
      f.changes.length = 0;
      await nextDocument.connect();
      f.host.notifyFrameLoaded();
      assert.deepEqual(f.changes, []);
    } finally { nextDocument.destroy(); }
  } finally { f.close(); }
});

test('a pending width is acknowledged once when init is repeated', async () => {
  const f = fixture();
  try {
    await f.client.connect();
    await f.client.setFrameMaxWidth(800);
    const responses = [];
    const sendToClient = f.frame.postMessage;
    f.frame.postMessage = data => responses.push(data);
    const pending = f.client.setFrameMaxWidth(1200);
    f.host.notifyFrameLoaded();
    // Deliver init before the acknowledgement to exercise an outstanding request.
    sendToClient(responses.pop());
    assert.deepEqual(f.changes, [800, 1200]);
    while (responses.length) sendToClient(responses.shift());
    await pending;
  } finally { f.close(); }
});
