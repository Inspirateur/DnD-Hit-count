function* convolve_iter(kernel, max_i) {
    last_row = kernel.slice();
    kernel = kernel.reverse();
    while (true) {
        yield last_row;
        row = [];
        let val;
        for (const i in range(max_i)) {
            val = sum(range(min(i + 1, kernel.length)).map(j => (last_row[i - j] || 0) * kernel[kernel.length - j - 1]));
            row.push(val);
        }
        last_row = row;
    }
}

function make_kernel(dice, hitchance) {
    return [1 - hitchance].concat(fillArray((hitchance) / dice, dice));
}

function distrib(hp, dice, hitchance) {
    const dammages_per_turn = convolve_iter(make_kernel(dice, hitchance), hp);
    let cump = [];
    let dist = [];
    let last_total = 0;
    // we generate the next turn until the mob is >=99% dead
    while (last_total < 99) {
        let dammages = dammages_per_turn.next().value;
        // apparently positive float can just become negative due to precision errors in javascript 
        let total = abs(1 - sum(range(min(hp - 1, dammages.length)).map(i => dammages[i]))) * 100;
        cump.push(total < 0.01 ? 0 : total);
        let diff = abs(total - last_total);
        dist.push(diff < 0.01 ? 0 : diff);
        last_total = total;
    }
    return [dist, cump];
}

function compute() {
    let hp = parseInt(document.getElementById("hp").value);
    let dice = parseInt(document.getElementById("dice").value);
    let hit = parseInt(document.getElementById("hit").value) / 100;
    if (hit < .01) {
        hit = .01;
        document.getElementById("hit").value = "1";
    }
    let [dist, cump] = distrib(hp, dice, hit)
    labels = range(dist.length).map(i => i + 1);
    hist("dist", dist, labels);
    hist("cump", cump, labels);
}
