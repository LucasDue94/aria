import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {EcgService} from "../../core/ecg/ecg.service";
import {Chart} from "angular-highcharts";
import {FormBuilder, Validators} from "@angular/forms";
import {SeriesPieOptions} from "highcharts";
import {DatePipe} from "@angular/common";
import {faFrown} from "@fortawesome/free-solid-svg-icons";
import {AlertService} from "../../core/alert/alert.service";

@Component({
  selector: 'app-report-ecg',
  templateUrl: './report-ecg.component.html',
  styleUrls: ['./report-ecg.component.scss']
})
export class ReportEcgComponent implements OnInit {

  date = new Date();
  dataInicio: any;
  dataFim: any;
  optionsChart: any = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'ECG'
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
      data: [{name: 'Atendidos', y: 1}, {name: 'Não atendidos', y: 1}]
    }], exporting: {enabled: false}
  };
  ecgChart = new Chart(this.optionsChart);
  form = this.fb.group({
    inicio: [this.dataInicio, Validators.required ],
    fim: [this.dataFim, Validators.required]
  });

  constructor(private titleService: TitleService, private ecgService: EcgService, private fb: FormBuilder, private alertService: AlertService) {
  }

  ngOnInit() {
    this.titleService.send('Relatório de ECG');
    this.getDateInterval();
    this.ecgService.report(this.dataInicio, this.dataFim).subscribe(ecg => {
      this.ecgChart.ref.update({series: [{
          data: [{name: 'Atendidos', y: ecg['atendidos']}, {name: 'Não atendidos', y: ecg['naoAtendidos']}]
        } as SeriesPieOptions]}, true, true);
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


}
