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
  outrosPacientes: RegistroAtendimentoLeito[] = [];
  pacientesInternos: RegistroAtendimentoLeito[] = [];
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

  sortPacientesInternos() {
    this.pacientesInternos.sort(function (a, b) {
      if (a.registroAtendimento.paciente.nome > b.registroAtendimento.paciente.nome)
        return 1;
      else
        return -1;
    });
    this.pacientesInternos.sort(function (a, b) {
      const escoreA = a.lastNas() ? (a.lastNas().escore) : 0;
      const escoreB = b.lastNas() ? (b.lastNas().escore) : 0;

      if (escoreA > escoreB)
        return 1;
      else if (escoreA < escoreB)
        return -1;
    });
  }

  static sortByDataEntrada(array) {
    array.sort(function (a, b) {
      if (a.dataEntrada < b.dataEntrada)
        return 1;
      else
        return -1;
    });
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
    this.pacientesInternos = [];
    this.outrosPacientes = [];
    this.offset = 0;
    this.listLoading = true;
    this.setFilterParams(params);
    if (params) this.getRegistros()
  }

  getRegistros() {
    this.pacientesInternos = [];
    this.registroAtendimentoLeitoService.list('', 'U', this.offset, this.max)
      .subscribe(data => {
        this.pushItems(this.pacientesInternos, data['pacientesInternos']);
        this.pushItems(this.outrosPacientes, data['outrosPacientes']);
        this.sortPacientesInternos();
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

  roundEscore(escore){
    return parseFloat(escore).toFixed(1)
  }
}
