import * as React from 'react';

import type { AiDataAttributes } from './ai-auto-attributes';

export type AiRevealAction = NonNullable<AiDataAttributes['data-ai-reveal-action']>;

type AiRevealContextValue = {
  contextIds: string[];
};

type AiRevealAttributes = Pick<
  AiDataAttributes,
  'data-ai-reveals-context-id' | 'data-ai-reveal-action'
>;

const AiRevealContext = React.createContext<AiRevealContextValue | null>(null);

export function collectAiContextIds(children: React.ReactNode): string[] {
  const contextIds = new Set<string>();

  function visit(node: React.ReactNode): void {
    React.Children.forEach(node, (child) => {
      if (
        !React.isValidElement<
          { children?: React.ReactNode } & AiDataAttributes
        >(child)
      ) {
        return;
      }

      const contextId = child.props['data-ai-context-id']?.trim();
      if (contextId) {
        contextIds.add(contextId);
      }
      visit(child.props.children);
    });
  }

  visit(children);
  return Array.from(contextIds);
}

export function mergeAiRevealContextIds(
  explicitValue: string | undefined,
  inferredContextIds: string[],
): string | undefined {
  const contextIds = new Set(
    explicitValue
      ?.split(/\s+/u)
      .map((contextId) => contextId.trim())
      .filter(Boolean) ?? [],
  );
  inferredContextIds.forEach((contextId) => {
    const normalizedContextId = contextId.trim();
    if (normalizedContextId) {
      contextIds.add(normalizedContextId);
    }
  });

  return contextIds.size > 0 ? Array.from(contextIds).join(' ') : undefined;
}

export function AiRevealContextProvider({
  children,
  contextIds,
}: {
  children: React.ReactNode;
  contextIds?: string[];
}) {
  const collectedContextIds = React.useMemo(
    () => contextIds ?? collectAiContextIds(children),
    [children, contextIds],
  );
  const value = React.useMemo(
    () => ({ contextIds: collectedContextIds }),
    [collectedContextIds],
  );

  return (
    <AiRevealContext.Provider value={value}>
      {children}
    </AiRevealContext.Provider>
  );
}

export function useAiRevealAttributes(
  explicitContextIds: string | undefined,
  explicitAction: AiRevealAction | undefined,
  additionalContextIds: string[] = [],
): AiRevealAttributes {
  const inheritedContext = React.useContext(AiRevealContext);
  const revealsContextId = mergeAiRevealContextIds(explicitContextIds, [
    ...(inheritedContext?.contextIds ?? []),
    ...additionalContextIds,
  ]);

  return {
    'data-ai-reveals-context-id': revealsContextId,
    'data-ai-reveal-action': revealsContextId
      ? (explicitAction ?? 'click')
      : undefined,
  };
}
