import {AfterContentChecked, AfterViewChecked, Component, OnInit} from '@angular/core';
import {faFrown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {TitleService} from '../../core/title/title.service';
import {FilterService} from '../../core/filter/filter.service';
import {RegistroLeitoService} from '../../core/registroLeito/registro-leito.service';
import {RegistroLeito} from '../../core/registroLeito/registroLeito';

@Component({
  selector: 'nas-paciente-list',
  templateUrl: './nas-paciente-list.component.html',
  styleUrls: ['./nas-paciente-list.component.scss']
})
export class NasPacienteListComponent implements OnInit, AfterViewChecked {
  outrosPacientes: RegistroLeito[] = [];
  pacientesInternos: RegistroLeito[] = [];
  showListScrollSpinner = false;
  faFrown = faFrown;
  faSearch = faSearch;
  listLoading: boolean = false;
  params = {
    termo: '',
    inicio: '',
    fim: '',
    setorId: '',
    offset: 0,
    max: 15,
    internos: false
  };

  constructor(private registroLeitoService: RegistroLeitoService, private router: Router,
              private titleService: TitleService, private filterService: FilterService) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.filterService.receive().subscribe(this.search);
    this.listLoading = true;
    this.titleService.send('NAS - Lista de pacientes');
    this.getRegistros(this.pacientesInternos, {tipoSetor: 'U', internos: true});
    this.getRegistros(this.outrosPacientes, {tipoSetor: 'U', internos: false, max: 15});
  }

  ngAfterViewChecked(): void {
    this.sortPacientesInternos();
  }

  edit = (registroLeito: RegistroLeito) => this.router.navigate(['nas', 'create', registroLeito.id]);

  sortPacientesInternos() {
    this.pacientesInternos.sort(function(a, b) {
      if (a.atendimento.paciente.nome > b.atendimento.paciente.nome) {
        return 1;
      } else {
        return -1;
      }
    });
    this.pacientesInternos.sort(function(a, b) {
      const escoreA = a.lastNas() ? (a.lastNas().escore) : 0;
      const escoreB = b.lastNas() ? (b.lastNas().escore) : 0;

      if (escoreA > escoreB) {
        return 1;
      } else if (escoreA < escoreB) {
        return -1;
      }
    });
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.params.offset += 15;
    this.params.internos = false;
    this.getRegistros(this.outrosPacientes, this.params);
  }

  setFilterParams(params) {
    this.params.termo = params.busca;
    this.params.inicio = params.inicio;
    this.params.fim = params.fim;
    this.params.setorId = params.setor;
  }

  cleanFields() {
    this.pacientesInternos = [];
    this.outrosPacientes = [];
    this.params.offset = 0;
  }

  search(params) {
    this.cleanFields();
    this.setFilterParams(params);
    this.listLoading = true;
    this.params.internos = true;
    this.getRegistros(this.pacientesInternos, this.params);
    this.params.internos = false;
    this.getRegistros(this.outrosPacientes, this.params);
  }

  getRegistros(array, params) {
    this.showListScrollSpinner = true;
    this.registroLeitoService.list(params)
      .subscribe((registrosLeito: RegistroLeito[]) => {
        this.pushItems(array, registrosLeito);
        if (params.internos) {
          this.sortPacientesInternos();
        }
        this.listLoading = false;
        this.showListScrollSpinner = false;
      });
  }

  pushItems = (array, items) => items.forEach(item => array.push(item));

  isToday(dataEntrada: string) {
    const currentDate = new Date(dataEntrada);
    const today = new Date();
    return currentDate.toLocaleString().slice(0, 10) == today.toLocaleString().slice(0, 10);
  }

  roundEscore = (escore) => parseFloat(escore).toFixed(1);
}
