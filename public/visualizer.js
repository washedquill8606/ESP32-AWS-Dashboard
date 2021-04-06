var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: __labels,
        datasets: [{
            label: 'Battery',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255,255,255,0.8)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});