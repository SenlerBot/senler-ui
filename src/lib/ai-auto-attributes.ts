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

function normalizeAiLabel(value: string | undefined): string | undefined {
  const normalized = value?.replace(/\s+/g, ' ').trim();

  return normalized && normalized.length > 0 ? normalized : undefined;
}

export function getAiTextFromReactNode(children: React.ReactNode): string | undefined {
  const directText = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }

      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return getAiTextFromReactNode(child.props.children) ?? '';
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
