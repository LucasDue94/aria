import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {GrupoService} from "../../core/grupo/grupo.service";
import {Grupo} from "../../core/grupo/grupo";
import {faFrown, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {TitleService} from "../../core/title/title.service";

@Component({
  selector: 'grupo-list',
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list.component.scss']
})
export class GrupoListComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    searchControl: new FormControl('')
  });
  grupos: Grupo[];
  faSearch = faSearch;
  faPlus = faPlus;
  faFrown = faFrown;

  constructor(private grupoService: GrupoService, private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.send('Lista de Grupos');
    this.grupoService.list(10000, '').subscribe(grupos => {
      this.grupos = grupos;
    })
  }

  search() {

  }
}
