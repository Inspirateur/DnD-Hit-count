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

function sum(it) {
    return it.reduce((a, b) => a + b, 0);
}

function min(...values) {
    return Math.min(...values);
}

function abs(value) {
    return Math.abs(value);
}


let _hists = {};

function hist(html_id, data, title, labels = null) {
    let ctx = document.getElementById(html_id).getContext('2d');
    let handle;
    if (html_id in _hists) {
        handle = _hists[html_id];
    } else {
        handle = new Chart(ctx, {});
    }
    handle.destroy();
    if (labels === null) {
        labels = range(data.length)
    }
    handle = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
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
                },
                title: {
                    display: true,
                    color: "white",
                    text: title
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