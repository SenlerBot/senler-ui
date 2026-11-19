# @senlerio/bridge

Framework-independent bridge between a Senler host and an embedded application.
No React, CSS or other runtime dependencies.

This source package implements Bridge 2.2.0. Install its tested package archive
in the host and the embedded application:

```sh
npm install ./senlerio-bridge-2.2.0.tgz
```

To produce the archive from this directory, run `npm ci`, `npm run build`, and
`npm pack`. Public release tags are usable only after that release is published.

## Variable picker

Automation configurators can open Senler's native picker when
`client.getContext()?.variable_picker === true`:

```ts
const variable = await client.pickVariable({ mode: 'read', types: ['string'] });
if (variable) insertAtCursor(variable.template);

const destination = await client.pickVariable({ mode: 'write', types: ['number'] });
if (destination) configuration._senler_result_bindings.amount = {
  variable_scope: destination.scope,
  variable_name: destination.name,
};
```

`scopes` optionally limits `run`, `lead`, `dialog`, `project`. The host further
limits this list using the current automation and project permissions. Read
mode can include `lead_data`; write mode cannot. Only names, paths, types and
template tokens are returned, never variable values. Cancellation returns
`null`; unsupported hosts and transport failures reject with
`SenlerBridgeVariablePickerError`. Keep manual entry available on older hosts.
One picker can be open per frame; it expires after five minutes. Destroying or
reloading the frame, changing its launch context, or timing out cancels the UI.

Hosts advertise `variable_picker` only with an `onVariablePick(request, signal)`
handler. Use the verified launch context for the project and automation, apply
scope/type restrictions, and close the picker when the signal is aborted.
`name` is a variable path (bracket notation for names containing punctuation),
and `template` is its complete `{{scope.path}}` token.

Applications opened inside Senler use the typed bridge instead of calling
`window.postMessage` directly. The bridge validates the parent origin, applies
the initial language and theme, and receives their live updates without
reloading the iframe:

```ts
import {
  createSenlerBridgeClient,
  resolveSenlerBridgeBootstrapContext,
} from '@senlerio/bridge';

const bootstrap = resolveSenlerBridgeBootstrapContext(
  location.search,
  navigator.language,
  matchMedia('(prefers-color-scheme: dark)').matches,
);
// bootstrap.mode identifies the surface before Bridge connects.

const bridge = createSenlerBridgeClient({
  parentOrigin: 'https://senler.io',
});

bridge.onContextChange(({ ui, launch }) => {
  // ui: { language: 'ru' | 'en', theme: 'light' | 'dark' }
  // launch identifies an embedded page, tool, automation step, or funnel configurator.
});

bridge.onToolConfiguratorSubmit(() => ({
  configuration: {},
  configured_parameters: [],
}));

await bridge.connect();
```

OAuth and signed launch sessions remain the authentication boundary. Do not
send Senler access tokens or application secrets through the bridge.

## Maximum iframe width

Bridge 2.1.2 supports changing the maximum iframe width in application dialogs.
The host advertises support with `context.frame_max_width === true`.
After connecting, request a positive integer in CSS pixels (1–100000):

```ts
await bridge.connect();
await bridge.setFrameMaxWidth(1200);
await bridge.setFrameMaxWidth(640);
await bridge.setFrameMaxWidth(null); // Restore the app's saved limit, or 1024.
```

The promise resolves when the host accepts the limit; browser layout may update
later. Observe the iframe window's `resize` event to read its actual width.
Borders and host padding are outside this width; available screen space can make
the iframe narrower. The dialog shell can remain wider to keep its controls usable.
Changes do not reload the iframe or persist to application settings. The host
retains the override through reloads and navigation within the same iframe,
and resets it when the dialog closes or another application or configurator opens.
Inline panels and older hosts reject with `SenlerBridgeFrameWidthError`
and `code: 'unsupported'`.

Hosts use `onFrameMaxWidthChange` and advertise `frame_max_width: true` only for
supported dialog placements. The callback receives a number or `null` to reset.

## Funnel configurators

Funnel forms require Bridge 2.0.0 in both the host and the embedded application.
The launch context includes `metric_key`, `element`, `source_id` (null for a new
connection), and the saved `configuration`. Read it with `onContextChange`.
The host requests submission when the user saves the form:

```ts
bridge.onFunnelConfiguratorSubmit(() => ({
  kind: 'funnel_configurator',
  configuration: { counter_id: '42' },
  data_source_key: 'metrika:counter:42',
}));
```

`data_source_key` is required and identifies the selected dataset. Keep it stable
when display settings change; change it when the counter or account changes.
The key accepts 1–256 ASCII letters, digits, or `._:/-`. The host uses a changed
key to request confirmation before replacing the connection. Configuration
contains settings, not access tokens or application secrets.

## Development

Import the bridge from `@senlerio/bridge`. Follow the host/client origin and
handshake checks in the examples; never accept arbitrary message origins.

Canonical sources live in `senler-ui/packages/bridge`. The public GitHub repository
contains this package and its compiled `dist`. Run `npm ci` and `npm run build`
to compile declarations and exercise host/client handshakes, context updates,
configurators, frame sizing and disposal.
