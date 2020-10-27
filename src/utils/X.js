function stringifyEvent(e) {
    const obj = {};

    for (let k in e) {
        obj[k] = e[k];
    }

    return JSON.stringify(obj, (k, v) => {
        if (v instanceof Node) return 'Node';
        if (v instanceof Window) return 'Window';
        return v;
    }, ' ');
}

export function X(msg, obj, color = "#994466", enable = true) {
    return enable
        ? console.log('%c%s', 'color: white; background: ' + color + ' ;', msg + ":" + stringifyEvent(obj))
        : null
}