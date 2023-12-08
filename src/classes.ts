let id = 0;

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
    let className = '_' + (id++).toString(32);
    textContent += '.' + className + '{' + cssToString(classes[name]) + '}';
    output[name] = className;
  }
  createStyleAndAppend(textContent);
  return output;
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
  let name = '_' + (id++).toString(32);
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
