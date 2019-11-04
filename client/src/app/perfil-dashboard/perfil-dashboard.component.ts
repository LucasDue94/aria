import {Component, DoCheck, HostListener, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {MenuService} from "../core/menu/menu.service";
import {faExpand} from "@fortawesome/free-solid-svg-icons/faExpand";

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'perfil-dashboard',
  templateUrl: './perfil-dashboard.component.html',
  styleUrls: ['./perfil-dashboard.component.scss']
})
export class PerfilDashboardComponent implements OnInit, DoCheck {

  faExpand = faExpand;
  menuStatus: boolean;
  public optionsCid: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'PACIENTES POR CID',
      style: {
        fontSize: '18px',
        fontWeight: '500'
      }
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Population',
      data: [
        ['Cid 1', 24.2],
        ['Cid 2', 20.8],
        ['Cid 3', 14.9],
        ['Cid 4', 13.7],
        ['Cid 5', 8.1],
        ['Cid 6', 4.7],
        ['Cid 7', 0.4],
      ],
      dataLabels: {
        enabled: true,
        rotation: 0,
        color: '#000',
        align: 'center',
        format: '<b>{point.y:.1f}</b>%',
        y: 0, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    }]
  };
  public optionsIdade: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'INTERVALOS DE IDADES',
      style: {
        fontSize: '18px',
        fontWeight: '500'
      }
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)'
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Population',
      data: [
        ['18 anos - 30 anos', 162],
        ['30 anos - 60 anos', 1056],
        ['60 anos - 79 anos', 1111],
        ['Maior que 80 anos', 277],
      ],
      dataLabels: {
        enabled: true,
        rotation: 0,
        color: '#000',
        align: 'center',
        y: 0, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Roboto, sans-serif'
        }
      }
    }]
  };
  public optionsMotivoAlta: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'MOTIVOS DE ALTA',
      style: {
        fontSize: '18px',
        fontWeight: '500'
      }
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Número de altas'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
    },
    series: [{
      name: 'Population',
      data: [
        ['motivo 1', 201],
        ['motivo 2', 100],
        ['motivo 3', 50],
        ['motivo 4', 24],
        ['motivo 5', 10],
      ],
      dataLabels: {
        enabled: true,
        rotation: 0,
        color: '#000',
        align: 'center',
        y: 0, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    }]
  };
  public optionsSexo: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'PACIENTES POR SEXO',
      style: {
        fontSize: '18px',
        fontWeight: '500'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          // enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          distance: -35,
        },
        // showInLegend: true
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Homem',
        y: 53
      }, {
        name: 'Mulher',
        y: 47
      }]
    }]
  };

  constructor(private menuService: MenuService) {}

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.reflowCharts()
  }

  reflowCharts() {
    Highcharts.chart('motivo-alta', this.optionsMotivoAlta).redraw()
    Highcharts.chart('sexo', this.optionsSexo).redraw();
    Highcharts.chart('idade', this.optionsIdade).redraw();
    Highcharts.chart('cid', this.optionsCid).redraw();
  }

  ngOnInit() {
    this.menuService.getStatus().subscribe(status => {
      if (status != this.menuStatus) {
        setTimeout(() => {
          this.reflowCharts();
        }, 300)
      }
      this.menuStatus = status
    });
  }

  ngDoCheck(): void {
    this.menuService.getStatus().subscribe(status => {
      if (status != this.menuStatus) {
        this.reflowCharts()
      }
      this.menuStatus = status
    });
  }

}
