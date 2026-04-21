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
- Optional code highlighting: `CodeBlock` from `@senler/ui/code`.

## Install

```bash
npm install https://github.com/SenlerBot/senler-ui/archive/refs/tags/v0.3.5.tar.gz
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

Code highlighting is available from a separate entrypoint:

```tsx
import { CodeBlock } from '@senler/ui/code';
```

## License

Use of this package is permitted only under an agreement with Senler.
