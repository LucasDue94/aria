import {Component, OnInit} from '@angular/core';
import {faFrown, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {TitleService} from "../../core/title/title.service";
import {FilterService} from "../../core/filter/filter.service";
import {RegistroAtendimentoLeitoService} from "../../core/registroAtendimentoLeito/registroAtendimentoLeito.service";
import {RegistroAtendimentoLeito} from "../../core/registroAtendimentoLeito/registroAtendimentoLeito";

@Component({
  selector: 'nas-paciente-list',
  templateUrl: './nas-paciente-list.component.html',
  styleUrls: ['./nas-paciente-list.component.scss']
})
export class NasPacienteListComponent implements OnInit {
  registros: RegistroAtendimentoLeito[] = [];
  showListScrollSpinner = false;
  offset = 0;
  max = 30;
  faFrown = faFrown;
  faSearch = faSearch;
  listLoading: boolean = false;
  params = {
    termo: '',
    inicio: '',
    fim: '',
    setorId: null,
  };

  constructor(private registroAtendimentoLeitoService: RegistroAtendimentoLeitoService, private router: Router,
              private titleService: TitleService, private filterService: FilterService) {
  }

  ngOnInit() {
    this.filterService.receive().subscribe(this.search);
    this.listLoading = true;
    this.titleService.send('NAS - Lista de pacientes');
    this.getRegistros();
  }

  edit(registroLeito: RegistroAtendimentoLeito) {
    this.router.navigate(['nas', 'create', registroLeito.registroAtendimento.id], {
      queryParams: {
        dataEntrada: registroLeito.dataEntrada,
        leito: registroLeito.leito.id,
        registro: registroLeito.registroAtendimento.id
      }
    })
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 30;
    this.getRegistros();
  }

  setFilterParams(params) {
    this.params.termo = params.busca;
    this.params.inicio = params.inicio;
    this.params.fim = params.fim;
    this.params.setorId = params.setor;
  }

  search(params) {
    this.offset = 0;
    this.listLoading = true;
    this.registros = [];
    this.setFilterParams(params);
    if (params) this.getRegistros()
  }

  getRegistros() {
    this.registroAtendimentoLeitoService.list(this.params, this.offset, this.max).subscribe(registros => {
      registros.forEach(registro => {
        this.registros.push(registro);
        this.showListScrollSpinner = false;
      });
      this.listLoading = false;
    })
  }
}
