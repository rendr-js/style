
let classNameId = 0;

export type CSS = Partial<CSSStyleDeclaration> & {
  selectors?: Record<string, Partial<CSSStyleDeclaration>>
};

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>
export type ClassDefinitions<ClassKey extends string = string> = Record<ClassKey, CSS>;

export let createClasses = <K extends string>(classes: ClassDefinitions<K>): ClassNameMap<K> => {
  let output = {} as ClassNameMap<K>;
  for (let name in classes) {
    let className = `_${(classNameId++).toString(32)}`;
    let style = document.createElement('style');
    style.innerText = `.${className}{${cssToString(classes[name])}}`;
    document.head.appendChild(style);
    output[name] = className;
  }
  return output;
};

let cssToString = (css: CSS): string => {
  let textContent = '';
  for (let prop in css) {
    if (prop !== 'selectors') {
      textContent += `${prop}:${css[prop]};`;
    }
  }
  for (let selector in css.selectors) {
    textContent += `&${selector}{${cssToString(css.selectors[selector])}}`;
  }
  return textContent;
};

let varNameId = 0;

export let createVar = <T, U extends T extends string ? void : string>(initialValue: T, unit?: U): [string, (newValue: T) => void] => {
  let varName = `--_${(varNameId++).toString(32)}`;
  let setValue = (newValue: T) => {
    let formattedValue = typeof newValue === 'string' ? newValue : `${newValue}${unit ?? ''}`;
    document.documentElement.style.setProperty(varName, formattedValue);
  };
  setValue(initialValue);
  return [`var(${varName})`, setValue];
};
