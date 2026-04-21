export function literalKeys<const TValue extends Record<string, string>>(value: TValue) {
  return Object.keys(value).filter(
    (key): key is Extract<keyof TValue, string> => key in value,
  );
}
