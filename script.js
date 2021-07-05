function convolve(kernel, n) {
    pyramid = [kernel.concat(fillArray(0, n - kernel.length))];
    kernel = kernel.reverse();
    for (const t of range(1, n)) {
        row = [];
        for (const i of range(n)) {
            let val = range(0, Math.min(i + 1, kernel.length)).map(j => pyramid[t - 1][i - j] * kernel[kernel.length - j - 1]).reduce((a, b) => a + b, 0);
            row.push(val);
        }
        pyramid.push(row);
    }
    return pyramid;
}

function make_kernel(dice, hitchance) {
    return [hitchance].concat(fillArray((1 - hitchance) / dice, dice));
}

function distrib(hp, dice, hitchance) {
    let pyramid = convolve(make_kernel(dice, hitchance), hp);
    console.log(pyramid);
    let probs = [];
    for (const row of pyramid) {
        probs.push(range(Math.max(0, hp - dice), hp).map(i => (row[i] * (1 + (i + 1 - hp) / dice))).reduce((a, b) => a + b, 0));
    }
    return probs;
}

function compute() {
    let hp = parseInt(document.getElementById("hp").value);
    let dice = parseInt(document.getElementById("dice").value);
    let hit = parseInt(document.getElementById("hit").value) / 100;
    console.log(distrib(hp, dice, hit));
}
