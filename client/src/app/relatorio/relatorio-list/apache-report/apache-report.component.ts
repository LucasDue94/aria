import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Chart} from 'angular-highcharts';
import {TitleService} from '../../../core/title/title.service';
import {ApacheService} from '../../../core/apache/apache.service';
import {SetorService} from '../../../core/setor/setor.service';
import {Setor} from '../../../core/setor/setor';

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
  dataInicio;
  dataFim;
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
      // text: `Apache ${title}`
      text: `Apache`
    },
    xAxis: [{
      categories: this.getLabelsCirurgicoApache(),
      reversed: false,
      labels: {
        step: 1
      },
    }, {
      opposite: true,
      reversed: false,
      categories: this.getLabelsNaoCirurgicosApache(),
      linkedTo: 0,
      labels: {
        step: 1
      },
    }],
    yAxis: {
      title: {
        text: 'TOTAL'
      },
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Altas',
      data: [
        -2.2, -2.1, -2.2, -2.4,
        -2.7, -3.0, -3.3, -3.2,
        -2.9, -3.5, -4.4, -4.1,
        -3.4, -2.7, -2.3, -2.2,
        -1.6, -0.6, -0.3, -0.0,
        -0.0
      ]
    }, {
      data: [
        2.1, 2.0, 2.1, 2.3, 2.6,
        2.9, 3.2, 3.1, 2.9, 3.4,
        4.3, 4.0, 3.5, 2.9, 2.5,
        2.7, 2.2, 1.1, 0.6, 0.2,
        0.0
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
    this.dataInicio = this.getDateInitial();
    this.dataFim = this.getDateEnd();
    this.setorService.list('U', '', '').subscribe(setores => {

      setores.forEach(setor => {
        this.arrayListSetor.push(setor);
        this.setorId = setor.id;
        this.titleChart = setor.sigla;
      });

      this.apacheService.report(this.dataInicio, this.dataFim, this.setorId, '', '').subscribe(apaches => {
        this.data = apaches;
        this.cirurgico = this.data;
        this.naoCirurgico = this.data;
        console.log('Não cirurgico - ', this.naoCirurgico);
        Object.keys(this.naoCirurgico).map(i => {
          this.altas.push(this.naoCirurgico[i].altas);
          this.obitos.push(this.naoCirurgico[i].obitos);
          this.smr.push(this.naoCirurgico[i].smr);
        });

        Object.keys(this.cirurgico).map(i => {
          this.altasCirurgicos.push(this.cirurgico[i].altas * (-1));
          this.obitosCirurgicos.push(this.cirurgico[i].obitos * (-1));
          this.smrCirurgicos.push(this.cirurgico[i].smr * (-1));
        });

        console.log('altas - ', this.altasCirurgicos);
        console.log('obitos - ', this.obitos);
        this.apacheChart.ref.update({
          series: [
          ]
        }, true, true);
      });
    });

  }

  getDateInitial() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    return year + '-' + month + '-' + day;
  }

  getDateEnd() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return year + '-' + month + '-' + day;
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

  /*generateChartApache(dataInicio?: string, dataFim?: string, setorId?: number, title?: string): any {
    let apache: any[] = [];
    let cirurgico: any[];
    let naoCirurgico: any[];
    let altas: any[] = [];
    let obitos: any[] = [];
    let smr: any[] = [];
    let options: any;

    this.apacheService.report(dataInicio, dataFim, setorId, '', '').subscribe(apaches => {
      apache = apaches;
      naoCirurgico = apache['naoCirurgico'];
      console.log("Não cirurgico - ", naoCirurgico);
      Object.keys(naoCirurgico).map(i => {
        altas.push(naoCirurgico[i]['altas']);
        obitos.push(naoCirurgico[i]['obitos']);
        smr.push(naoCirurgico[i]['smr']);
      });
      console.log(altas)
    });
  }*/

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
