import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../core/title/title.service";

@Component({
  selector: 'app-painel-cirurgico',
  templateUrl: './painel-cirurgico.component.html',
  styleUrls: ['./painel-cirurgico.component.scss']
})
export class PainelCirurgicoComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.send('Painel Cirúrgico');
  }

}
