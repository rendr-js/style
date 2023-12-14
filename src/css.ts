export type CSS = Partial<CSSStyleDeclaration> & {
  selectors?: Record<string, CSS>
};
