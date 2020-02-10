import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {FormBuilder} from "@angular/forms";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {faFrown} from "@fortawesome/free-solid-svg-icons/faFrown";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {ErrorService} from "../../core/error/error.service";
import {Setor} from "../../core/setor/setor";
import {SetorService} from "../../core/setor/setor.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {debounceTime, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-porta-balao-list',
  templateUrl: './porta-balao-list.component.html',
  styleUrls: ['./porta-balao-list.component.scss']
})
export class PortaBalaoListComponent implements OnInit {

  setorId = 1;
  faSearch = faSearch;
  faFrown = faFrown;
  registros: RegistroAtendimento[];
  setores: Setor[];
  showListScrollSpinner = false;
  searchForm = this.fb.group({
    searchControl: ['']
  });
  offset = 0;
  max = 30;
  termo = '';

  constructor(private titleService: TitleService, private spinner: SpinnerService,
              private registroAtendimentoService: RegistroAtendimentoService,
              private fb: FormBuilder, private setorService: SetorService,
              private errorService: ErrorService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Lista de Porta Balão');
    this.registroAtendimentoService.list( null,'','').subscribe(registros => {
      this.registros = registros;
      this.spinner.hide();
    });
  }

  search() {
    this.searchForm.get('searchControl').valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(res => {
     /* this.admissoesPacSetor = res;*/
      this.spinner.hide();
    });
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.registroAtendimentoService.list(this.setorId, this.max, this.offset).subscribe(registros => {
      if (!this.errorService.hasError(registros)) {
        this.registros = this.registros.concat(registros);
      }
      this.showListScrollSpinner = false;
    });
  }

}
