import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SetorService} from "../core/setor/setor.service";
import {PacienteService} from "../core/paciente/paciente.service";
import {Setor} from "../core/setor/setor";
import {TitleService} from "../core/title/title.service";
import {RegistroLeitoService} from "../core/registroLeito/registro-leito.service";
import {RegistroLeito} from "../core/registroLeito/registroLeito";
import {FilterService} from "../core/filter/filter.service";

@Component({
  selector: 'paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})

export class PacienteListComponent implements OnInit {


  @ViewChild('collapse', {static: false}) collapse: ElementRef;
  offset = 0;
  max = 30;
  params = {
    termo: '',
    inicio: '',
    fim: '',
    setorId: '',
    offset: this.offset,
    max: this.max
  };
  searchEmpty = true;
  listLoading = true;
  showListScrollSpinner = false;
  setores: Setor[] = [];
  registroLeitos: RegistroLeito[] = [];

  constructor(private titleService: TitleService, private setorService: SetorService,
              private pacienteService: PacienteService, private render: Renderer2,
              private registroLeitoService: RegistroLeitoService, private filterService: FilterService) {
    this.search = this.search.bind(this);
  }

  ngOnInit(): void {
    this.titleService.send('Evoluções - Pacientes Internos');
    this.setorService.list().subscribe(setor => {
      this.setores = setor;
    });
    this.filterService.receive().subscribe(this.search);
  }

  getRegistros(params?) {
    if (params.collapseId) {
      this.params.setorId = params.collapseId;
      this.params.termo = '';
    } else {
      this.params.setorId = '';
    }
    this.listLoading = true;
    this.registroLeitoService.list(this.params).subscribe(registro => {
      this.registroLeitos = registro;
      this.showListScrollSpinner = false;
      this.listLoading = false;
    });
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 30;
    this.getRegistros();
  }

  getStatusSearch() {
    this.searchEmpty = true;
  }

  setFilterParams(params) {
    this.params.termo = '';
    this.params.termo = params.busca;
    this.searchEmpty = params.busca === '' || params.busca === null;
  }

  search(params) {
    this.offset = 0;
    this.searchEmpty = true;
    this.setFilterParams(params);
    if (params) {
      this.listLoading = true;
      this.offset += 30;
      this.getRegistros(this.params);
      this.listLoading = params.busca === '' || params.busca === null;
    }
  }

}
