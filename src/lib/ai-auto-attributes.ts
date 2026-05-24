import * as React from 'react';

export interface AiDataAttributes {
  'data-ai-area'?: string;
  'data-ai-section'?: string;
  'data-ai-label'?: string;
  'data-ai-kind'?: string;
  'data-ai-action'?: string;
  'data-ai-context-id'?: string;
  'data-ai-kb-doc-id'?: string;
  'data-ai-kb-query'?: string;
  'data-ai-entity-type'?: string;
  'data-ai-entity-id'?: string;
}

export const AI_KIND = {
  button: 'button',
  field: 'field',
  tab: 'tab',
  listItem: 'list-item',
} as const;

export const AI_ACTION = {
  save: 'save',
} as const;

const ICON_AI_LABELS = new Map([
  ['ArrowLeft', 'Назад / back'],
  ['ArrowRight', 'Вперед / next'],
  ['Check', 'Подтвердить / confirm'],
  ['CheckIcon', 'Подтвердить / confirm'],
  ['ChevronLeft', 'Назад / previous'],
  ['ChevronRight', 'Вперед / next'],
  ['Copy', 'Копировать / copy'],
  ['CopyIcon', 'Копировать / copy'],
  ['Download', 'Скачать / download'],
  ['Edit', 'Редактировать / edit'],
  ['Edit2', 'Редактировать / edit'],
  ['Ellipsis', 'Еще / more'],
  ['Eye', 'Показать / view'],
  ['MoreHorizontal', 'Еще / more'],
  ['MoreVertical', 'Еще / more'],
  ['Pencil', 'Редактировать / edit'],
  ['Plus', 'Добавить / add'],
  ['RefreshCw', 'Обновить / refresh'],
  ['RotateCw', 'Обновить / refresh'],
  ['Save', 'Сохранить / save'],
  ['Search', 'Поиск / search'],
  ['Settings', 'Настройки / settings'],
  ['Moon', 'Темная тема / dark theme'],
  ['Sun', 'Светлая тема / light theme'],
  ['Trash', 'Удалить / delete'],
  ['Trash2', 'Удалить / delete'],
  ['Upload', 'Загрузить / upload'],
  ['X', 'Закрыть / close'],
  ['XIcon', 'Закрыть / close'],
]);

function normalizeAiLabel(value: string | undefined): string | undefined {
  const normalized = value?.replace(/\s+/g, ' ').trim();

  return normalized && normalized.length > 0 ? normalized : undefined;
}

function getReactElementTypeName(type: React.ReactElement['type'] | object): string | undefined {
  if (typeof type === 'string') {
    return type;
  }

  if (typeof type === 'function') {
    return type.name;
  }

  if (typeof type === 'object' && type !== null) {
    const displayName = Object.getOwnPropertyDescriptor(type, 'displayName')?.value;

    return typeof displayName === 'string' ? displayName : undefined;
  }

  return undefined;
}

function getAiIconLabel(child: React.ReactElement): string | undefined {
  const typeName = getReactElementTypeName(child.type);

  return typeName ? ICON_AI_LABELS.get(typeName) : undefined;
}

export function getAiTextFromReactNode(children: React.ReactNode): string | undefined {
  const directText = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }

      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return getAiTextFromReactNode(child.props.children) ?? getAiIconLabel(child) ?? '';
      }

      return '';
    })
    .filter(Boolean)
    .join(' ');

  return normalizeAiLabel(directText);
}

export function getAiLabelFallback(
  explicitLabel: string | undefined,
  ariaLabel: string | undefined,
  title: string | undefined,
  placeholder: string | undefined,
  name: string | undefined,
  children?: React.ReactNode,
): string | undefined {
  return (
    normalizeAiLabel(explicitLabel) ??
    normalizeAiLabel(ariaLabel) ??
    normalizeAiLabel(title) ??
    normalizeAiLabel(placeholder) ??
    normalizeAiLabel(name) ??
    getAiTextFromReactNode(children)
  );
}
