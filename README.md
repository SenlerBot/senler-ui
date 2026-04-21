# @senler/ui

Shared Senler React UI components.

## Install

```bash
npm install git+ssh://git@gitlab.collabox.dev/aibot/senler-ui.git
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

This repository is updated from `aibot-cabinet/packages/senler-ui`.
Make component changes in cabinet, then run:

```bash
npm run ui:sync
```
