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
