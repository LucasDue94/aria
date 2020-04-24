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
  registrosLeito: RegistroLeito[] = [];
  params = {
    termo: '',
    inicio: '',
    fim: '',
    setorId: '',
    tipoSetor: 'U',
    max: 30,
    offset: 0
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
    this.registroLeitoService.list(this.params).subscribe((registrosLeito: RegistroLeito[]) => {
      this.registrosLeito = registrosLeito;
      this.listLoading = false;
    });
  }

  search(params) {
    this.listLoading = true;
    this.params.offset = 0;
    this.registrosLeito = [];
    this.setFilterParams(params);
    this.getRegistros();
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.params.offset += 10;
    this.registroLeitoService.list(this.params).subscribe(registrosLeito => {
      registrosLeito.forEach(registro => {
        this.registrosLeito.push(registro);
        this.showListScrollSpinner = false;
      });
    });
  }

  setFilterParams(params) {
    this.params.termo = params.busca;
    this.params.inicio = params.inicio;
    this.params.fim = params.fim;
    this.params.setorId = params.setor;
  }

  getRegistros() {
    this.registroLeitoService.list(this.params).subscribe(registrosLeito => {
      registrosLeito.forEach(registroLeito => {
        this.registrosLeito.push(registroLeito);
        this.showListScrollSpinner = false;
      });
      console.log(this.registrosLeito);
      this.listLoading = false;
    });
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

  isTimeOverflow(data, time = 0) {
    return moment() > moment(data).add((24 + time), 'hours');
  }
}
