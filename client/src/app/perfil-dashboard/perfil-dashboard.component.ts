import {AfterViewInit, Component, DoCheck, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {MenuService} from "../core/menu/menu.service";
import {
  faBabyCarriage,
  faExpand,
  faFemale,
  faFrown,
  faHandMiddleFinger,
  faMale
} from "@fortawesome/free-solid-svg-icons/";
import {SpinnerService} from "../core/spinner/spinner.service";
import {FormArray, FormBuilder} from "@angular/forms";
import {PerfilService} from "../core/perfil/perfil.service";
import {AlertService} from "../core/alert/alert.service";

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
export class PerfilDashboardComponent implements OnInit, DoCheck, AfterViewInit {
  @ViewChild('buttonPediatrico', {static: false}) buttonPediatrico;
  @ViewChild('buttonAdulto', {static: false}) buttonAdulto;
  faExpand = faExpand;
  faMale = faMale;
  faFemale = faFemale;
  faBabyCarriage = faBabyCarriage;
  menuStatus: boolean;
  defaultPlotOptions = {
    series: {
      labels: {
        style: {
          fontSize: '14px',
          fontFamily: 'Roboto, sans-serif',
          color: '#5A5B5B'
        },
      }, dataLabels: {
        style: {
          fontSize: '14px',
          fontFamily: 'Roboto, sans-serif',
          color: '#5A5B5B'
        },
      }
    }
  };
  defaultLabels = {
    rotation: 0,
    style: {
      fontSize: '13px',
      fontFamily: 'Roboto, sans-serif'
    },
  };
  public optionsCid: any = {
    chart: {
      zoomType: 'xy'
    },
    plotOptions: this.defaultPlotOptions,
    title: {
      text: 'PACIENTES POR CID',
      style: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#5A5B5B'

      }
    },
    xAxis: {
      categories: ['CID 1', 'CID 2', 'CID 3', 'CID 4', 'CID 5', 'CID 6', 'CID 7'],
      type: 'Tipos de cid',
      labels: this.defaultLabels,
    },
    yAxis: [{
      labels: {
        format: '{value}'
      },
      title: {
        text: 'Número de cids',
      }
    }, {
      labels: {
        format: '{value} %'
      },
      title: {
        text: 'Porcentagem',
      },
      opposite: true
    }],
    tooltip: {
      shared: true,
      formatter: function () {
        return this.points.reduce(function (s, point) {
          if (point.series.name == 'Porcentagem') {
            return s + '<br/>' + point.series.name + ': ' +
              '<b>' + point.y + '%' + '</b>';
          } else {
            return s + '<br/>' + point.series.name + ': ' +
              '<b>' + point.y + '</b>';
          }
        }, '<b>' + this.x + '</b>');
      }
    }, credits: {
      enabled: false
    },

    series: [{
      name: 'Quantidade',
      type: 'column',
      data: [['CID 1', 400], ['CID 2', 200], ['CID 3', 150], ['CID 4', 100], ['CID 5', 50], ['CID 6', 35], ['CID 7', 15]],
      color: '#C24D4D',
    }, {
      yAxis: 1,
      name: 'Porcentagem',
      type: 'spline',
      dashStyle: 'shortdot',
      color: '#5A5B5B',
      marker: {
        lineWidth: 2,
        lineColor: 'black',
        fillColor: 'white'
      },
      data: [40, 20, 15, 10, 5, 3, 1],
      dataLabels: {
        enabled: true,
        format: '<b>{point.y:.lf}%</b>',
        y: 0,
      },
    }]
  };
  public optionsIdade: any = {
    plotOptions: this.defaultPlotOptions,
    title: {
      text: 'INTERVALOS DE IDADES',
      style: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#5A5B5B'

      }
    },
    xAxis: {
      categories: ['18 anos - 30 anos', '30 anos - 60 anos', '60 anos - 79 anos', 'Maior que 80 anos'],
      type: 'Tipos de cid',
      labels: this.defaultLabels,
    }, yAxis: [{
      labels: {
        format: '{value}'
      },
      title: {
        text: 'Número de pessoas',
      }
    }, {
      labels: {
        format: '{value} %'
      },
      title: {
        text: 'Porcentagem',
      },
      opposite: true
    }],
    legend: {
      enabled: false
    },
    tooltip: {
      shared: true,
      formatter: function () {
        return this.points.reduce(function (s, point) {
          if (point.series.name == 'Porcentagem') {
            return s + '<br/>' + point.series.name + ': ' +
              '<b>' + point.y + '%' + '</b>';
          } else {
            return s + '<br/>' + point.series.name + ': ' +
              '<b>' + point.y + '</b>';
          }
        }, '<b>' + this.x + '</b>');
      }
    },
    series: [{
      type: 'column',
      name: 'Pessoas',
      data: [
        ['18 anos - 30 anos', 162],
        ['30 anos - 60 anos', 900],
        ['60 anos - 79 anos', 1111],
        ['Maior que 80 anos', 277],
      ],
      color: '#149553'
    },
      {
        yAxis: 1,
        name: 'Porcentagem',
        type: 'spline',
        dashStyle: 'shortdot',
        color: '#5A5B5B',
        marker: {
          lineWidth: 2,
          lineColor: 'black',
          fillColor: 'white'
        },
        data: [6, 34, 43, 11],
        dataLabels: {
          enabled: true,
          format: '<b>{point.y:.lf}%</b>',
          y: 0,
        }
      }],
    credits: {
      enabled: false
    }
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
        fontWeight: '500',
        color: '#5A5B5B'

      }
    },
    tooltip: {
      pointFormat: 'Porcentagem: <b>{point.percentage:.1lf}%</b><br>{series.name}: <b>{point.y}'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          format: '<b>{point.name}</b><br>{point.percentage:.1f}%',
          distance: -45,
          style: {
            fontSize: '16px',
            fontWeight: '400',
            color: 'transparent',
            textOutline: '0 contrast'
          }
        },
      }
    },
    series: [{
      name: 'Quantidade',
      colorByPoint: true,
      data: [{
        name: 'Masculino',
        y: 1025,
        color: '#2D9DD1'
      }, {
        name: 'Feminino',
        y: 1354,
        color: '#E83961'
      }]
    }],
    credits: {
      enabled: false
    }
  };
  public optionsMotivoAlta: any = {
    chart: {
      type: 'column'
    },
    plotOptions: this.defaultPlotOptions,
    title: {
      text: 'MOTIVOS DE ALTA',
      style: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#5A5B5B'
      }
    },
    xAxis: {
      categories: ['MOTIVO 1', 'MOTIVO 2', 'MOTIVO 3', 'MOTIVO 4', 'MOTIVO 5'],
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Roboto, sans-serif'
        }
      },
    },
    yAxis: [{
      labels: {
        format: '{value}'
      },
      title: {
        text: 'Número de altas',
      }
    }, {
      labels: {
        format: '{value} %'
      },
      title: {
        text: 'Porcentagem',
      },
      opposite: true
    }],
    legend: {
      enabled: false
    },
    tooltip: {
      shared: true,
      formatter: function () {
        return this.points.reduce(function (s, point) {
          if (point.series.name == 'Porcentagem') {
            return s + '<br/>' + point.series.name + ': ' +
              '<b>' + point.y + '%' + '</b>';
          } else {
            return s + '<br/>' + point.series.name + ': ' +
              '<b>' + point.y + '</b>';
          }
        }, '<b>' + this.x + '</b>');
      }
    },
    series: [{
      name: 'Quantidade',
      data: [
        ['motivo 1', 201],
        ['motivo 2', 100],
        ['motivo 3', 50],
        ['motivo 4', 24],
        ['motivo 5', 10],
      ],
      color: '#d48c00',
    }, {
      yAxis: 1,
      name: 'Porcentagem',
      type: 'spline',
      dashStyle: 'shortdot',
      color: '#5A5B5B',
      marker: {
        lineWidth: 2,
        lineColor: 'black',
        fillColor: 'white'
      },
      data: [50, 25, 12, 6, 3],
      dataLabels: {
        enabled: true,
        format: '<b>{point.y:.lf}%</b>',
        y: 0,
      },
    }],
    credits: {
      enabled: false
    }
  };
  perfilForm = this.fb.group({
    dataInicio: [''],
    dataFinal: [''],
    tipoAtendimento: this.fb.group({
      interno: [true],
      externo: [true],
      urgencia: [true],
      ambulatorial: [true],
    }),
  });
  perfil = {
    dataInicio: '',
    dataFinal: '',
    setores: [],
    tipoAtendimento: [],
    perfilAdulto: true
  };

  constructor(private menuService: MenuService, private render: Renderer2,
              private spinner: SpinnerService, private fb: FormBuilder,
              private perfilService: PerfilService, private alertService: AlertService) {

  }

  reflowCharts() {
    Highcharts.chart('motivo-alta', this.optionsMotivoAlta).redraw();
    Highcharts.chart('sexo', this.optionsSexo).redraw();
    Highcharts.chart('idade', this.optionsIdade).redraw();
    Highcharts.chart('cid', this.optionsCid).redraw();
  }

  ngOnInit() {
    this.spinner.show();
    if (window.innerWidth < 500) {
      this.defaultLabels.rotation = -45;
      this.optionsCid.xAxis.labels.style.fontSize = '10px';
    }
    this.menuService.getStatus().subscribe(status => {
      if (status != this.menuStatus) {
        setTimeout(() => {
          this.reflowCharts()
        }, 500);
        this.menuStatus = status;
      }
    });
  }

  ngAfterViewInit(): void {
    Highcharts.chart('motivo-alta', this.optionsMotivoAlta);
    Highcharts.chart('sexo', this.optionsSexo);
    Highcharts.chart('idade', this.optionsIdade);
    Highcharts.chart('cid', this.optionsCid);
    this.spinner.hide();
  }

  ngDoCheck(): void {
    this.menuService.getStatus().subscribe(status => {
      if (status != this.menuStatus) {
        this.reflowCharts()
      }
      this.menuStatus = status;
    });
  }

  toggle() {
    if (this.perfil.perfilAdulto) {
      this.render.addClass(this.buttonAdulto.nativeElement, 'active');
      this.render.removeClass(this.buttonPediatrico.nativeElement, 'active');
    } else {
      this.render.addClass(this.buttonPediatrico.nativeElement, 'active');
      this.render.removeClass(this.buttonAdulto.nativeElement, 'active');
    }
  }

  getControl(controlName) {
    const tipoAtendimento = this.perfilForm.get('tipoAtendimento');
    return this.perfilForm.get(controlName) != null ? this.perfilForm.get(controlName) : tipoAtendimento.get(controlName);
  }

  setValues() {
    const interno = this.getControl('interno').value;
    const externo = this.getControl('externo').value;
    const ambulatorial = this.getControl('ambulatorial').value;
    const urgencia = this.getControl('urgencia').value;
    this.perfil.tipoAtendimento.push(interno ? 'I' : '');
    this.perfil.tipoAtendimento.push(externo ? 'E' : '');
    this.perfil.tipoAtendimento.push(ambulatorial ? 'A' : '');
    this.perfil.tipoAtendimento.push(urgencia ? 'U' : '');
    const dataInicio = this.getControl('dataInicio').value;
    const dataFinal = this.getControl('dataFinal').value;
    if ((new Date(dataInicio)).getTime() > (new Date(dataFinal)).getTime()) {
      this.alertService.send({
        message: 'Ops...A data inicial não pode ser maior que a final',
        type: 'error',
        icon: faFrown
      })
    }
    this.perfil.dataInicio =
      this.perfil.dataFinal = this.getControl('dataFinal').value;
  }

  send(flag: boolean) {
    this.perfil.perfilAdulto = flag;
    this.toggle();
    this.setValues();
    this.perfilService.list(this.perfil);
  }

  getItemsSelected(event) {
    this.perfil.setores = event;
  }
}

























































