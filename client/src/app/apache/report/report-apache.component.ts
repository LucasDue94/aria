import {Component, OnInit} from '@angular/core';
import {faFrown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Chart} from 'angular-highcharts';
import {TitleService} from '../../core/title/title.service';
import {ApacheService} from '../../core/apache/apache.service';
import {SetorService} from '../../core/setor/setor.service';
import {Setor} from '../../core/setor/setor';
import {SeriesBarOptions, SeriesSplineOptions} from "highcharts";
import {DatePipe} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";
import {AlertService} from "../../core/alert/alert.service";
import {ErrorService} from "../../core/error/error.service";
import {SpinnerService} from "../../core/spinner/spinner.service";


@Component({
  selector: 'app-apache-report',
  templateUrl: './report-apache.component.html',
  styleUrls: ['./report-apache.component.scss']
})
export class ReportApacheComponent extends DatePipe implements OnInit, DatePipe {

  pacientesObito = [{}];
  arrayListSetor: Setor[] = [];
  showListScrollSpinner = false;
  faFrown = faFrown;
  faSearch = faSearch;
  apache: any[] = [];
  setorId;
  date = new Date();
  dataInicio: any;
  dataFim: any;
  titleChart;
  naoCirurgico = [];
  cirurgico = [];
  data = [];
  altasNaoCirurgicas = [];
  obitosNaoCirurgicos = [];
  smrNaoCirurgico = [];
  altasCirurgicos = [];
  obitosCirurgicos = [];
  smrCirurgicos = [];
  optionsChart: any = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'APACHE II'
    },
    credits: {
      enabled: false
    },
    subtitle: {},
    xAxis: [{
      categories: this.getLabelsCirurgicoApache(),
      reversed: false,
      labels: {
        step: 1
      },
      accessibility: {
        description: 'Age (male)'
      }
    }, { // mirror axis on right side
      opposite: true,
      reversed: false,
      categories: this.getLabelsNaoCirurgicosApache(),
      linkedTo: 0,
      labels: {
        step: 1
      },
      accessibility: {
        description: 'Age (female)'
      }
    }],
    yAxis: {
      labels: {
        formatter: function () {
          return Math.abs(this.value);
        }
      },
      accessibility: {
        description: 'Percentage population',
        rangeDescription: 'Range: 0 to 5%'
      }
    },
    plotOptions: {
      bar: {
        stacking: 'normal'
      }
    }
  };
  form = this.fb.group({
    inicio: [''],
    fim: [''],
    setorId: ['']
  });

  apacheChart;

  constructor(
    private titleService: TitleService,
    private setorService: SetorService,
    private apacheService: ApacheService,
    private alertService: AlertService,
    private spinner: SpinnerService,
    private errorService: ErrorService,
    private fb: FormBuilder) {
    super('en-US');

    this.generateChartApache = this.generateChartApache.bind(this);
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Relatório de Apache II');
    this.getDateInterval();
    this.form = this.fb.group({
      inicio: [this.dataInicio, Validators.required],
      fim: [this.dataFim, Validators.required],
      setorId: [this.setorId, Validators.required]
    });

    this.setorService.list('U', '', '').subscribe(setores => {
        this.spinner.hide();
        this.errorService.hasError(setores);

        this.arrayListSetor = setores;
      }
    );
  }

  getDateInterval(): string {
    const today: DatePipe = new DatePipe('en-US');
    const dateFormatterInicio: string = this.date.getFullYear() + "-" + this.date.getMonth() + "-" + this.date.getDate();
    const dateFormatterFim: string = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
    this.dataInicio = today.transform(dateFormatterInicio, 'yyyy-MM-dd', '', 'en-US');
    this.dataFim = today.transform(dateFormatterFim, 'yyyy-MM-dd', '', 'en-US');

    return this.dataFim + this.dataInicio
  }

  getLabelsCirurgicoApache() {
    return [
      '1% POST-OP',
      '3% POST-OP',
      '7% POST-OP',
      '12% POST-OP',
      '30% POST-OP',
      '35% POST-OP',
      '73% POST-OP',
      '88% POST-OP'
    ];
  }

  getLabelsNaoCirurgicosApache() {
    return [
      '4% NON-OP',
      '8% NON-OP',
      '15% NON-OP',
      '24% NON-OP',
      '40% NON-OP',
      '55% NON-OP',
      '73% NON-OP',
      '85% NON-OP'
    ];
  }

  update() {
    this.dataInicio = this.form.controls.inicio.value;
    this.dataFim = this.form.controls.fim.value;
    this.setorId = this.form.controls.setorId.value;

    let tempDataInicio = new Date(this.dataInicio);
    let tempDataFim = new Date(this.dataFim);

    let messageError = 'Ops... A data deve ser preenchida';
    if (this.dataInicio == "" || this.dataFim == "" || tempDataInicio > tempDataFim) {
      this.alertService.send({
        message: messageError,
        type: 'warning',
        icon: faFrown
      });
    } else {
      this.apacheService.report(this.dataInicio, this.dataFim, this.setorId).subscribe(this.generateChartApache);
    }
  }

  generateChartApache(apaches: any[]) {
    this.cirurgico = apaches['cirurgico'];
    this.naoCirurgico = apaches['naoCirurgico'];
    this.pacientesObito = apaches['pacientesObito'];

    this.altasNaoCirurgicas = [];
    this.obitosNaoCirurgicos = [];
    this.smrNaoCirurgico = [];
    this.altasCirurgicos = [];
    this.obitosCirurgicos = [];
    this.smrCirurgicos = [];

    if (apaches.hasOwnProperty('naoCirurgico')) {
      Object.keys(this.naoCirurgico).forEach(key => {
        this.altasNaoCirurgicas.push(this.naoCirurgico[key]['altas']);
        this.obitosNaoCirurgicos.push(this.naoCirurgico[key]['obitos']);
        this.smrNaoCirurgico.push(this.naoCirurgico[key]['smr']);
      });
    }

    if (apaches.hasOwnProperty('cirurgico')) {
      Object.keys(this.cirurgico).forEach(key => {
        this.altasCirurgicos.push(this.cirurgico[key]['altas'] * (-1));
        this.obitosCirurgicos.push(this.cirurgico[key]['obitos'] * (-1));
        this.smrCirurgicos.push(this.cirurgico[key]['smr'] * (-1));
      });
    }

    const chartOptions = {
      series: [
        {
          name: 'ALTAS POST-OP',
          data: this.altasCirurgicos,
          color: '#7EAECC'
        } as SeriesBarOptions, {
          name: 'ALTAS NON-OP',
          data:
          this.altasNaoCirurgicas
          ,
          color: '#8FBFA7'
        } as SeriesBarOptions, {
          name: 'ÓBITOS POST-OP',
          data: this.obitosCirurgicos,
          color: '#FF9A8F'
        } as SeriesBarOptions, {
          name: 'ÓBITOS NON-OP',
          data: this.obitosNaoCirurgicos,
          color: '#8B8C8F'
        } as SeriesBarOptions, {
          name: 'SMR POST-OP',
          type: 'spline',
          data: this.smrCirurgicos,
          color: '#C02110'
        } as SeriesSplineOptions, {
          name: 'SMR NON-OP',
          type: 'spline',
          data: this.smrNaoCirurgico,
          color: '#2B1E1D'
        } as SeriesSplineOptions
      ]
    };

    if (this.apacheChart) {
      this.apacheChart.ref.update(chartOptions, true, true);
    } else {
      this.apacheChart = new Chart(Object.assign(this.optionsChart, chartOptions));
    }
  }


  scrollDown() {
    this.showListScrollSpinner = true;
  }

}
