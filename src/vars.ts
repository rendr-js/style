import { generateId } from './id.js';

export let createVar = <T, U extends T extends string ? void : string>(initialValue: T, unit?: U): [string, (newValue: T) => void] => {
  let varName = `--${generateId()}`;
  let setValue = (newValue: T) => {
    let formattedValue = typeof newValue === 'string' ? newValue : `${newValue}${unit ?? ''}`;
    document.documentElement.style.setProperty(varName, formattedValue);
  };
  setValue(initialValue);
  return [`var(${varName})`, setValue];
};
