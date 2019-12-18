import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Chart} from "angular-highcharts";
import {TitleService} from "../../../core/title/title.service";

@Component({
  selector: 'app-apache-report',
  templateUrl: './apache-report.component.html',
  styleUrls: ['./apache-report.component.scss']
})
export class ApacheReportComponent implements OnInit {

  faSearch = faSearch;
  apacheChart: Chart;

  constructor(private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.send('Relatório de Apache')
    this.apacheChart = new Chart(this.optionsApache);
  }

  public optionsApache: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Apache - CTI'
    },
    xAxis: {
      categories: this.getKeysChartApache()
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantidade'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold'
        }
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    credits: {
      enabled: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{
      name: 'Alta Melhorado',
      data: [5, 3, 4, 7, 2, 8, 3, 6]
    }, {
      name: 'Óbito',
      data: [2, 2, 3, 2, 1, 2, 5, 6]
    }],

  }

  getKeysChartApache(key?: string) {
    return [
      'APPROXIMATE DEATH RATE 4% NON-OP, 1% POST-OP',
      '8% NON-OP, 3% POST-OP',
      '15% NON-OP, 7% POST-OP',
      '24% NON-OP, 12% POST-OP',
      '40% NON-OP, 30% POST-OP',
      '55% NON-OP, 35% POST-OP',
      'APROXIMATELY 73% BOTH',
      '85% NON-OP, 88% POST-OP'
    ];
  }
}
