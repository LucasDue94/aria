import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {EcgService} from "../../core/ecg/ecg.service";
import {Chart} from "angular-highcharts";
import {FormBuilder, Validators} from "@angular/forms";
import {SeriesPieOptions} from "highcharts";
import {DatePipe} from "@angular/common";
import {faFrown, faPrint} from "@fortawesome/free-solid-svg-icons";
import {AlertService} from "../../core/alert/alert.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {ChartImage, ReportBuilder} from "../../core/report/reportBuilder";

@Component({
  selector: 'app-report-ecg',
  templateUrl: './report-ecg.component.html',
  styleUrls: ['./report-ecg.component.scss']
})
export class ReportEcgComponent implements OnInit {
  @ViewChild('chartSVG', {static: false}) chartSVG: ElementRef;

  date = new Date();
  dataInicio: any;
  dataFim: any;
  faPrint = faPrint;
  optionsChart: any = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'ATENDIDOS E NÃO ATENDIDOS NO TEMPO LIMITE DE ECG'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4
          }
        }
      }
    },
    series: [{
      data: [{name: 'Atendidos', y: 0}, {name: 'Não atendidos', y: 0}]
    }], exporting: {enabled: false}
  };
  ecgChart = new Chart(this.optionsChart);
  form = this.fb.group({
    inicio: [''],
    fim: [''],
    setorId: []
  });

  constructor(private titleService: TitleService,
              private ecgService: EcgService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private alertService: AlertService,
              private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Relatório de Porta ECG');
    this.getDateInterval();
    this.form = this.fb.group({
      inicio: [this.dataInicio, Validators.required],
      fim: [this.dataFim, Validators.required]
    });
    this.ecgService.report(this.dataInicio, this.dataFim).subscribe(ecg => {
      this.spinner.hide();
      this.ecgChart.ref.update({
        series: [{
          data: [{name: 'Atendidos', y: ecg['atendidos']}, {name: 'Não atendidos', y: ecg['naoAtendidos']}]
        } as SeriesPieOptions]
      }, true, true);
    });
  }


  getDateInterval(): string {
    const today: DatePipe = new DatePipe('en-US');
    const dateFormatterInicio: string = this.date.getFullYear() + "-" + this.date.getMonth() + "-" + this.date.getDate();
    const dateFormatterFim: string = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
    this.dataInicio = today.transform(dateFormatterInicio, 'yyyy-MM-dd', '', 'en-US');
    this.dataFim = today.transform(dateFormatterFim, 'yyyy-MM-dd', '', 'en-US');

    return this.dataFim + this.dataInicio
  }


  update() {
    this.dataInicio = this.form.controls.inicio.value;
    this.dataFim = this.form.controls.fim.value;

    if (this.dataInicio == "" || this.dataFim == "") {
      this.alertService.send({
        message: 'Ops... A data deve ser preenchida corretamente!',
        type: 'warning',
        icon: faFrown
      });
    } else {
      this.ecgService.report(this.dataInicio, this.dataFim).subscribe(ecg => {
        this.ecgChart.ref.update({
          series: [{
            data: [{name: 'Atendidos', y: ecg['atendidos']}, {name: 'Não atendidos', y: ecg['naoAtendidos']}]
          } as SeriesPieOptions]
        }, true, true);
      });
    }
  }

  generatePdf() {
    const chartSVG = this.chartSVG.nativeElement.querySelector('.highcharts-root');
    const report = new ReportBuilder();
    report.addChart(new ChartImage(chartSVG));
    report.titleX = 150;
    report.titleY = 25;
    report.subtitleX = 280;
    report.subtitleY = 40;
    report.title = 'ATENDIDOS E NÃO ATENDIDOS NO TEMPO LIMITE';
    report.subtitle = this.datePipe.transform(this.dataInicio, 'dd/MM/yyyy') +
      ' à ' + this.datePipe.transform(this.dataFim, 'dd/MM/yyyy');
    report.print('l', -180, 60, 1.7);
  }

}
