import {Component, OnInit} from '@angular/core';
import {ApacheService} from '../../../core/apache/apache.service';
import {SetorService} from '../../../core/setor/setor.service';
import {TitleService} from '../../../core/title/title.service';
import {FilterService} from '../../../core/filter/filter.service';
import {RegistroLeitoService} from '../../../core/registroLeito/registro-leito.service';
import {RegistroLeito} from '../../../core/registroLeito/registroLeito';
import * as moment from 'moment';

@Component({
  selector: 'apache-paciente-list',
  templateUrl: './apache-paciente-list.component.html',
  styleUrls: ['./apache-paciente-list.component.scss']
})

export class ApachePacienteListComponent implements OnInit {

  showListScrollSpinner = false;
  listLoading = false;
  outrosPacientes: RegistroLeito[] = [];
  pacientesInternos: RegistroLeito[] = [];

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

  constructor(private apacheService: ApacheService, private setorService: SetorService,
              private titleService: TitleService, private filterService: FilterService,
              private registroLeitoService: RegistroLeitoService) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.filterService.receive().subscribe(this.search);
    this.listLoading = true;
    this.titleService.send('Apache II - Lista de Pacientes');
    this.getRegistros(this.pacientesInternos, this.params, true);
    this.getRegistros(this.outrosPacientes, this.params);
  }

  getRegistros(array, params, internos = false) {
    if (internos) this.params.internos = true;
    this.showListScrollSpinner = true;
    this.registroLeitoService.list(params)
      .subscribe((registrosLeito: RegistroLeito[]) => {
        if (internos) this.pacientesInternos = this.pacientesInternos.concat(registrosLeito);
        else this.outrosPacientes = this.outrosPacientes.concat(registrosLeito);
        this.listLoading = false;
        this.showListScrollSpinner = false;
      });
  }

  search(params) {
    this.cleanFields();
    this.setFilterParams(params);
    this.listLoading = true;
    this.getRegistros(this.pacientesInternos, this.params, true);
    this.getRegistros(this.outrosPacientes, this.params);
  }

  cleanFields() {
    this.pacientesInternos = [];
    this.outrosPacientes = [];
    this.params.offset = 0;
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.params.offset += 15;
    this.getRegistros(this.outrosPacientes, this.params);
  }

  setFilterParams(params) {
    this.params.termo = params.busca;
    this.params.inicio = params.inicio;
    this.params.fim = params.fim;
    this.params.setorId = params.setor;
  }

  getRowClass(registroLeito: RegistroLeito) {
    let rowClass = '';
    if (registroLeito.apache.id) {
      rowClass = 'row-success';
    } else if (this.isTimeOverflow(registroLeito.dataEntrada)) { // Testa se passaram 24 horas da entrada
      rowClass = 'row-available';
      if (this.isTimeOverflow(registroLeito.dataEntrada, registroLeito.leito.setor.prazoApache)) { // Testa se alem das 24 horas, estourou o prazo do setor
        rowClass = 'row-alert';
      }
    }
    return rowClass;
  }

  ngOnDestroy() {
    this.filterService.unsu
  }

  isTimeOverflow(data, time = 0) {
    return moment() > moment(data).add((24 + time), 'hours');
  }
}
