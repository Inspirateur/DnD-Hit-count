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

function hist(html_id, data) {
    let ctx = document.getElementById(html_id).getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: range(data.length),
            datasets: [{
                label: '%',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: false
        }
    });
}