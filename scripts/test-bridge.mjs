import assert from 'node:assert/strict';
import {
  createSenlerBridgeClient,
  createSenlerBridgeHost,
  parseSenlerBridgeAutomationStepConfiguratorResult,
  parseSenlerBridgeContext,
  parseSenlerBridgeToolConfiguratorResult,
} from '../dist/bridge.js';

const parentOrigin = 'https://senler.example';
const appOrigin = 'https://app.example';
const parentWindow = new EventTarget();
const appWindow = new EventTarget();

function createWindowMessageEvent(data, origin, source) {
  const event = new Event('message');
  Object.defineProperties(event, {
    data: { value: data },
    origin: { value: origin },
    source: { value: source },
  });
  return event;
}

Object.assign(parentWindow, {
  crypto: globalThis.crypto,
  setTimeout,
  clearTimeout,
  postMessage(data, targetOrigin) {
    assert.equal(targetOrigin, parentOrigin);
    parentWindow.dispatchEvent(
      createWindowMessageEvent(data, appOrigin, appWindow),
    );
  },
});

Object.assign(appWindow, {
  parent: parentWindow,
  setTimeout,
  clearTimeout,
  postMessage(data, targetOrigin) {
    assert.equal(targetOrigin, appOrigin);
    appWindow.dispatchEvent(
      createWindowMessageEvent(data, parentOrigin, parentWindow),
    );
  },
});

const initialContext = {
  ui: { language: 'ru', theme: 'light' },
  launch: {
    type: 'tool_configurator',
    app_id: 'app-1',
    project_id: 'project-1',
    installation_id: 'installation-1',
    agent_id: 'agent-1',
    mode: 'create',
    tool: { id: 'tool-1', name: 'create_payment', description: '' },
    instance: null,
  },
};

const host = createSenlerBridgeHost({
  hostWindow: parentWindow,
  targetOrigin: appOrigin,
  getTargetWindow: () => appWindow,
  context: initialContext,
});
const client = createSenlerBridgeClient({
  clientWindow: appWindow,
  parentOrigin,
  syncDocument: false,
});

const observedContexts = [];
const observedElementActions = [];
let elementHighlightClearCount = 0;
client.onContextChange((context) => observedContexts.push(context));
client.onToolConfiguratorSubmit(() => ({
  title: 'Payment link',
  configuration: { product: 'consultation' },
  configured_parameters: [],
  private_data_action: 'preserve',
  private_data_required: true,
}));
client.onElementAction((request) => {
  observedElementActions.push(request);
  return {
    status: 'success',
    matched_context_id: request.context_id,
    matched_count: 1,
  };
});
client.onElementHighlightClear(() => {
  elementHighlightClearCount += 1;
});

assert.deepEqual(await client.connect(), initialContext);
host.setUi({ language: 'en', theme: 'dark' });
assert.deepEqual(observedContexts.at(-1)?.ui, {
  language: 'en',
  theme: 'dark',
});
assert.deepEqual(await host.requestToolConfiguratorSubmit(), {
  title: 'Payment link',
  configuration: { product: 'consultation' },
  configured_parameters: [],
  private_data_action: 'preserve',
  private_data_required: true,
});
const automationContext = {
  ui: { language: 'en', theme: 'dark' },
  launch: {
    type: 'automation_step_configurator',
    app_id: 'app-1',
    project_id: 'project-1',
    installation_id: 'installation-1',
    automation_id: 'automation-1',
    node_id: 'node-1',
    step: {
      id: 'step-1',
      name: 'check_payment',
      continuation_mode: 'configured',
    },
    configuration: {},
    branches: [],
  },
};
host.setContext(automationContext);
client.onAutomationStepConfiguratorSubmit(() => ({
  kind: 'automation_step_configurator',
  configuration: { account_id: 'account-1' },
  branches: [
    {
      branch_id: '73f56c65-2e70-45d1-9487-d213206e9318',
      key: 'paid',
      title: 'Paid',
    },
  ],
}));
assert.deepEqual(await host.requestAutomationStepConfiguratorSubmit(), {
  kind: 'automation_step_configurator',
  configuration: { account_id: 'account-1' },
  branches: [
    {
      branch_id: '73f56c65-2e70-45d1-9487-d213206e9318',
      key: 'paid',
      title: 'Paid',
    },
  ],
});
assert.deepEqual(
  await host.requestElementAction({
    context_id: 'app.prodamus.accounts.add',
    action: 'highlight',
  }),
  {
    status: 'success',
    matched_context_id: 'app.prodamus.accounts.add',
    matched_count: 1,
  },
);
assert.deepEqual(observedElementActions, [
  {
    context_id: 'app.prodamus.accounts.add',
    action: 'highlight',
  },
]);
host.clearElementHighlight();
assert.equal(elementHighlightClearCount, 1);

client.destroy();
host.destroy();

assert.equal(
  parseSenlerBridgeContext({
    ...initialContext,
    launch: { ...initialContext.launch, project_id: '' },
  }),
  null,
);
assert.equal(
  parseSenlerBridgeToolConfiguratorResult({
    configuration: { constructor: { polluted: true } },
    configured_parameters: [],
  }),
  null,
);
assert.equal(
  parseSenlerBridgeAutomationStepConfiguratorResult({
    kind: 'automation_step_configurator',
    configuration: {},
    branches: [
      {
        branch_id: '73f56c65-2e70-45d1-9487-d213206e9318',
        key: 'not valid',
        title: 'Invalid',
      },
    ],
  }),
  null,
);
assert.throws(
  () =>
    createSenlerBridgeHost({
      hostWindow: parentWindow,
      targetOrigin: appOrigin,
      getTargetWindow: () => appWindow,
      context: {
        ...initialContext,
        ui: { language: 'de', theme: 'light' },
      },
    }),
  /context is invalid/,
);

const timeoutClient = createSenlerBridgeClient({
  clientWindow: appWindow,
  parentOrigin,
  syncDocument: false,
  connectTimeoutMs: 1,
});
await assert.rejects(timeoutClient.connect(), /connection timed out/);
timeoutClient.destroy();
console.log('senler bridge handshake and request smoke: ok');
