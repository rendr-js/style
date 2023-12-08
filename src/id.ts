let id = 0;

export let generateId = (name: string): string => name + '-' + (id++).toString(32);
