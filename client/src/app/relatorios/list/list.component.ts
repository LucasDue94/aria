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
    this.titleService.send('Lista de Relatórios');
  }

}
