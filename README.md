# @senler/ui

Senler UI is a shared React 19 component library for Senler frontends. It contains the reusable UI core that can be developed inside the cabinet and then shipped as a standalone package for other projects.

Documentation: [ui.senler.io](https://ui.senler.io)

## What Is Included

- Shared CSS tokens and base component styles via `@senler/ui/styles.css`.
- Core actions and feedback: `Button`, `Badge`, `Alert`, `Progress`, `Skeleton`, `Spinner`, `PageLoader`, `Announce`, `Empty`.
- Form controls: `Input`, `Textarea`, `CheckBox`, `RadioGroup`, `Switch`, `Slider`, `Select`, `Label`, `Field`, `Form`, `InputField`.
- Surfaces and content: `Card`, `Table`, `Img`, `ImagePreview`, `Separator`, `ScrollArea`, `VisuallyHidden`, `SvgIcon`.
- Overlays and menus: `Dialog`, `AlertDialog`, `Sheet`, `Popover`, `Tooltip`, `HoverCard`, `DropdownMenu`, `ContextMenu`, `Menubar`.
- Navigation and disclosure primitives: `Tabs`, `Accordion`, `Collapsible`, `Link`.
- Layout helpers: `LayoutContainer`, `LayoutSection`, `LayoutField`.
- Optional code highlighting: `CodeBlock` from `@senler/ui/code`.

## Install

```bash
npm install https://github.com/SenlerBot/senler-ui/archive/refs/tags/v0.3.4.tar.gz
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

Optional code highlighting is exported separately so the core entrypoint does not pull `prism-react-renderer` into apps that do not use it:

```tsx
import { CodeBlock } from '@senler/ui/code';
```

## Source Of Truth

The source package lives in `aibot-cabinet/packages/senler-ui`.
Make reusable UI changes there, verify them in cabinet or Storybook, then run:

```bash
npm run ui:sync
```

`src/shared/ui` in cabinet is kept as a compatibility layer for application code and cabinet-only components.

## License

UNLICENSED. Public access is provided for installation, but reuse is not granted without permission from Senler.
