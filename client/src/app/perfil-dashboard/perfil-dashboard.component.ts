import {AfterViewChecked, Component, DoCheck, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MenuService} from "../core/menu/menu.service";
import {faBabyCarriage, faExpand, faFemale, faFrown, faMale} from "@fortawesome/free-solid-svg-icons/";
import {SpinnerService} from "../core/spinner/spinner.service";
import {FormBuilder} from "@angular/forms";
import {PerfilService} from "../core/perfil/perfil.service";
import {AlertService} from "../core/alert/alert.service";
import {Chart} from "angular-highcharts";
import {SetorService} from "../core/setor/setor.service";
import {Setor} from "../core/setor/setor";
import {TitleService} from "../core/title/title.service";

@Component({
  selector: 'perfil-dashboard',
  templateUrl: './perfil-dashboard.component.html',
  styleUrls: ['./perfil-dashboard.component.scss']
})
export class PerfilDashboardComponent implements OnInit, DoCheck, AfterViewChecked {
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
      type: 'Tipos de cid',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Roboto, sans-serif'
        },
      },
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
    }, credits: {
      enabled: false
    },

    series: [{
      name: 'Quantidade',
      type: 'column',
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
      categories: ['Até 15 anos', '15 anos - 30 anos', '31 anos - 60 anos', '61 anos - 79 anos', 'Maior que 80 anos'],
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
      id: 'quantidade',
      name: 'Quantidade',
      data: [
        [201],
        [100],
        [50],
        [24],
        [10],
      ],
      color: '#d48c00',
    }, {
      yAxis: 1,
      id: 'porcentagem',
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
    dataInicio: [this.getLastMonth()],
    dataFinal: [new Date().toISOString().slice(0, 10)],
    tipoAtendimento: this.fb.group({
      interno: true,
      externo: true,
      urgencia: true,
      ambulatorial: true,
    }),
  });
  perfil = {
    dataInicio: '',
    dataFinal: '',
    setores: [],
    tipoAtendimento: [],
    perfilGeral: true
  };
  data;
  cidChart = new Chart(this.optionsCid);
  idadeChart = new Chart(this.optionsIdade);
  sexoChart = new Chart(this.optionsSexo);
  motivoAltaChart = new Chart(this.optionsMotivoAlta);
  setores: Setor[];

  constructor(private menuService: MenuService, private render: Renderer2,
              private spinner: SpinnerService, private fb: FormBuilder,
              private perfilService: PerfilService, private alertService: AlertService,
              private setorService: SetorService, private titleService: TitleService) {
  }


  getLabelsIdadesChart() {
    if (this.perfil != undefined && this.perfil.perfilGeral)
      return ['Até 15 anos', '15 anos - 30 anos', '31 anos - 60 anos', '61 anos - 79 anos', 'Maior que 80 anos'];

    return ['0 - <29 dias', '29 dias - <1 ano', '1 ano - <4 anos', '4 anos - <10 anos', '10 anos - <18 anos'];
  }

  updateCharts() {
    const arrayMotivo = this.getQuantityArray('motivoAltas').slice(0, 5);
    this.motivoAltaChart.ref.update({
      xAxis: {
        categories: this.getLabelsArray('motivoAltas', 'descricao').slice(0, 5)
      },
      series: [{
        type: 'column',
        data: arrayMotivo,
      }, {
        type: 'spline',
        data: this.getPercentageArray('motivoAltas', arrayMotivo).slice(0, 5),
      }]
    }, true, true);

    const arrayCids = this.getQuantityArray('cids').slice(0, 7);
    this.cidChart.ref.update({
      xAxis: {
        categories: this.getLabelsArray('cids', 'diagnostico').slice(0, 7)
      },
      series: [{
        type: 'column',
        data: arrayCids,
      }, {
        type: 'spline',
        data: this.getPercentageArray('cids', arrayCids).slice(0, 7),
      }]
    }, true, true);

    const arrayIdades = this.getQuantityArray('idades');

    this.idadeChart.ref.update({
      xAxis: {
        categories: this.getLabelsIdadesChart()
      },
      series: [{
        type: 'column',
        data: arrayIdades,
      }, {
        type: 'spline',
        data: this.getPercentageArray('idades', arrayIdades),
      }]
    }, true, true);

    if (this.data != undefined)
      var arraySexo = this.data['sexo'];

    this.sexoChart.ref.update({
      series: [{
        type: 'pie',
        name: 'Quantidade',
        colorByPoint: true,
        data: [{
          name: 'Masculino',
          y: arraySexo.Masculino,
          color: '#2D9DD1'
        }, {
          name: 'Feminino',
          y: arraySexo.Feminino,
          color: '#E83961'
        }]
      }],
    }, true, true);
  }

  redrawCharts() {
    this.cidChart.ref.reflow();
    this.idadeChart.ref.reflow();
    this.sexoChart.ref.reflow();
    this.motivoAltaChart.ref.reflow();
  }

  getQuantityArray(key) {
    let array = [];
    if (this.data != undefined && this.data[key] != undefined) {
      this.data[key].forEach(value => {
        array.push(value.quantidade);
      });
      return array;
    }
    return [];
  }

  getLabelsArray(chartKey, property) {
    let array = [];
    if (this.data != undefined && this.data[chartKey] != undefined) {
      this.data[chartKey].forEach(value => {
        array.push(value[property].toUpperCase());
      });
      return array;
    }
    return [];
  }

  getLastMonth() {
    const today = new Date();
    const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    return monthAgo.toISOString().slice(0, 10);
  }

  getPercentageArray(key, arrayQuantity) {
    let array = [];
    const sum = (total, value) => total + value;
    if (this.data != undefined && this.data[key] != undefined && this.data[key].lenght > 0) {
      const total = arrayQuantity.reduce(sum);
      this.data[key].forEach(value => {
        let percent = (value.quantidade * 100) / total;
        percent = parseFloat(percent.toFixed(2));
        array.push(percent);
      });
      return array;
    }
    return [];
  }

  ngOnInit() {
    this.titleService.send('Perfil Epidemiológico');
    this.setorService.list('', '', '').subscribe(setores => {
      this.setores = setores;
    });
    this.getLastMonth();
    this.spinner.show();
    this.perfilService.list().subscribe(data => {
      this.data = data;
      this.updateCharts();
      this.spinner.hide();
    });
    if (window.innerWidth < 500) {
      this.optionsCid.xAxis.labels.style.fontSize = '10px';
      this.defaultLabels.rotation = -45;
    }
    this.menuService.getStatus().subscribe(status => {
      if (status != this.menuStatus) {
        setTimeout(() => {
          this.redrawCharts();
        }, 500);
        this.menuStatus = status;
      }
    });
  }

  ngAfterViewChecked(): void {
    this.toggle();
  }

  ngDoCheck(): void {
    this.menuService.getStatus().subscribe(status => {
      if (status != this.menuStatus) {
        this.redrawCharts()
      }
      this.menuStatus = status;
    });
  }

  toggle() {
    if (this.perfil.perfilGeral) {
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

  setValues(perfilFlag: boolean) {
    const interno = this.getControl('interno').value;
    const externo = this.getControl('externo').value;
    const ambulatorial = this.getControl('ambulatorial').value;
    const urgencia = this.getControl('urgencia').value;
    let tipoArray = [];
    tipoArray.push(interno ? 'I' : '');
    tipoArray.push(externo ? 'E' : '');
    tipoArray.push(ambulatorial ? 'A' : '');
    tipoArray.push(urgencia ? 'U' : '');
    this.perfil.tipoAtendimento = tipoArray.filter((el) => el != '');
    this.perfil.perfilGeral = perfilFlag;
    this.perfil.dataInicio = this.getControl('dataInicio').value;
    this.perfil.dataFinal = this.getControl('dataFinal').value;
  }

  resetFields() {
    this.perfil.dataFinal = '';
    this.perfil.dataInicio = '';
    this.perfil.tipoAtendimento = [];
    this.perfil.perfilGeral = true;
  }

  send(flag: boolean) {
    this.toggle();
    this.resetFields();
    this.setValues(flag);
    const dataInicio = this.getControl('dataInicio').value;
    const dataFinal = this.getControl('dataFinal').value;
    if ((new Date(dataInicio)).getTime() > (new Date(dataFinal)).getTime()) {
      this.alertService.send({
        message: 'Ops...A data inicial não pode ser maior que a final',
        type: 'error',
        icon: faFrown
      })
    } else if (dataInicio == '' || dataFinal == '') {
      this.alertService.send({
        message: 'Ops...A data deve ser preenchida',
        type: 'warning',
        icon: faFrown
      });
    } else {
      this.spinner.show();
      this.perfilService.list(this.perfil).subscribe(res => {
        if (this.data.hasOwnProperty('error')) {
          this.alertService.send({
            message: 'Desculpe... ocorreu um erro no servidor',
            type: 'error',
            icon: faFrown
          });
        } else {
          this.data = res;
          this.updateCharts();
        }
        this.spinner.hide();
      });
    }
  }

  getItemsSelected(event) {
    console.log(event);
    this.perfil.setores = [];
    let itemsSet = new Set();
    event.forEach(item => itemsSet.add(item.id));
    this.perfil.setores = Array.from(itemsSet);
    console.log(this.perfil.setores);
  }
}

























































