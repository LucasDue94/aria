import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {EcgService} from "../../core/ecg/ecg.service";
import {FormBuilder} from "@angular/forms";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {ErrorService} from "../../core/error/error.service";
import {faFrown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Atendimento} from "../../core/atendimento/atendimento";
import {AtendimentoService} from "../../core/atendimento/atendimento.service";
import {Router} from "@angular/router";
import {FilterService} from "../../core/filter/filter.service";

@Component({
  selector: 'balao-list',
  templateUrl: './balao-list.component.html',
  styleUrls: ['./balao-list.component.scss']
})
export class BalaoListComponent implements OnInit {

  atendimentos: Atendimento[] = [];
  showListScrollSpinner = false;
  offset = 0;
  max = 30;
  listLoading: boolean = false;
  faFrown = faFrown;
  faSearch = faSearch;
  params = {
    termo: '',
    inicio: '',
    fim: '',
    setorId: '',
  };

  constructor(private ecgService: EcgService, private titleService: TitleService,
              private fb: FormBuilder, private spinner: SpinnerService, private router: Router,
              private errorService: ErrorService, private registroAtendimentoService: AtendimentoService,
              private filterService: FilterService) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.listLoading = true;
    this.titleService.send('Balão - Lista de Pacientes');
    this.getRegistros();
    this.filterService.receive().subscribe(this.search)
  }

  edit(registro: Atendimento) {
    this.router.navigate(['/balao', registro.balao ? 'edit' : 'create', registro.id]);
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
    this.atendimentos = [];
    this.setFilterParams(params);
    if (params) this.getRegistros();
  }

  getRegistros() {
    this.registroAtendimentoService.list(this.params, this.offset, this.max, 'I').subscribe(registros => {
      registros.forEach(registro => {
        this.atendimentos.push(registro);
        this.showListScrollSpinner = false;
      });
      this.listLoading = false;
    })
  }
}
