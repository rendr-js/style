import { sheet } from './sheet.js';
import { cssToString, generateId } from './utils.js';
import { CSS } from './css.js';

export let createStyle = (css: CSS): string => {
  let className = generateId();
  let textContent = '.' + className + '{' + cssToString(css) + '}';
  sheet.insertRule(textContent, sheet.cssRules.length);
  return className;
};

export let createGlobalStyle = (selector: string, styles: CSS): void => {
  sheet.insertRule(selector + '{' + cssToString(styles) + '}');
};
