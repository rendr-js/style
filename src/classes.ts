import { generateId } from './id.js';

export type CSS = Partial<CSSStyleDeclaration> & {
  selectors?: Record<string, Partial<CSSStyleDeclaration>>
};

export type ClassDefinitions<ClassKey extends string> = Record<ClassKey, CSS>;

let CAP_LETTER_RE = new RegExp('[A-Z]', 'g')

let addDash = (m: string) => '-' + m.toLowerCase();
let camelTokebab = (s: string): string => {
  if (s !== s.toLowerCase()) {
    s = s.replace(CAP_LETTER_RE, addDash);
  }
  return s;
}

let style = document.createElement('style') as HTMLStyleElement;
document.head.appendChild(style);
let sheet = style.sheet!;

export let createStyle = (css: CSS): string => {
  let className = generateId();
  let textContent = '.' + className + '{' + cssToString(css) + '}';
  sheet.insertRule(textContent);
  return className;
};

export let cssToString = (css: CSS): string => {
  let textContent = '';
  for (let prop in css) {
    if (prop !== 'selectors') {
      textContent += camelTokebab(prop) + ':' + css[prop] + ';';
    }
  }
  for (let selector in css.selectors) {
    textContent += selector + '{' + cssToString(css.selectors[selector]) + '}';
  }
  return textContent;
};

export let createKeyframes = <K extends 'from' | 'to' | `${number}%`>(rules: Record<K, CSS>): string => {
  let name = generateId();
  let textContent = '@keyframes ' + name + '{';
  for (let rule in rules) {
    textContent += rule + '{' + cssToString(rules[rule] as CSS) + '}';
  }
  textContent += '}';
  sheet.insertRule(textContent);
  return name;
};

export let createGlobalStyle = (selector: string, styles: CSS): void => {
  sheet.insertRule(selector + '{' + cssToString(styles) + '}');
};
