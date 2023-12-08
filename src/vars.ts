import { generateId } from './id.js';

export type Unit = 'px' | 'em' | 'rem' | '%' | 's' | 'ms';
export type VarNameMap<Key extends string> = Record<Key, { ref: string, set: (newValue: string) => void }>
export type VarDefinitions<Key extends string> = Record<Key, string>;

// export let createVar = <T, U extends T extends string ? void : string>(initialValue: T, unit?: U): [string, (newValue: T) => void] => {
//   let varName = `--${generateId()}}`;
//   let setValue = (newValue: T) => {
//     let formattedValue = typeof newValue === 'string' ? newValue : `${newValue}${unit ?? ''}`;
//     document.documentElement.style.setProperty(varName, formattedValue);
//   };
//   setValue(initialValue);
//   return [`var(${varName})`, setValue];
// };

export let createVars = <K extends string>(vars: VarDefinitions<K>): VarNameMap<K> => {
  let output = {} as VarNameMap<K>;
  for (let name in vars) {
    let ref = '--' + generateId(name);
    let set = (newValue: string) => {
      document.documentElement.style.setProperty(ref, newValue);
    };
    set(vars[name]);
    output[name] = { ref, set };
  }
  return output;
};
