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

  chart: {

  };

  constructor(private fb: FormBuilder, private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.send('Relatório de Incidentes');
    this.setDateInterval();
  }

  setDateInterval(): void {
    const date = new Date();
    const datePipe: DatePipe = new DatePipe('en-US');
    const dateFormatterInico: string = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    const dateFormatterFim: string = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    this.form.controls.dataInicio.patchValue(datePipe.transform(dateFormatterInico, 'yyyy-MM-dd', '', 'en-US'));
    this.form.controls.dataFim.patchValue(datePipe.transform(dateFormatterFim, 'yyyy-MM-dd', '', 'en-US'));
  }

  generatePdf() {

  }

  updateChart() {

  }
}
