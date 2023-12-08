let classNameId = 0;

export type CSS = Partial<CSSStyleDeclaration> & {
  selectors?: Record<string, Partial<CSSStyleDeclaration>>
};

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>
export type ClassDefinitions<ClassKey extends string = string> = Record<ClassKey, CSS>;

export let createClasses = <K extends string>(classes: ClassDefinitions<K>): ClassNameMap<K> => {
  let output = {} as ClassNameMap<K>;
  for (let name in classes) {
    let className = '_' + (classNameId++).toString(32);
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
      textContent += prop + ':' + css[prop] + ';';
    }
  }
  for (let selector in css.selectors) {
    textContent += '&' + selector + cssToString(css.selectors[selector]);
  }
  return textContent;
};
