import { CSS } from './css.js';
import { sheet } from './sheet.js';
import { generateId, cssToString } from './utils.js';

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
  