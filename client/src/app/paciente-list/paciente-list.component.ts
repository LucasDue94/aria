import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SetorService} from "../core/setor/setor.service";
import {PacienteService} from "../core/paciente/paciente.service";
import {Setor} from "../core/setor/setor";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
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
  setorId;
  faPlus = faPlus;
  faMin = faMinus;
  listLoading = true;
  showListScrollSpinner = false;
  spinner;
  params = {
    termo: '',
    inicio: '',
    fim: '',
    setorId: '',
    offset: this.offset,
    max: this.max
  };
  setores: Setor[] = [];
  registroLeitos: RegistroLeito[] = [];
  searchEmpty = true;

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

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 30;
    this.getRegistros();
  }

  getStatusSearch(statusSearch) {
    this.searchEmpty = statusSearch;
  }

  setFilterParams(params) {
    this.params.setorId = '';
    this.registroLeitos = [];
    this.params.termo = params.busca;
    this.searchEmpty = params.busca === '' || params.busca === null;
  }

  search(params) {
    this.offset = 0;
    this.listLoading = true;
    this.setFilterParams(params);
    if (params) { this.offset += 30; this.getRegistros(); }
    this.listLoading = params.busca === '' || params.busca === null;
  }

  getRegistros() {
    this.registroLeitoService.list(this.params).subscribe(registro => {
      this.registroLeitos = registro;
      this.showListScrollSpinner = false;
      this.listLoading = false;
    });
  }

  open(id: any) {
    this.params.setorId = id;
    this.listLoading = true;
    this.getRegistros();
    this.render.addClass(this.collapse.nativeElement, 'container-scroll-none');
    this.collapse.nativeElement.childNodes.forEach(node => {
      if (node.id === id) {
        if (node.lastChild.classList.contains('collapse-none')) {
          this.render.removeClass(node.lastChild, 'collapse-none');
          this.render.addClass(node.childNodes[0].lastChild, 'collapse-none');
        }
      }
      if (node.lastChild != null) {
        if (node.lastChild.classList.value === 'collapse-content collapse-none') {
          this.render.addClass(node, 'collapse-none');
        }
      }
    });
  }

  close(id: any) {
    this.render.removeClass(this.collapse.nativeElement, 'container-scroll-none');
    this.collapse.nativeElement.childNodes.forEach(node => {
      if (node.id === id) {
        if (node.lastChild.classList.contains('collapse-content')) {
          this.render.addClass(node.lastChild, 'collapse-none');
          this.render.removeClass(node.childNodes[0].lastChild, 'collapse-none');
        }
      }
      if (node.lastChild != null) {
        if (node.lastChild.classList.value === 'collapse-content collapse-none') {
          this.render.removeClass(node, 'collapse-none');
        }
      }
    });
  }
}
