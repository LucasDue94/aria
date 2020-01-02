import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Chart} from 'angular-highcharts';
import {TitleService} from '../../../core/title/title.service';
import {ApacheService} from '../../../core/apache/apache.service';
import {SetorService} from '../../../core/setor/setor.service';
import {Setor} from '../../../core/setor/setor';
import {SeriesBarOptions, SeriesSplineOptions} from "highcharts";


@Component({
  selector: 'app-apache-report',
  templateUrl: './apache-report.component.html',
  styleUrls: ['./apache-report.component.scss']
})
export class ApacheReportComponent implements OnInit {

  arrayListSetor: Setor[] = [];
  faSearch = faSearch;
  apache: any[] = [];
  setorId;
  today = new Date();
  date = new Date(this.today.getFullYear(), this.today.getMonth(), 2);
  dataInicio: any;
  dataFim: any;
  /* dataInicio: [this.getLastMonth()];
   dataFinal: [new Date().toISOString().slice(0, 10)];*/
  titleChart;
  naoCirurgico = [];
  cirurgico = [];
  data = [];
  altas = [];
  obitos = [];
  smr = [];
  altasCirurgicos = [];
  obitosCirurgicos = [];
  smrCirurgicos = [];
  optionsChart: any = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Population pyramid for Germany, 2018'
    },
    subtitle: {},
    xAxis: [{
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
    },
    series: [{
      name: 'Altas',
      data: [
        -2.2, -2.1, -2.2, -2.4,
        -2.7, -3.0, -3.3, -3.2
      ]
    }, {
      name: 'Obitos',
      data: [
        2.1, 2.0, 2.1, 2.3, 2.6,
        2.9, 3.2, 3.1, 2.9, 3.4
      ]
    }
    ]
  };

  apacheChart = new Chart(this.optionsChart);

  constructor(
    private titleService: TitleService,
    private setorService: SetorService,
    private apacheService: ApacheService) {
  }


  ngOnInit() {
    this.titleService.send('Relatório de Apache');

    this.setorService.list('U', '', '').subscribe(setores => {
      setores.forEach(setor => {
        this.arrayListSetor.push(setor);
        this.setorId = setor.id;
        this.titleChart = setor.sigla;
      });

      this.apacheService.report(this.dataInicio, this.dataFim, this.setorId, '', '').subscribe(apaches => {
        apaches['cirurgico'] ? this.cirurgico = apaches['cirurgico'] : '';
        apaches['naoCirurgico'] ? this.naoCirurgico = apaches['naoCirurgico'] : '';

        if (apaches.hasOwnProperty('naoCirurgico')) {
          Object.keys(this.naoCirurgico).map(key => {
            this.altas.push(this.naoCirurgico[key]['altas']);
            this.obitos.push(this.naoCirurgico[key]['obitos']);
            this.smr.push(this.naoCirurgico[key]['smr']);
          });
        }

        if (apaches.hasOwnProperty('cirurgico')) {
          Object.keys(this.cirurgico).map(key => {
            this.altasCirurgicos.push(this.cirurgico[key]['altas'] * (-1));
            this.obitosCirurgicos.push(this.cirurgico[key]['obitos'] * (-1));
            this.smrCirurgicos.push(this.cirurgico[key]['smr'] * (-1));
          });
        }

        this.apacheChart.ref.update({
          series: [
            {
              name: 'Op',
              data: [
                -2, -2, -2, -2,
                -2, -3, -3, -3
              ]
            } as SeriesBarOptions, {
              name: 'Non-Op',
              data: [
                2, 2, 2, 2,
                2, 3, 3, 2
              ]
            } as SeriesBarOptions, {
              name: 'Op',
              data: [
                -1, -2, 0, -2,
                -2, -3, -1, -2
              ]
            } as SeriesBarOptions, {
              name: 'Non-Op',
              data: [
                1, 1, 0, 3,
                0, 3, 1, 2
              ]
            } as SeriesBarOptions, {
              name: 'SMR Op',
              type: 'spline',
              data: [0,-1.25,-1.5,-1.33,
                    -0.4,-1.2,-0.48,-0.73]
            } as SeriesSplineOptions, {
              name: 'SMR Non-Op',
              type: 'spline',
              data: [0.125,1.25,1.5,1.33,
                     0.71,1.2,0.48,0.73]
            } as SeriesSplineOptions
          ]
        }, true, true);
      });
    });

  }

  getDateInitial(): string {
    this.date.setMonth(this.date.getMonth() + (this.today.getMonth() - 1));
    let month = this.date.getMonth() + 1;
    let day = this.date.getDate() + 1;
    let year = this.date.getFullYear();
    return year + "-" + month + "-" + 0 + day;
  }

  getDateEnd(): string {
    this.date.setMonth(this.date.getMonth() + (this.today.getMonth() + 1));
    let month = this.date.getMonth() + 1;
    let day = this.date.getDate();
    let year = this.date.getFullYear();
    const options = {ano: year, mes: month, dia: day};
    const data = this.date.toDateString();
    // @ts-ignore
    return ;
  }

  getSetor(setorId?: number): string {
    this.setorService.list('U', '', '').subscribe(setores => {
      setores.forEach(setor => {
        if (setorId == setor.id) {
          this.titleChart = setor.sigla;
        }
      });
    });
    return this.titleChart;
  }

  getLabelsCirurgicoApache() {
    return [
      'APPROXIMATE DEATH RATE 1% POST-OP',
      '3% POST-OP',
      '7% POST-OP',
      '12% POST-OP',
      '30% POST-OP',
      '35% POST-OP',
      'APROXIMATELY 73% BOTH',
      '88% POST-OP'
    ];
  }

  getLabelsNaoCirurgicosApache() {
    return [
      'APPROXIMATE DEATH RATE 4% NON-OP',
      '8% NON-OP',
      '15% NON-OP',
      '24% NON-OP',
      '40% NON-OP',
      '55% NON-OP',
      'APROXIMATELY 73% BOTH',
      '85% NON-OP'
    ];
  }
}
