import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {faFrown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {TitleService} from "../../core/title/title.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {ErrorService} from "../../core/error/error.service";
import {Paciente} from "../../core/paciente/paciente";
import {PacienteService} from "../../core/paciente/paciente.service";
import {SetorService} from "../../core/setor/setor.service";
import {FilterService} from "../../core/filter/filter.service";

@Component({
  selector: 'incidente-paciente-list',
  templateUrl: './incidente-paciente-list.component.html',
  styleUrls: ['./incidente-paciente-list.component.scss']
})
export class IncidentePacienteListComponent implements OnInit {

  @ViewChild('dataList', {static: false}) dataList;

  searchForm = this.fb.group({
    searchControl: ['']
  });
  faSearch = faSearch;
  faFrown = faFrown;
  listLoading: boolean = false;
  pacientes: Paciente[];
  offset = 0;
  max = 30;
  showListScrollSpinner = false;
  termo = '';
  setorId = '';
  setores = [];

  constructor(private pacienteService: PacienteService, private titleService: TitleService,
              private spinner: SpinnerService, private errorService: ErrorService,
              private fb: FormBuilder, private renderer: Renderer2,
              private setorService: SetorService, private filterService: FilterService) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.titleService.send('Incidentes - Lista de Pacientes');
    this.setorService.list().subscribe((setores) => {
      this.setores = setores;
      this.list();
    });
    this.filterService.receive().subscribe(this.search)
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.pacienteService.list(this.max, this.offset, this.termo).subscribe(pacientes => {
      if (!this.errorService.hasError(pacientes)) {
        this.pacientes = this.pacientes.concat(pacientes);
      }
      this.showListScrollSpinner = false;
    });
  }

  list() {
    this.listLoading = true;
    this.pacientes = [];
    this.pacienteService.list(this.max, '', this.termo, this.setorId).subscribe(pacientes => {
      if (this.errorService.hasError(pacientes)) {
        this.pacientes = [];
      } else {
        this.pacientes = pacientes;
      }
      this.listLoading = false;
    });
  }


  search(params) {
    this.offset = 0;
    this.listLoading = true;
    this.pacientes = [];
    this.termo = params.busca;
    if (params) {
      this.pacienteService.list(this.max, this.offset,this.termo, params.setor).subscribe(pacientes => {
        this.pacientes = pacientes;
        this.listLoading = false;
      })
    }
  }
}
