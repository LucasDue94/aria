import {AfterViewChecked, Component, OnInit} from '@angular/core';
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
    internos: false,
    tipoSetor: 'U'
  };

  constructor(private registroLeitoService: RegistroLeitoService, private router: Router,
              private titleService: TitleService, private filterService: FilterService) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.filterService.receive().subscribe(this.search);
    this.listLoading = true;
    this.titleService.send('NAS - Lista de pacientes');
    this.getRegistros(this.params, true);
    this.getRegistros(this.params);
  }

  ngAfterViewChecked(): void {
    this.sortPacientesInternos();
  }

  getRegistros(params, internos = false) {
    this.params.internos = internos;
    this.showListScrollSpinner = true;
    this.registroLeitoService.list(params)
      .subscribe((registrosLeito: RegistroLeito[]) => {
        if (internos) this.pacientesInternos = this.pacientesInternos.concat(registrosLeito);
        else this.outrosPacientes = this.outrosPacientes.concat(registrosLeito);
        this.sortPacientesInternos();
        this.listLoading = false;
        this.showListScrollSpinner = false;
      });
  }

  search(params) {
    this.cleanFields();
    this.setFilterParams(params);
    this.listLoading = true;
    this.getRegistros(this.params, true);
    this.getRegistros(this.params);
  }

  edit = (registroLeito: RegistroLeito) => this.router.navigate(['nas', 'create', registroLeito.id]);

  sortPacientesInternos() {
    const comNas = this.pacientesInternos.filter((p) => p.getLastNas() && this.isToday(p.getLastNas().data));
    const semNas = this.pacientesInternos.filter((p) => !p.getLastNas() || !this.isToday(p.getLastNas().data));

    comNas.sort((a, b) => {
      const escoreA = a.getLastNas() && this.isToday(a.getLastNas().data) ? (a.getLastNas().escore) : 0;
      const escoreB = b.getLastNas() && this.isToday(b.getLastNas().data) ? (b.getLastNas().escore) : 0;

      return escoreA < escoreB ? 1 : -1;
    });

    semNas.sort((a, b) => a.atendimento.paciente.nome > b.atendimento.paciente.nome ? 1 : -1);

    this.pacientesInternos = [...semNas, ...comNas];
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.params.offset += 15;
    this.getRegistros(this.params);
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

  isToday(dataEntrada: string) {
    const currentDate = new Date(dataEntrada);
    const today = new Date();
    return currentDate.toLocaleString().slice(0, 10) == today.toLocaleString().slice(0, 10);
  }

  roundEscore = (escore) => parseFloat(escore).toFixed(1);
}
