import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {faNotesMedical} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";

@Component({
  selector: 'app-relatorio-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  faNotesMedical = faNotesMedical;

  constructor(private titleService: TitleService, private router: Router) {
  }

  ngOnInit() {
    this.titleService.send('Lista de Relatórios');
    window.localStorage.getItem('grupo') == 'Padrão' ? this.router.navigate(['error']) : '';
  }

}
