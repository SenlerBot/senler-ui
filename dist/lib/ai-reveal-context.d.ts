import * as React from 'react';
import type { AiDataAttributes } from './ai-auto-attributes';
export type AiRevealAction = NonNullable<AiDataAttributes['data-ai-reveal-action']>;
type AiRevealAttributes = Pick<AiDataAttributes, 'data-ai-reveals-context-id' | 'data-ai-reveal-action'>;
export declare function collectAiContextIds(children: React.ReactNode): string[];
export declare function mergeAiRevealContextIds(explicitValue: string | undefined, inferredContextIds: string[]): string | undefined;
export declare function AiRevealContextProvider({ children, contextIds, }: {
    children: React.ReactNode;
    contextIds?: string[];
}): import("react/jsx-runtime").JSX.Element;
export declare function useAiRevealAttributes(explicitContextIds: string | undefined, explicitAction: AiRevealAction | undefined, additionalContextIds?: string[]): AiRevealAttributes;
export {};
