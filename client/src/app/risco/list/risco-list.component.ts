import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {RiscoService} from "../../core/risco/risco.service";
import {Risco} from "../../core/risco/risco";
import {faFrown, faPlus, faSearch, faCog, faPowerOff, faCheck} from '@fortawesome/free-solid-svg-icons';
import {TitleService} from "../../core/title/title.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {ErrorService} from "../../core/error/error.service";
import {debounceTime, switchMap} from "rxjs/operators";
import {AlertService} from "../../core/alert/alert.service";

@Component({
  selector: 'risco-list',
  templateUrl: './risco-list.component.html',
  styleUrls: ['./risco-list.component.scss']
})
export class RiscoListComponent implements OnInit {

  @ViewChild('dataList', {static: false}) dataList;

  searchForm = this.fb.group({
    searchControl: ['']
  });
  faSearch = faSearch;
  faPlus = faPlus;
  faFrown = faFrown;
  faPowerOff = faPowerOff;
  faCog = faCog;

  listLoading: boolean = false;

  riscos: Risco[];
  offset = 0;
  max = 30;
  showListScrollSpinner = false;
  termo = '';

  constructor(private riscoService: RiscoService, private titleService: TitleService,
              private spinner: SpinnerService, private errorService: ErrorService,
              private fb: FormBuilder, private renderer: Renderer2, private alertService: AlertService) {
  }

  ngOnInit() {
    this.titleService.send('Lista de Riscos');
    this.fetchRiscos();
  }

  fetchRiscos() {
    this.spinner.show();
    this.riscoService.list(this.max).subscribe(riscos => {
      if (this.errorService.hasError(riscos)) {
        this.errorService.sendError(riscos);
      } else {
        this.riscos = riscos;
      }
      this.spinner.hide();
    });
  }


  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.riscoService.list(this.max, this.offset, this.termo).subscribe(riscos => {
      this.riscos = this.riscos.concat(riscos);
      this.showListScrollSpinner = false;
    });
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.listLoading = true;
        this.riscos = [];
        this.termo = changes;
        this.offset = 0;
        this.renderer.setProperty(this.dataList.nativeElement, 'scrollTop', 0);
        return this.riscoService.list(this.max, this.offset, this.termo)
      })
    ).subscribe(res => {
      if (this.errorService.hasError(res)) this.errorService.sendError(res);
      this.riscos = res;
      this.listLoading = false;
    });
  }

  enableDisableRisco(risco: Risco, event: Event) {
    event.stopPropagation();
    risco.habilitado = !risco.habilitado;
    this.riscoService.save(risco).subscribe((res) => {
      if (!res.hasOwnProperty('error')) {
        this.alertService.send(
          {message: 'Risco Alterado!', type: 'success', icon: faCheck}
        );
      } else {
        risco.habilitado = !risco.habilitado;
        this.alertService.send({
          message: res.error.error.message,
          type: 'error',
          icon: faFrown
        });
      }
    })
  }
}
