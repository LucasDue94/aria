import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {EcgService} from "../../core/ecg/ecg.service";
import {Chart} from "angular-highcharts";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-report-ecg',
  templateUrl: './report-ecg.component.html',
  styleUrls: ['./report-ecg.component.scss']
})
export class ReportEcgComponent implements OnInit {

  optionsChart: any = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'ECG'
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
      data: [{name: 'Atendidos', y: 1}, {name: 'Não atendidos', y: 1}]
    }]
  };
  ecgChart;
  form = this.fb.group({
    inicio: ['', Validators.required ],
    fim: ['', Validators.required]
  });

  constructor(private titleService: TitleService, private ecgService: EcgService, private fb: FormBuilder) {
    this.ecgChart = new Chart(this.optionsChart);
  }

  ngOnInit() {
    this.titleService.send('Relatório de ECG');
    console.log(this.ecgChart);
  }

  updateChart() {
      this.optionsChart = {
        series: [{
          data: [{name: 'Atendidos', y: 2}, {name: 'Não atendidos', y: 1}]
        }]
      };
  }
}
