import * as React from 'react';
import { Highlight } from 'prism-react-renderer';
interface CodeBlockProps extends Partial<React.ComponentProps<typeof Highlight>> {
    formatData?: (value: string) => void;
}
declare function CodeBlock({ theme, language, code, ...props }: CodeBlockProps): import("react/jsx-runtime").JSX.Element;
export { CodeBlock };
