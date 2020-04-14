import {Component, OnInit} from '@angular/core';
import {SetorService} from "../../core/setor/setor.service";
import {Setor} from "../../core/setor/setor";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {faCheck, faCog, faFrown, faPlus, faPowerOff, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder} from "@angular/forms";
import {AlertService} from "../../core/alert/alert.service";
import {TitleService} from "../../core/title/title.service";
import {ErrorService} from "../../core/error/error.service";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";


@Component({
  selector: 'setor-list',
  templateUrl: './setor-list.component.html',
  styleUrls: ['./setor-list.component.scss']
})
export class SetorListComponent implements OnInit {
  faFrown = faFrown;
  faSearch = faSearch;
  faPlus = faPlus;
  faCog = faCog;
  faPowerOff = faPowerOff;
  setores: Setor[];
  data: Setor[];
  searchForm = this.fb.group({
    searchControl: ['']
  });

  constructor(private setorService: SetorService, private spinner: SpinnerService, private errorService: ErrorService,
              private router: Router,
              private fb: FormBuilder, private alertService: AlertService, private titleService: TitleService, private authService: AuthService) {
  }

  ngOnInit() {
    this.titleService.send('Lista de Setores');
    this.spinner.show();
    this.setorService.list('', '',10000, true).subscribe(setores => {
      if (this.errorService.hasError(setores)) {
        this.errorService.sendError(setores);
      } else {
        this.data = setores;
        this.sortSetor();
        this.setores = this.data;
        this.spinner.hide();
      }
    });
  }

  sortSetor() {
    this.data.sort(function (a, b) {
      return a.habilitado ? -1 : 1;
    })
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.subscribe(res => {
      this.setores = this.data.filter(function (obj) {
        return `${obj.id}`.includes(res.toUpperCase()) || obj.descricao.includes(res.toUpperCase());
      });
    });
  }

  enableDisableSetor(setor: Setor, event: Event) {
    event.stopPropagation();
    setor.habilitado = !setor.habilitado;
    this.setorService.save(setor).subscribe((res) => {
      if (!res.hasOwnProperty('error')) {
        this.alertService.send(
          {message: 'Setor Alterado!', type: 'success', icon: faCheck}
        );
      } else {
        setor.habilitado = !setor.habilitado;
        this.alertService.send({
          message: res.error.error.message,
          type: 'error',
          icon: faFrown
        });
      }
    })
  }
}
