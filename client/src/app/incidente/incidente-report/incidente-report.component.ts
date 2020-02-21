import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {ChartImage, ReportBuilder} from "../../core/report/reportBuilder";
import {TipoIncidenteService} from "../../core/tipoIncidente/tipoIncidente.service";

@Component({
  selector: 'app-incidente-report',
  templateUrl: './incidente-report.component.html',
  styleUrls: ['./incidente-report.component.scss']
})
export class IncidenteReportComponent implements OnInit {

  @ViewChild('chartSVG', {static: false}) chartSVG: ElementRef;

  form = this.fb.group({
    dataInicio: [''],
    dataFim: [''],
    setorId: [''],
    tipoIncidenteId: ['']
  });

  stringDataInicio;
  stringDataFim;
  setorId;

  faSearch = faSearch;
  faPrint = faPrint;

  setores = [];
  tiposIncidente = [];

  incidentes: number = 0;
  semIncidentes: number = 0;

  chartOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      zoomType: 'xy'
    },
    title: {
      text: '',
      style: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#5A5B5B'
      }
    },
    tooltip: {
      pointFormat: 'Porcentagem: <b>{point.percentage:.2lf}%</b><br>{series.name}: <b>{point.y}'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.2f}% ({point.y})',
          style: {
            fontSize: '16px',
            fontWeight: '400',
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
    credits:   { enabled: false },
    exporting: { enabled: false }
  };

  incidenteChart;
  showChartContainer = false;

  constructor(private fb: FormBuilder, private titleService: TitleService,
              private incidenteService: IncidenteService,
              private alertService: AlertService,
              private setorService: SetorService,
              private tipoIncidenteService: TipoIncidenteService,
              private datePipe: DatePipe,
              private spinnerService: SpinnerService) {
    this.generateChart = this.generateChart.bind(this);
  }

  ngOnInit() {
    this.incidenteChart = new Chart(this.chartOptions);
    this.titleService.send('Relatório de Incidentes');
    this.setDateInterval();
    this.spinnerService.show();
    this.setorService.list().subscribe(setores => {
      this.setores = setores;
      this.spinnerService.hide();
    });
    this.tipoIncidenteService.list().subscribe(tiposIncidentes => {
      this.tiposIncidente = tiposIncidentes;
    });
  }

  generatePdf() {
    const chartSVG = this.chartSVG.nativeElement.querySelector('.highcharts-root');
    const report = new ReportBuilder();
    report.addChart(new ChartImage(chartSVG));
    const setor = this.setores.find(setor => setor.id == this.setorId);

    report.titleX = 250;
    report.titleY = 25;
    report.subtitleX = 250;
    report.subtitleY = 40;
    report.title = 'Relatório de Incidentes';
    report.subtitle = this.datePipe.transform(this.stringDataInicio, 'dd/MM/yyyy') +
      ' à ' + this.datePipe.transform(this.stringDataFim, 'dd/MM/yyyy') + ' - Setor: ' + setor.descricao;
    report.print('l', -180, 60, 1.7);
  }

  generateChart(data) {
    this.incidentes = data['incidentes'];
    this.semIncidentes = data['semIncidentes'];
    const seriesData = [{name: 'Incidentes', y: this.incidentes}, {name: 'Pacientes sem ocorrências', y: this.semIncidentes}];
    this.showChartContainer = true;
    this.incidenteChart.ref.update({
      title: {
        text: ''
      },
      series: [{
        type: 'pie',
        name: 'Quantidade',
        colorByPoint: true,
        data: seriesData
      } as SeriesPieOptions],
    }, true, true);
  }

  getChartData() {
    this.stringDataInicio = this.form.controls.dataInicio.value;
    this.stringDataFim = this.form.controls.dataFim.value;
    this.setorId = this.form.controls.setorId.value;
    const tipoIncidenteId = this.form.controls.tipoIncidenteId.value;
    const dataIncicio = new Date(this.stringDataInicio);
    const dataFim = new Date(this.stringDataFim);

    if (this.stringDataInicio == "" || this.stringDataFim == "") {
      this.alertService.send({
        message: 'Ops... A data deve ser preenchida!',
        type: 'warning',
        icon: faFrown
      });
    } else if (dataIncicio > dataFim) {
      this.alertService.send({
        message: 'Ops... Data início deve ser maior que a data fim!',
        type: 'warning',
        icon: faFrown
      });
    } else if (this.setorId == '') {
        this.alertService.send({
          message: 'Ops... Selecione um setor!',
          type: 'warning',
          icon: faFrown
        });
    } else if (tipoIncidenteId == '') {
      this.alertService.send({
        message: 'Ops... Selecione um tipo !',
        type: 'warning',
        icon: faFrown
      });
    } else {
      this.incidenteService.report(this.stringDataInicio, this.stringDataFim, this.setorId, tipoIncidenteId).subscribe(this.generateChart);
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
