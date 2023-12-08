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
  for (let name in classes) {
    let className = '_' + (id++).toString(32);
    let style = document.createElement('style');
    style.innerText = '.' + className + '{' + cssToString(classes[name]) + '}';
    document.head.appendChild(style);
    output[name] = className;
  }
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
    textContent += '&' + selector + '{' + cssToString(css.selectors[selector]) + '}';
  }
  return textContent;
};

type KeyFrame = 'from' | 'to' | `${number}%`;

export let createKeyframes = (rules: Record<KeyFrame, Partial<CSSKeyframeRule['style']>>): string => {
  let name = '_' + (id++).toString(32);
  let textContent = '@keyframes ' + name + '{';
  let rule: KeyFrame;
  for (rule in rules) {
    let styles = rules[rule];
    textContent += rule + '{';
    for (let style in styles) {
      textContent += style + ':' + styles[style] + ';';
    }
    textContent += '}';
  }
  let style = document.createElement('style');
  style.innerText = textContent + '}';
  document.head.appendChild(style);
  return name;
};
