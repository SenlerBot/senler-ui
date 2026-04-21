export declare function literalKeys<const TValue extends Record<string, string>>(value: TValue): Extract<keyof TValue, string>[];
