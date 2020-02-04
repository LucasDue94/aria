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

@Component({
  selector: 'app-porta-balao-list',
  templateUrl: './porta-balao-list.component.html',
  styleUrls: ['./porta-balao-list.component.scss']
})
export class PortaBalaoListComponent implements OnInit {

  faSearch = faSearch;
  faFrown = faFrown;
  registros: RegistroAtendimento[];
  setores: Setor[];
  showListScrollSpinner = false;
  offset = 0;
  max = 30;
  searchForm = this.fb.group({
    searchControl: ['']
  });
  setorId = 1;

  constructor(private titleService: TitleService,
              private registroAtendimentoService: RegistroAtendimentoService,
              private fb: FormBuilder, private setorService: SetorService,
              private errorService: ErrorService) {
  }

  ngOnInit() {
    this.titleService.send('Lista de Porta Balão');
    this.list();
  }

  search() {}

  list() {
    this.registroAtendimentoService.list(this.setorId, '', '').subscribe(registros => {
      this.registros = registros;
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
