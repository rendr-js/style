let id = 0;

export let generateId = (): string =>  '_' + (id++).toString(32);
