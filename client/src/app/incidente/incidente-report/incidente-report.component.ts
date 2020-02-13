import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {TitleService} from "../../core/title/title.service";
import {faPrint} from "@fortawesome/free-solid-svg-icons/faPrint";
import {faSearch} from '@fortawesome/free-solid-svg-icons';

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

  incidenteChart;
  chartOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Browser market shares in January, 2018'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Chrome',
        y: 61.41,
        sliced: true,
        selected: true
      }, {
        name: 'Internet Explorer',
        y: 11.84
      }, {
        name: 'Firefox',
        y: 10.85
      }, {
        name: 'Edge',
        y: 4.67
      }, {
        name: 'Safari',
        y: 4.18
      }, {
        name: 'Sogou Explorer',
        y: 1.64
      }, {
        name: 'Opera',
        y: 1.6
      }, {
        name: 'QQ',
        y: 1.2
      }, {
        name: 'Other',
        y: 2.61
      }]
    }]
  };

  constructor(private fb: FormBuilder, private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.send('Relatório de Incidentes');
    this.setDateInterval();
  }

  generatePdf() {

  }

  updateChart() {

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
