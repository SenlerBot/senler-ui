import * as React from 'react';
import { Highlight, type PrismTheme } from 'prism-react-renderer';
import { cn } from '@/shared/lib/utils';

interface CodeBlockProps
  extends Partial<React.ComponentProps<typeof Highlight>> {
  formatData?: (value: string) => void;
}

function CodeBlock({
  theme = defaultTheme,
  language = 'json',
  code = '',
  ...props
}: CodeBlockProps) {
  return (
    <Highlight code={code} language={language} theme={theme} {...props}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(
            className,
            'p-4 overflow-auto rounded-lg bg-muted/50',
            'font-mono text-sm leading-relaxed'
          )}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={`line-${i}`} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={`token-${i}-${key}`} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

const defaultTheme = {
  plain: {
    color: 'hsl(var(--foreground))',
    backgroundColor: 'inherit',
  },
  styles: [
    {
      types: ['comment', 'block-comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: 'hsl(var(--muted-foreground))',
        fontStyle: 'italic',
      },
    },
    {
      types: ['keyword', 'control', 'directive', 'unit'],
      style: {
        color: '#8F2CE7',
      },
    },
    {
      types: ['string', 'char', 'template-string', 'attr-value'],
      style: {
        color: '#006656',
      },
    },
    {
      types: ['number', 'boolean', 'constant'],
      style: {
        color: '#1F66A3',
      },
    },
    {
      types: ['function', 'builtin'],
      style: {
        color: '#B5500B',
      },
    },
    {
      types: ['tag', 'selector', 'attr-name'],
      style: {
        color: '#8F2CE7',
      },
    },
    {
      types: ['variable', 'property'],
      style: {
        color: '#C24100',
      },
    },
    {
      types: ['operator', 'punctuation', 'symbol'],
      style: {
        color: 'hsl(var(--foreground))',
      },
    },
    {
      types: ['class-name', 'maybe-class-name'],
      style: {
        color: '#1F66A3',
      },
    },
  ],
} satisfies PrismTheme;

export { CodeBlock };
