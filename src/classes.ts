import { generateId } from './id.js';

export type CSS = Partial<CSSStyleDeclaration> & {
  selectors?: Record<string, Partial<CSSStyleDeclaration>>
};

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>
export type ClassDefinitions<ClassKey extends string = string> = Record<ClassKey, CSS>;

let CAP_LETTER_RE = new RegExp('[A-Z]', 'g')

let addDash = (m: string) => '-' + m.toLowerCase();
let camelTokebab = (s: string): string => {
  if (s !== s.toLowerCase()) {
    s = s.replace(CAP_LETTER_RE, addDash);
  }
  return s;
}

export let createClasses = <K extends string>(classes: ClassDefinitions<K>): ClassNameMap<K> => {
  let output = {} as ClassNameMap<K>;
  let textContent = '';
  for (let name in classes) {
    let className = generateId();
    textContent += '.' + className + '{' + cssToString(classes[name]) + '}';
    output[name] = className;
  }
  createStyleAndAppend(textContent);
  return output;
};

let style = document.createElement('style') as HTMLStyleElement;
document.head.appendChild(style);
let sheet = style.sheet!;
export let createClass = (css: CSS): string => {
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

export let createKeyframes = <K extends 'from' | 'to' | `${number}%`>(rules: ClassDefinitions<K>): string => {
  let name = generateId();
  let textContent = '@keyframes ' + name + '{';
  for (let rule in rules) {
    textContent += rule + '{' + cssToString(rules[rule] as CSS) + '}';
  }
  textContent += '}';
  createStyleAndAppend(textContent);
  return name;
};

export let createGlobalStyles = <K extends string>(styles: ClassDefinitions<K>): void => {
  let textContent = '';
  for (let name in styles) {
    textContent += name + '{' + cssToString(styles[name]) + '}';
  }
  createStyleAndAppend(textContent);
};

let createStyleAndAppend = (textContent: string): void => {
  let style = document.createElement('style');
  style.innerText = textContent;
  document.head.appendChild(style);
}
