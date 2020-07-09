import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SetorService} from "../../core/setor/setor.service";
import {PacienteService} from "../../core/paciente/paciente.service";
import {Setor} from "../../core/setor/setor";
import {TitleService} from "../../core/title/title.service";
import {RegistroLeitoService} from "../../core/registroLeito/registro-leito.service";
import {FilterService} from "../../core/filter/filter.service";
import {RegistroLeito} from "../../core/registroLeito/registroLeito";
import {AtendimentoService} from "../../core/atendimento/atendimento.service";
import {Atendimento} from "../../core/atendimento/atendimento";

@Component({
  selector: 'paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})

export class PacienteListComponent implements OnInit {


  @ViewChild('collapse', {static: false}) collapse: ElementRef;
  setorId;
  params = {
    termo: '',
    setorId: '',
    dataEntradaInicio: '',
    dataEntradaFim: '',
    tipoAtendimento: '',
    offset: 0,
    max: 100,
    internos: true
  };
  searchEmpty = true;
  listLoading = true;
  isVisibleCollapse;
  showListScrollSpinner = false;
  setores: Setor[] = [];
  atendimentos: Atendimento[] = [];

  constructor(private titleService: TitleService, private setorService: SetorService,
              private pacienteService: PacienteService, private render: Renderer2,
              private atendimentoService: AtendimentoService,
              private registroLeitoService: RegistroLeitoService, private filterService: FilterService) {
    this.search = this.search.bind(this);
  }

  ngOnInit(): void {
    this.titleService.send('Evoluções - Pacientes');
    this.setorService.list().subscribe(setor => {
      this.setores = setor;
    });
    this.filterService.receive().subscribe(this.search);
  }

  getRegistros(paramsCollapse?) {
    this.setorId = paramsCollapse;
    if (paramsCollapse.collapseId) {
      this.listLoading = true;
      this.params.internos = true;
      this.params.setorId = paramsCollapse.collapseId;
    } else {
      this.searchEmpty = true;
    }
    this.atendimentoService.list(this.params).subscribe(registro => {
      this.atendimentos = registro;
      this.showListScrollSpinner = false;
      this.listLoading = false;
    });
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.params.offset += 15;
    this.getRegistros(this.params);
  }

  setStatusSearch() {
    this.searchEmpty = true;
  }

  setFilterParams(params) {
    this.params.termo = '';
    this.params.termo = params.busca;
    this.searchEmpty = params.busca === '' || params.busca === null;
  }

  search(params) {
    this.params.offset = 0;
    this.setFilterParams(params);
    if (params) {
      this.params.offset += 15;
      this.params.setorId = '';
      this.params.internos = false;
      if (params.busca != '') {
        this.getRegistros(this.params);
        this.searchEmpty = false;
        this.listLoading = true;
      }
    }
  }

}
