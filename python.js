function range(a, b = null) {
    let start;
    let end;
    if (b === null) {
        start = 0;
        end = a;
    } else {
        start = a;
        end = b;
    }
    return [...Array(end - start).keys()].map(i => i + start);
}

function fillArray(value, len) {
    if (len == 0) return [];
    var a = [value];
    while (a.length * 2 <= len) a = a.concat(a);
    if (a.length < len) a = a.concat(a.slice(0, len - a.length));
    return a;
}