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

let _hists = {};

function hist(html_id, data) {
    let ctx = document.getElementById(html_id).getContext('2d');
    let handle;
    if (html_id in _hists) {
        handle = _hists[html_id];
    } else {
        handle = new Chart(ctx, {});
    }
    handle.destroy();
    handle = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: range(data.length),
            datasets: [{
                label: '%',
                data: data,
                backgroundColor: [
                    'rgba(99, 132, 255, 0.4)'
                ],
                borderColor: [
                    'rgba(99, 132, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: { color: "white" }
                }
            },
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true,
                        color: "white"
                    }
                },
                x: {
                    ticks: {
                        color: "white"
                    }
                }
            },
            responsive: false
        }
    });
    _hists[html_id] = handle;
}