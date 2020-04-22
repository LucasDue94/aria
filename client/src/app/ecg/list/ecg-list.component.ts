import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {EcgService} from "../../core/ecg/ecg.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {faFrown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Atendimento} from "../../core/atendimento/atendimento";
import {AtendimentoService} from "../../core/atendimento/atendimento.service";
import {Router} from "@angular/router";
import {FilterService} from "../../core/filter/filter.service";

@Component({
  selector: 'ecg-list',
  templateUrl: './ecg-list.component.html',
  styleUrls: ['./ecg-list-component.scss']
})
export class EcgListComponent implements OnInit {

  registros: Atendimento[] = [];
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

  constructor(private ecgService: EcgService, private titleService: TitleService,
              private spinner: SpinnerService, private router: Router,
              private registroAtendimentoService: AtendimentoService,
              private filterService: FilterService) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.filterService.receive().subscribe(this.search);
    this.listLoading = true;
    this.titleService.send('ECG - Lista de Pacientes');
    this.getRegistros();
  }

  edit(registro: Atendimento) {
    this.router.navigate(['/ecg', registro.ecg ? 'edit' : 'create', registro.id]);
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
    this.registroAtendimentoService.list(this.params, this.offset, this.max, 'U').subscribe(registros => {
      registros.forEach(registro => {
        this.registros.push(registro);
        this.showListScrollSpinner = false;
      });
      this.listLoading = false;
    })
  }
}
