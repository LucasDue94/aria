import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {faNotesMedical} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-relatorio-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  faNotesMedical = faNotesMedical;

  constructor(private titleService: TitleService) {
  }

  ngOnInit() {
    //TODO Sem o timeout não muda o título da tela, verificar o titleService
    window.setTimeout(() => this.titleService.send('Lista de Relatórios'), 100)
  }

}
