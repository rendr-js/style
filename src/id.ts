let id = 0;

export let generateFastId = (): string => '_' + (id++).toString(32);

export let generateId = generateFastId;

export let debug = (): void => {
    generateId = generateDebugId;
}

export let generateDebugId = (): string => {
    let obj: { stack?: any[] } = {};
    let prepare = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
        return stack;
    }
    Error.captureStackTrace(obj);
    Error.prepareStackTrace = prepare;
    let name = obj.stack?.[1].getFunctionName();
    return name + generateFastId();
}