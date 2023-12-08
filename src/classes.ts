import { generateId } from './id.js';

export type CSS = Partial<CSSStyleDeclaration> & {
  selectors?: Record<string, Partial<CSSStyleDeclaration>>
};

export type ClassNameMap<ClassKey extends string> = Record<ClassKey, string>
export type ClassDefinitions<ClassKey extends string> = Record<ClassKey, CSS>;

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
    let className = generateId(name);
    textContent += '.' + className + '{' + cssToString(classes[name]) + '}';
    output[name] = className;
  }
  createStyleAndAppend(textContent);
  return output;
};

let style = document.createElement('style') as HTMLStyleElement;
document.head.appendChild(style);
let sheet = style.sheet!;
// export let createClass = (css: CSS): string => {
//   let className = generateId();
//   let textContent = '.' + className + '{' + cssToString(css) + '}';
//   sheet.insertRule(textContent);
//   return className;
// };

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

export type KeyFramesNameMap<Key extends string> = Record<Key, string>
export type KeyFramesDefinitions<Key extends string> = Record<Key, ClassDefinitions<'from' | 'to' | `${number}%`>>;

export let createKeyframes = <K extends string>(keyframesSets: KeyFramesDefinitions<K>): KeyFramesNameMap<K> => {
  let textContent = '';
  let output = {} as KeyFramesNameMap<K>;
  for (let name in keyframesSets) {
    let keyframesName = generateId(name);
    textContent += '@keyframes ' + keyframesName + '{';
    for (let rule in keyframesSets[name]) {
      textContent += rule + '{' + cssToString(keyframesSets[name][rule] as CSS) + '}';
    }
    textContent += '}';
    output[name] = keyframesName;
  }
  createStyleAndAppend(textContent);
  return output;
};

export let createGlobalStyles = <K extends string>(styles: ClassDefinitions<K>): void => {
  let textContent = '';
  for (let name in styles) {
    textContent += name + '{' + cssToString(styles[name]) + '}';
  }
  createStyleAndAppend(textContent);
};

let createStyleAndAppend = (textContent: string): void => {
  // let style = document.createElement('style');
  // style.innerText = textContent;
  // document.head.appendChild(style);
  sheet.insertRule(textContent);
}
