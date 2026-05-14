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
export declare const AI_KIND: {
    readonly button: "button";
    readonly field: "field";
    readonly tab: "tab";
    readonly listItem: "list-item";
};
export declare const AI_ACTION: {
    readonly save: "save";
};
export declare function getAiTextFromReactNode(children: React.ReactNode): string | undefined;
export declare function getAiLabelFallback(explicitLabel: string | undefined, ariaLabel: string | undefined, title: string | undefined, placeholder: string | undefined, name: string | undefined, children?: React.ReactNode): string | undefined;
