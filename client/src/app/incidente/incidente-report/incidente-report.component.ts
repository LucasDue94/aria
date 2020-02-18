import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {TitleService} from "../../core/title/title.service";
import {faPrint} from "@fortawesome/free-solid-svg-icons/faPrint";
import {faFrown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Chart} from "angular-highcharts";
import {IncidenteService} from "../../core/incidente/incidente.service";
import {AlertService} from "../../core/alert/alert.service";
import {SeriesPieOptions} from "highcharts";
import {SetorService} from "../../core/setor/setor.service";
import {SpinnerService} from "../../core/spinner/spinner.service";

@Component({
  selector: 'app-incidente-report',
  templateUrl: './incidente-report.component.html',
  styleUrls: ['./incidente-report.component.scss']
})
export class IncidenteReportComponent implements OnInit {

  form = this.fb.group({
    dataInicio: [''],
    dataFim: [''],
    setorId: ['']
  });

  faSearch = faSearch;
  faPrint = faPrint;

  setores = [];

  chartOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'INCIDENTES POR TIPO',
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
        name: 'Nenhum',
        y: 1
      }]
    }],
    credits: {
      enabled: false
    }
  };

  incidenteChart;
  showChartContainer = false;

  constructor(private fb: FormBuilder, private titleService: TitleService,
              private incidenteService: IncidenteService,
              private alertService: AlertService,
              private setorService: SetorService,
              private spinnerService: SpinnerService) {
    this.generateChart = this.generateChart.bind(this);
  }

  ngOnInit() {
    this.incidenteChart = new Chart(this.chartOptions);
    this.titleService.send('Relatório de Incidentes');
    this.setDateInterval();
    this.spinnerService.show();
    this.setorService.list().subscribe(setor => {
      this.setores = setor;
      this.spinnerService.hide();
    });
  }

  generatePdf() {

  }

  generateChart(data) {
    const seriesData = data.map( item => {return {name: item.tipoIncidente, y: item.quantidade}});
    this.showChartContainer = true;
    this.incidenteChart.ref.update({
      series: [{
        type: 'pie',
        name: 'Quantidade',
        colorByPoint: true,
        data: seriesData
      } as SeriesPieOptions],
    }, true, true);
  }

  getChartData() {
    const dataInicio = this.form.controls.dataInicio.value;
    const dataFim = this.form.controls.dataFim.value;
    const setorId = this.form.controls.setorId.value;

    let defaultDataInicio = new Date(dataInicio);
    let defaultDataFim = new Date(dataFim);

    if (dataInicio == "" || dataFim == "") {
      this.alertService.send({
        message: 'Ops... A data deve ser preenchida!',
        type: 'warning',
        icon: faFrown
      });
    } else if (defaultDataInicio > defaultDataFim) {
      this.alertService.send({
        message: 'Ops... Data início deve ser maior que a data fim!',
        type: 'warning',
        icon: faFrown
      });
    } else if (setorId == null) {
        this.alertService.send({
          message: 'Ops... Selecione um setor!',
          type: 'warning',
          icon: faFrown
        });
    } else {
      this.incidenteService.report(dataInicio, dataFim, setorId).subscribe(this.generateChart);
    }
  }

  setDateInterval(): void {
    const date = new Date();
    const datePipe: DatePipe = new DatePipe('en-US');
    const dateFormatterInico: string = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    const dateFormatterFim: string = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    this.form.controls.dataInicio.patchValue(datePipe.transform(dateFormatterInico, 'yyyy-MM-dd', '', 'en-US'));
    this.form.controls.dataFim.patchValue(datePipe.transform(dateFormatterFim, 'yyyy-MM-dd', '', 'en-US'));
  }
}
