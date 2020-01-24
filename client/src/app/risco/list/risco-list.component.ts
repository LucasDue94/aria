import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {RiscoService} from "../../core/risco/risco.service";
import {Risco} from "../../core/risco/risco";
import {faFrown, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {TitleService} from "../../core/title/title.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {ErrorService} from "../../core/error/error.service";
import {EnumPermisson} from "../../core/permissao/enumPermisson";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'risco-list',
  templateUrl: './risco-list.component.html',
  styleUrls: ['./risco-list.component.scss']
})
export class RiscoListComponent implements OnInit {
  searchForm = this.fb.group({
    searchControl: ['']
  });
  riscos: Risco[];
  faSearch = faSearch;
  faPlus = faPlus;
  faFrown = faFrown;
  data: Risco[];


  constructor(private riscoService: RiscoService, private titleService: TitleService,
              private spinner: SpinnerService, private errorService: ErrorService,
              private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Lista de Riscos');
    if (!this.authService.hasPermission(EnumPermisson.role_risco_index)) {
      this.router.navigate(['/error']);
    }
    this.riscoService.list(10000, '').subscribe(riscos => {
      if (this.errorService.hasError(riscos)) {
        this.errorService.sendError(riscos);
      } else {
        this.riscos = riscos;
        this.data = riscos;
      }
    });
    this.spinner.hide();
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.subscribe(res => {
      this.riscos = this.data.filter(function (obj) {
        return `${obj.id}`.includes(res.toUpperCase()) || obj.nome.includes(res.toUpperCase());
      });
    });
  }
}
