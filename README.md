# @senlerio/ui

Senler UI is a React 19 component library for building Senler-compatible interfaces. It provides shared styles, design tokens, layout helpers, and accessible UI primitives for product screens, forms, dialogs, menus, and content blocks.

Documentation: [ui.senler.io](https://ui.senler.io)

## Development

This repository is the only editable source of truth for `@senlerio/ui`.
The copy under `aibot-cabinet/packages/senler-ui` is a generated vendor snapshot
and must be updated with the Cabinet `npm run ui:sync` command.

Use `npm run check:fast` while editing. Run `npm run build` once before
publishing; it performs one full check, one artifact build, and one distribution
test. The `prepack` hook only verifies that `dist` was built from the current
source, so `npm publish` does not repeat the full workflow.

## What Is Included

- Shared Tailwind integration via `@senlerio/ui/tailwind.css`.
- Shared CSS tokens via `@senlerio/ui/tokens.css`.
- Bundled Inter font via `@senlerio/ui/fonts.css`.
- Full standalone component stylesheet via `@senlerio/ui/styles.css`.
- Core actions and feedback: `Button`, `Badge`, `Alert`, `Progress`, `Skeleton`, `Spinner`, `PageLoader`, `Announce`, `Empty`, `Toaster`.
- Form controls: `Input`, `Textarea`, `CheckBox`, `RadioGroup`, `Switch`, `Slider`, `Select`, `SearchableSelect`, `AsyncSearchableSelect`, `Label`, `Field`, `Form`, `InputField`.
- Surfaces and content: `Card`, `Table`, `Avatar`, `Img`, `ImagePreview`, `Separator`, `ScrollArea`, `VisuallyHidden`, `SvgIcon`.
- Overlays and menus: `Dialog`, `AlertDialog`, `Sheet`, `Popover`, `Tooltip`, `HoverCard`, `DropdownMenu`, `ContextMenu`, `Menubar`.
- Navigation and disclosure primitives: `Tabs`, `Accordion`, `Collapsible`, `Link`, `Calendar`.
- Layout helpers: `LayoutContainer`, `LayoutSection`, `LayoutField`.
- Application shell: `AppShell`, `AppSidebar`, `AppHeader` from `@senlerio/ui/app-shell`.
- Optional code highlighting: `CodeBlock` from `@senlerio/ui/code`.
- Browser compatibility helpers: `@senlerio/ui/browser-compat` and `@senlerio/ui/vite-browser-compat`.

## Install

```bash
npm install https://github.com/SenlerBot/senler-ui/archive/refs/tags/v0.7.0.tar.gz
```

Requires React 19 and `lucide-react`:

```bash
npm install react@^19 react-dom@^19 lucide-react
```

## Usage

Import the stylesheet once in the application entrypoint when Senler UI owns the
Tailwind output. This includes the bundled Inter font:

```tsx
import '@senlerio/ui/styles.css';
```

If the host application already owns its Tailwind pipeline and global styles,
import the Tailwind integration entrypoint from the app CSS file after
`tailwindcss`. It registers semantic color utilities, the dark variant, and
scans Senler UI classes:

```css
@import "tailwindcss";
@import "@senlerio/ui/fonts.css";
@import "@senlerio/ui/tailwind.css";
```

Use `@senlerio/ui/tokens.css` only when you need raw CSS variables without
Tailwind utility generation.

## Browser Compatibility

Senler UI targets modern evergreen browsers and iOS Safari 15.4+. Use the
runtime compatibility entrypoint as the first import in browser applications
when a project uses streaming APIs directly or through React Router:

```tsx
import '@senlerio/ui/browser-compat';
```

For Vite applications, use the browser compatibility helper so JavaScript,
dependency syntax patches, and CSS transforms share the same browser policy:

```ts
import {
  SENLER_JS_COMPATIBILITY_TARGET,
  createBrowserCompatibilityPlugins,
} from '@senlerio/ui/vite-browser-compat';

export default defineConfig({
  plugins: [
    react(),
    ...createBrowserCompatibilityPlugins(),
  ],
  build: {
    target: SENLER_JS_COMPATIBILITY_TARGET,
  },
});
```

The runtime entrypoint installs missing Web Streams globals such as
`TransformStream`, `TextEncoderStream`, and `TextDecoderStream`. The Vite helper
sets the shared JS target, patches known dependency syntax that Safari cannot
parse, and transforms final production CSS: vendor prefixes, logical
properties, cascade layers, and fallbacks for supported `color-mix` patterns.

Then import components from the root entrypoint:

```tsx
import { Button, DialogRoot, DialogContent, Input } from '@senlerio/ui';

export function Example() {
  return (
    <DialogRoot>
      <DialogContent>
        <Input placeholder="Название" />
        <Button>Сохранить</Button>
      </DialogContent>
    </DialogRoot>
  );
}
```

Subpath imports are also available when a project wants narrower imports:

```tsx
import { Button } from '@senlerio/ui/atoms/button';
import { SearchableSelect } from '@senlerio/ui/compound/searchable-select';
import { LayoutContainer } from '@senlerio/ui/layout/container';
```

## App Shell

Use `AppShell` when a product needs the standard Senler sidebar and header behavior. The component owns the layout, desktop sidebar, mobile drawer, active menu state, header slots, footer slot, and breadcrumbs. The application provides navigation data, product-specific controls, and a router-specific link renderer.

```tsx
import { AppShell } from '@senlerio/ui/app-shell';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BotIcon, HomeIcon, SettingsIcon } from 'lucide-react';

const navigation = [
  {
    id: 'main',
    items: [
      { id: 'home', label: 'Home', href: '/', icon: HomeIcon, exact: true },
      { id: 'agents', label: 'Agents', href: '/agents', icon: BotIcon },
      { id: 'settings', label: 'Settings', href: '/settings', icon: SettingsIcon },
    ],
  },
];

export function Layout() {
  const location = useLocation();

  return (
    <AppShell
      brand={<span className="text-sm font-semibold">Senler</span>}
      sidebarHeaderActions={<AccountControls />}
      sidebarTop={<ProjectSelector />}
      sidebarFooter={<SidebarFooter />}
      navigation={navigation}
      currentPath={location.pathname}
      headerTitle="Agents"
      headerBreadcrumbs={[
        { id: 'home', label: 'Home', href: '/' },
        { id: 'agents', label: 'Agents' },
      ]}
      renderLink={({ href, className, children, item: _item, breadcrumb: _breadcrumb, ...props }) => (
        <NavLink to={href} className={className} {...props}>
          {children}
        </NavLink>
      )}
    >
      <Outlet />
    </AppShell>
  );
}
```

The default `standard` density remains unchanged. Product cabinets that need
the roomier Senler navigation can opt into the `comfortable` density and the
16.25 rem desktop/mobile widths without replacing `AppShell`:

```tsx
<AppShell
  sidebarDensity="comfortable"
  sidebarGroupTriggerBehavior="toggle"
  sidebarWidth="16.25rem"
  sidebarMobileWidth="16.25rem"
  sidebarTop={<ProjectSelector />}
  sidebarFooter={<ProjectLimits />}
  navigation={navigation}
  currentPath={location.pathname}
  renderLink={renderLink}
  brand={<SenlerBrand />}
>
  <Outlet />
</AppShell>
```

Navigation groups use `select` behavior by default. Set
`sidebarGroupTriggerBehavior="toggle"` when parent rows must expand and
collapse. A parent that also has an `href` renders separate navigation and
disclosure controls, so clicking the arrow never causes navigation.

Navigation items support nested disclosure, controlled expansion, plain or
badge counters, trailing status controls, AI/data attributes, and per-item
classes. Keep permissions and project state in the application and pass the
resulting navigation model to the library:

```tsx
const navigation = [{
  id: 'project',
  items: [{
    id: 'tools',
    label: 'Tools',
    defaultOpen: true,
    attributes: { 'data-ai-context-id': 'cabinet.project-tools' },
    items: visibleTools,
  }, {
    id: 'dialogs',
    label: 'Dialogs',
    href: '/dialogs',
    badge: unreadDialogs,
    badgeAppearance: 'plain',
    trailing: connectionStatus,
  }],
}];
```

String `match` values use exact or path-segment-prefix matching. Use a
`(currentPath) => boolean` matcher for query-aware or product-specific active
states. `AppSidebar` forwards ordinary `id`, `aria-*`, `data-*`, and event
attributes to its sidebar element.

The default `select` behavior treats parent rows as ordinary navigation
controls. Use `groupTriggerBehavior="toggle"` on `AppSidebar` (or the
`sidebarGroupTriggerBehavior` prop shown above on `AppShell`) for disclosure.
In 0.6, these semantic props replace the ambiguous
`legacy`/`interactive` disclosure API; disclosure icons are owned by toggle
controls and no longer configured separately.

`mobileSidebarOpen`, `defaultMobileSidebarOpen`, and
`onMobileSidebarOpenChange` allow controlled mobile navigation. Use
`renderHeader` when the product owns a custom header; it receives open, close,
and toggle controls for the mobile drawer. Styling hooks for the
header, top slot, navigation, groups, footer, and items are additive, so
applications can migrate one region at a time while preserving the existing
layout.

For a staged migration of an existing product sidebar, the same entrypoint
exports the low-level `SidebarProvider`, `Sidebar`, `SidebarInset`, header,
footer, group, menu, submenu, trigger, rail, badge, skeleton, and input
primitives. They support controlled desktop/mobile state, `offcanvas`, `icon`,
and non-collapsible modes, viewport or container positioning, configurable
widths, localized accessible labels,
an opt-in persistence cookie, and an opt-in keyboard shortcut. Product-specific
mobile gestures and native back handling stay in the application and connect through
`useSidebar().setOpenMobile`.

`SelectionActionBar` also supports `placement="viewport-bottom"` for a fixed
bulk-action toolbar that stays above the application's safe-area inset while
the selected rows remain visible.

Code highlighting is available from a separate entrypoint:

```tsx
import { CodeBlock } from '@senlerio/ui/code';
```

## License

MIT. See [LICENSE](LICENSE).

## Related packages

Iframe integration is provided by [@senlerio/bridge](https://github.com/SenlerBot/senler-bridge), independently of UI and React. Replace imports from `@senler/ui/bridge` with `@senlerio/bridge`.

The chat widget has its own [@senlerio/widget](https://github.com/SenlerBot/senler-widget) package for TypeScript types and loading, with optional React components in `@senlerio/widget/react`.
