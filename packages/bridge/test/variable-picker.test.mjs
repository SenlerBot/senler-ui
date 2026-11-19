import assert from 'node:assert/strict';
import test from 'node:test';
import { createSenlerBridgeClient, createSenlerBridgeHost, createVariablePickerRequest,
  createVariablePickerResult, parseVariablePickerRequest, parseVariableSelection } from '../dist/index.js';

const selection = { scope: 'lead', name: 'email', type: 'string', template: '{{lead.email}}' };
function fixture({ supported = true, pick = async () => selection, timeout = 1000 } = {}) {
  const parent = new EventTarget(), frame = new EventTarget(), requests = [];
  const dispatch = (target, data, origin, source) => {
    const event = new Event('message');
    Object.defineProperties(event, { data: { value: data }, origin: { value: origin }, source: { value: source } });
    target.dispatchEvent(event);
  };
  Object.assign(parent, { setTimeout, clearTimeout, postMessage: data => dispatch(parent, data, 'https://plugin.example', frame) });
  Object.assign(frame, { parent, setTimeout, clearTimeout, postMessage: data => dispatch(frame, data, 'https://host.example', parent) });
  const context = {
    ui: { language: 'ru', theme: 'dark' }, variable_picker: supported,
    launch: { type: 'automation_step_configurator', app_id: 'app', project_id: 'project', installation_id: 'installation',
      automation_id: 'automation', node_id: 'node', step: { id: 'step', name: 'payment', continuation_mode: 'next' }, configuration: {}, branches: [] },
  };
  const host = createSenlerBridgeHost({ hostWindow: parent, targetOrigin: 'https://plugin.example', getTargetWindow: () => frame, context,
    onVariablePick: (request, signal) => { requests.push({ request, signal }); return pick(request, signal); } });
  const client = createSenlerBridgeClient({ clientWindow: frame, parentOrigin: 'https://host.example', syncDocument: false, variablePickerTimeoutMs: timeout });
  return { client, host, context, parent, frame, requests, dispatch, close: () => { client.destroy(); host.destroy(); } };
}

test('selects through the host and returns null on cancellation', async () => {
  const f = fixture();
  try {
    await assert.rejects(f.client.pickVariable({ mode: 'read' }), { code: 'not_connected' });
    await f.client.connect();
    assert.deepEqual(await f.client.pickVariable({ mode: 'read', types: ['string'] }), selection);
    assert.equal(f.requests.length, 1);
  } finally { f.close(); }
  const cancelled = fixture({ pick: async () => null });
  try { await cancelled.client.connect(); assert.equal(await cancelled.client.pickVariable({ mode: 'write' }), null); }
  finally { cancelled.close(); }
});

test('validates requests and refuses unsupported hosts', async () => {
  for (const request of [{ mode: 'admin' }, { mode: 'write', scopes: ['secret'] }, { mode: 'read', scopes: [] }, { mode: 'read', types: ['string', 'string'] }]) assert.equal(parseVariablePickerRequest(request), null);
  assert.equal(parseVariableSelection({ ...selection, template: '{{project.secret}}' }), null);
  const f = fixture({ supported: false });
  try { await f.client.connect(); await assert.rejects(f.client.pickVariable({ mode: 'read' }), { code: 'unsupported' }); assert.equal(f.requests.length, 0); }
  finally { f.close(); }
});

test('ignores forged senders, origins and responses; permits only one picker', async () => {
  let finish;
  const f = fixture({ pick: () => new Promise(resolve => { finish = resolve; }) });
  try {
    await f.client.connect();
    const request = createVariablePickerRequest('forged', { mode: 'read' });
    f.dispatch(f.parent, request, 'https://evil.example', f.frame);
    f.dispatch(f.parent, request, 'https://plugin.example', new EventTarget());
    assert.equal(f.requests.length, 0);
    const pending = f.client.pickVariable({ mode: 'write', scopes: ['lead'], types: ['string'] });
    await Promise.resolve();
    await assert.rejects(f.client.pickVariable({ mode: 'read' }), { code: 'busy' });
    f.dispatch(f.frame, createVariablePickerResult('forged', selection), 'https://host.example', f.parent);
    assert.equal(f.requests.length, 1);
    finish(selection);
    assert.deepEqual(await pending, selection);
  } finally { f.close(); }
});

test('checks selected scope/type and never allows lead data as a write target', async () => {
  for (const result of [selection, { scope: 'run', name: 'price', type: 'number', template: '{{run.price}}' }, { scope: 'lead_data', name: 'name', template: '{{lead_data.name}}' }]) {
    const f = fixture({ pick: async () => result });
    try { await f.client.connect(); await assert.rejects(f.client.pickVariable({ mode: 'write', scopes: ['run'], types: ['string'] }), { code: 'remote_error' }); }
    finally { f.close(); }
  }
});

test('timeout, navigation and destroy abort the host UI', async () => {
  for (const action of ['timeout', 'context', 'client-destroy', 'host-destroy', 'reload']) {
    const f = fixture({ pick: () => new Promise(() => {}), timeout: 20 });
    try {
      await f.client.connect();
      const pending = f.client.pickVariable({ mode: 'read' });
      await Promise.resolve();
      const signal = f.requests[0].signal;
      if (action === 'timeout') await assert.rejects(pending, { code: 'request_timeout' });
      else if (action === 'client-destroy') {
        const rejected = assert.rejects(pending, { code: 'destroyed' }); f.client.destroy(); await rejected;
      } else {
        if (action === 'context') f.host.setContext({ ...f.context, launch: { ...f.context.launch, node_id: 'other' } });
        if (action === 'host-destroy') f.host.destroy();
        if (action === 'reload') f.host.notifyFrameLoaded();
        assert.equal(await pending, null);
      }
      assert.equal(signal.aborted, true);
    } finally { f.close(); }
  }
});
