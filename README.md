# @senler/ui

Senler UI is a React 19 component library for building Senler-compatible interfaces. It provides shared styles, design tokens, layout helpers, and accessible UI primitives for product screens, forms, dialogs, menus, and content blocks.

Documentation: [ui.senler.io](https://ui.senler.io)

## What Is Included

- Shared CSS tokens and base component styles via `@senler/ui/styles.css`.
- Core actions and feedback: `Button`, `Badge`, `Alert`, `Progress`, `Skeleton`, `Spinner`, `PageLoader`, `Announce`, `Empty`.
- Form controls: `Input`, `Textarea`, `CheckBox`, `RadioGroup`, `Switch`, `Slider`, `Select`, `Label`, `Field`, `Form`, `InputField`.
- Surfaces and content: `Card`, `Table`, `Img`, `ImagePreview`, `Separator`, `ScrollArea`, `VisuallyHidden`, `SvgIcon`.
- Overlays and menus: `Dialog`, `AlertDialog`, `Sheet`, `Popover`, `Tooltip`, `HoverCard`, `DropdownMenu`, `ContextMenu`, `Menubar`.
- Navigation and disclosure primitives: `Tabs`, `Accordion`, `Collapsible`, `Link`.
- Layout helpers: `LayoutContainer`, `LayoutSection`, `LayoutField`.
- Application shell: `AppShell`, `AppSidebar`, `AppHeader` from `@senler/ui/app-shell`.
- Optional code highlighting: `CodeBlock` from `@senler/ui/code`.

## Install

```bash
npm install https://github.com/SenlerBot/senler-ui/archive/refs/tags/v0.5.0.tar.gz
```

Requires React 19 and `lucide-react`:

```bash
npm install react@^19 react-dom@^19 lucide-react
```

## Usage

Import the stylesheet once in the application entrypoint:

```tsx
import '@senler/ui/styles.css';
```

Then import components from the root entrypoint:

```tsx
import { Button, DialogRoot, DialogContent, Input } from '@senler/ui';

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
import { Button } from '@senler/ui/atoms/button';
import { LayoutContainer } from '@senler/ui/layout/container';
```

## App Shell

Use `AppShell` when a product needs the standard Senler sidebar and header behavior. The component owns the layout, desktop sidebar, mobile drawer, active menu state, header slots, footer slot, and breadcrumbs. The application provides navigation data, product-specific controls, and a router-specific link renderer.

```tsx
import { AppShell } from '@senler/ui/app-shell';
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

Code highlighting is available from a separate entrypoint:

```tsx
import { CodeBlock } from '@senler/ui/code';
```

## License

Use of this package is permitted only under an agreement with Senler.
