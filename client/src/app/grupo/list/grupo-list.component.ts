import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GrupoService} from "../../core/grupo/grupo.service";
import {Grupo} from "../../core/grupo/grupo";
import {faFrown, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {TitleService} from "../../core/title/title.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {ErrorService} from "../../core/error/error.service";

@Component({
  selector: 'grupo-list',
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list.component.scss']
})
export class GrupoListComponent implements OnInit {
  searchForm = this.fb.group({
    searchControl: ['']
  });
  grupos: Grupo[];
  faSearch = faSearch;
  faPlus = faPlus;
  faFrown = faFrown;
  data: Grupo[];


  constructor(private grupoService: GrupoService, private titleService: TitleService,
              private spinner: SpinnerService, private errorService: ErrorService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Lista de Grupos');
    this.grupoService.list(10000, '').subscribe(grupos => {
      if (this.errorService.hasError(grupos)) {
        this.errorService.sendError(grupos);
      } else {
        this.grupos = grupos;
        this.data = grupos;
      }
    });
    this.spinner.hide();
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.subscribe(res => {
      this.grupos = this.data.filter(function (obj) {
        return `${obj.id}`.includes(res.toUpperCase()) || obj.name.includes(res.toUpperCase());
      });
    });
  }
}
