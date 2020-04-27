import {Component, OnInit} from '@angular/core';
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
export class NasPacienteListComponent implements OnInit {
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
    max: 30
  };

  constructor(private registroLeitoService: RegistroLeitoService, private router: Router,
              private titleService: TitleService, private filterService: FilterService) {
  }

  ngOnInit() {
    this.filterService.receive().subscribe(this.search);
    this.listLoading = true;
    this.titleService.send('NAS - Lista de pacientes');
    this.getRegistros();
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

  static sortByDataEntrada(array) {
    array.sort(function(a, b) {
      if (a.dataEntrada < b.dataEntrada) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.params.offset += 30;
    this.getRegistros();
  }

  setFilterParams(params) {
    this.params.termo = params.busca;
    this.params.inicio = params.inicio;
    this.params.fim = params.fim;
    this.params.setorId = params.setor;
  }

  search(params) {
    this.pacientesInternos = [];
    this.outrosPacientes = [];
    this.params.offset = 0;
    this.listLoading = true;
    this.setFilterParams(params);

    if (params) {
      this.getRegistros();
    }
  }

  getRegistros() {
    this.pacientesInternos = [];
    this.registroLeitoService.list({tipoSetor: 'U', internos: true})
      .subscribe((pacientesInternos: RegistroLeito[]) => {
        this.pushItems(this.pacientesInternos, pacientesInternos);
        this.sortPacientesInternos();
        this.listLoading = false;
        this.showListScrollSpinner = false;
      });

    this.registroLeitoService.list({
      tipoSetor: 'U', internos: false,
      offset: this.params.offset, max: this.params.max
    }).subscribe((outrosPacientes: RegistroLeito[]) => {
      this.pushItems(this.outrosPacientes, outrosPacientes);
      NasPacienteListComponent.sortByDataEntrada(this.outrosPacientes);
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
