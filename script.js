function convolve(kernel, n) {
    cumul = [kernel.concat(fillArray(0, n - kernel.length))];
    kernel = kernel.reverse();
    for (const t of range(1, n)) {
        row = [];
        for (const i of range(n)) {
            let val = range(0, Math.min(i + 1, kernel.length)).map(j => cumul[t - 1][i - j] * kernel[kernel.length - j - 1]).reduce((a, b) => a + b, 0);
            row.push(val);
        }
        cumul.push(row);
    }
    return cumul;
}

function make_kernel(dice, hitchance) {
    return [hitchance].concat(fillArray((1 - hitchance) / dice, dice));
}

function distrib(hp, dice, hitchance) {
    let dammages = convolve(make_kernel(dice, hitchance), Math.floor(hp * (1 / hitchance)));
    let cump = [0];
    let dist = [0];
    let last_total = 0;
    for (const row of dammages) {
        let total = (1 - range(0, hp).map(i => row[i]).reduce((a, b) => a + b, 0)) * 100;
        cump.push(total);
        let diff = Math.abs(total - last_total);
        dist.push(diff < 0.0001 ? 0 : diff);
        last_total = total;
    }
    return [dist, cump];
}

function compute() {
    let hp = parseInt(document.getElementById("hp").value);
    let dice = parseInt(document.getElementById("dice").value);
    let hit = parseInt(document.getElementById("hit").value) / 100;
    let [dist, cump] = distrib(hp, dice, hit)
    hist("dist", dist);
    hist("cump", cump);
}
