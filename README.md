# @senler/ui

Shared Senler React UI components.

## Install

```bash
npm install git+ssh://git@gitlab.collabox.dev/aibot/senler-ui.git
```

Requires React 19:

```bash
npm install react@^19 react-dom@^19
```

## Usage

```tsx
import '@senler/ui/styles.css';
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

## Source Of Truth

The source package lives in `aibot-cabinet/packages/senler-ui`.
Make reusable UI changes there, verify them in cabinet or Storybook, then run:

```bash
npm run ui:sync
```

`src/shared/ui` in cabinet is kept as a compatibility layer for application code and cabinet-only components.
