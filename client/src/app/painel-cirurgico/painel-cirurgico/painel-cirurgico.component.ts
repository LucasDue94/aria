import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {faCalendarAlt} from "@fortawesome/free-regular-svg-icons/faCalendarAlt";
@Component({
  selector: 'app-painel-cirurgico',
  templateUrl: './painel-cirurgico.component.html',
  styleUrls: ['./painel-cirurgico.component.scss']
})
export class PainelCirurgicoComponent implements OnInit {

  faCalendar = faCalendarAlt;

  list = [
    {medico: 'Marcio Ribeiro Costa', hora: '18:30 - 22:10'},
    {medico: 'Luciano Borba', hora: '23:00 - 03:30'},
    {medico: 'Jose Leitão', hora: '04:00 - 07:30'},
    ];

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.send('Painel Cirúrgico');
  }

}
