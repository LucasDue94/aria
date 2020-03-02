import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {EcgService} from "../../core/ecg/ecg.service";
import {FormBuilder} from "@angular/forms";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {ErrorService} from "../../core/error/error.service";
import {debounceTime, switchMap} from "rxjs/operators";
import {faFrown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-porta-balao-list',
  templateUrl: './balao-list.component.html',
  styleUrls: ['./balao-list.component.scss']
})
export class BalaoListComponent implements OnInit {

  internamentos: any = [];
  atendimentos: RegistroAtendimento[];
  showListScrollSpinner = false;
  offset = 0;
  max = 30;
  termo;
  faFrown = faFrown;
  searchForm = this.fb.group({
    searchControl: ['']
  });
  faSearch = faSearch;

  constructor(private ecgService: EcgService, private titleService: TitleService,
              private fb: FormBuilder, private spinner: SpinnerService, private router: Router,
              private errorService: ErrorService, private registroAtendimentoService: RegistroAtendimentoService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Balão - Lista de Pacientes');
    this.registroAtendimentoService.listInternamentos('','').subscribe(registros => {
      this.atendimentos = registros;
      this.spinner.hide();
    });
  }

  edit(registro: RegistroAtendimento) {
    if (registro.balao) {
      this.router.navigate(['/balao', 'edit', registro.id]);
    } else {
      this.router.navigate(['/balao', 'create', registro.id])
    }
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.registroAtendimentoService.listInternamentos(this.offset, this.max).subscribe(registros => {
      registros.forEach(atendimento => {
        this.atendimentos.push(atendimento)
      });
      this.showListScrollSpinner = false;
    });
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.spinner.show();
        this.termo = changes;
        this.offset = 0;
        if (this.internamentos!= undefined) this.internamentos.length = 0;
        return this.registroAtendimentoService.searchInternamentos(changes, this.offset, this.max);
      })
    ).subscribe(res => {
      this.atendimentos = res;
      this.spinner.hide();
    });
  }
}
