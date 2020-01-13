import {Component, OnInit} from '@angular/core';
import {SetorService} from "../../core/setor/setor.service";
import {Setor} from "../../core/setor/setor";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {faFrown, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder} from "@angular/forms";
import {AlertService} from "../../core/alert/alert.service";
import {TitleService} from "../../core/title/title.service";
import {ErrorService} from "../../core/error/error.service";
import {Router} from "@angular/router";


@Component({
  selector: 'setor-list',
  templateUrl: './setor-list.component.html',
  styleUrls: ['./setor-list.component.scss']
})
export class SetorListComponent implements OnInit {
  faFrown = faFrown;
  faSearch = faSearch;
  faPlus = faPlus;
  setores: Setor[];
  data: Setor[];
  searchForm = this.fb.group({
    searchControl: ['']
  });

  constructor(private setorService: SetorService, private spinner: SpinnerService, private errorService: ErrorService,
              private router: Router,
              private fb: FormBuilder, private alertService: AlertService, private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.send('Lista de Setores');
    window.localStorage.getItem('grupo') == 'Padrão' ? this.router.navigate(['error']) :
    window.localStorage.getItem('grupo') == 'Admin' ?
    this.setorService.list('', '',10000).subscribe(setores => {
      if (this.errorService.hasError(setores)) {
          this.errorService.sendError(setores);
      } else {
        this.data = setores;
        this.sortSetor();
        this.setores = this.data;
        this.spinner.hide();
      }
    }) : this.router.navigate(['error']);
  }

  sortSetor() {
    this.data.sort(function (a, b) {
      if (a.descricao > b.descricao)
        return 1;
      else
        return -1;
    })
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.subscribe(res => {
      this.setores = this.data.filter(function (obj) {
        return `${obj.id}`.includes(res.toUpperCase()) || obj.descricao.includes(res.toUpperCase());
      });
    });
  }
}
