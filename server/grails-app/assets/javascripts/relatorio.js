function buildPieChart(elementName, chartTitle, seriesName, data, drilldown) {
    if (chartTitle == null && typeof chartTitle === 'undefined') chartTitle = '';
    if (drilldown == null || typeof drilldown === 'undefined') drilldown = null;

    Highcharts.setOptions({
       lang: {
           downloadCSV: 'Download CSV',
           downloadJPEG: 'Download imagem JPEG',
           downloadPDF: 'Download documento PDF',
           downloadPNG: 'Download imagem PNG',
           downloadSVG: 'Download imagem vetorial SVG',
           downloadXLS: 'Download XLS',
           drillUpText: 'Voltar para {series.name}',
           printChart: 'Imprimir gráfico'
       }
    });

    return Highcharts.chart(elementName, {
        chart: {
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: chartTitle,
            useHTML: true
        },
        legend: {
            enabled: false
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 690
                },
                chartOptions: {
                    legend: {
                        enabled: true,
                        align: 'center',
                        layout: 'horizontal',
                        verticalAlign: 'bottom',
                        labelFormat: '{name}: {y} ({percentage:.2f}%)'
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    }
                }
            }]
        },
        tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} ({point.percentage:.2f}%)</b><br/>'
        },
        plotOptions: {
            series: {
                allowPointSelect: drilldown == null
            }
        },
        series: [{
            name: seriesName,
            colorByPoint: true,
            data: data,
            dataLabels: {
                format: '{point.name}: {point.y} ({point.percentage:.2f}%)'
            }
        }],
        drilldown: {
            series: drilldown
        }
    });
}

$(function(){
    $('#btn-print').click(function (e) {
        window.print();
    });
});