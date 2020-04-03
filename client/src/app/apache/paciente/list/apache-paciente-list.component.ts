import {Component, OnInit} from '@angular/core';
import {faFrown, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Setor} from "../../../core/setor/setor";
import {ApacheService} from "../../../core/apache/apache.service";
import {SetorService} from "../../../core/setor/setor.service";
import {FormBuilder} from "@angular/forms";
import {TitleService} from "../../../core/title/title.service";
import {ErrorService} from "../../../core/error/error.service";
import * as moment from 'moment';
import {FilterService} from "../../../core/filter/filter.service";
import {RegistroAtendimentoLeitoService} from "../../../core/registroAtendimentoLeito/registroAtendimentoLeito.service";
import {RegistroAtendimentoLeito} from "../../../core/registroAtendimentoLeito/registroAtendimentoLeito";

@Component({
  selector: 'apache-paciente-list',
  templateUrl: './apache-paciente-list.component.html',
  styleUrls: ['./apache-paciente-list.component.scss']
})

export class ApachePacienteListComponent implements OnInit {

  faFrown = faFrown;
  faSearch = faSearch;
  showListScrollSpinner = false;
  listLoading = false;
  registrosLeito: RegistroAtendimentoLeito[] = [];
  arrayListSetor: Setor[] = [];
  setorId = null;
  offset = 0;
  max = 30;
  params = {
    termo: '',
    inicio: '',
    fim: '',
    setorId: null,
  };

  constructor(private apacheService: ApacheService, private setorService: SetorService, private errorService: ErrorService,
              private titleService: TitleService, private fb: FormBuilder, private filterService: FilterService,
              private registroAtendimentoLeitoService: RegistroAtendimentoLeitoService) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.filterService.receive().subscribe(this.search);
    this.listLoading = true;
    this.titleService.send('Apache II - Lista de Pacientes');
    // this.getRegistros()
  }

  search(params) {
    this.listLoading = true;
    this.offset = 0;
    this.registrosLeito = [];
    this.setFilterParams(params);
    // this.getRegistros()
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.apacheService.list(this.setorId, this.params.termo, this.offset, this.max).subscribe(registrosLeito => {
      registrosLeito.forEach(registro => {
        this.registrosLeito.push(registro);
        this.showListScrollSpinner = false;
      });
    });
  }

  getRowClass(registro: any) {
    let rowClass = 'hiden';
    if (this.setorId != null && this.setorId != undefined && this.setorId != '' && this.setorId != 'null') {
      if (registro.apache) {
        rowClass = 'row-success';
      } else if (moment() > moment(registro.dataEntrada).add(24, 'hours')) { // Testa se passaram 24 horas da entrada
        rowClass = 'row-available';
        const setor = this.arrayListSetor.find(s => s.id == this.setorId);
        if (moment() > moment(registro.dataEntrada).add(24 + setor.prazoApache, 'hours')) { // Testa se alem das 24 horas, estourou o prazo do setor
          rowClass = 'row-alert';
        }
      }
    } else {
      rowClass = '';
    }
    return rowClass;
  }

  setFilterParams(params) {
    this.params.termo = params.busca;
    this.params.inicio = params.inicio;
    this.params.fim = params.fim;
    this.params.setorId = params.setor;
  }

 /* getRegistros() {
    this.registroAtendimentoLeitoService.list(this.params, this.offset, this.max).subscribe(registrosLeito => {
      registrosLeito.forEach(registroLeito => {
        this.registrosLeito.push(registroLeito);
        this.showListScrollSpinner = false;
      });
      console.log(this.registrosLeito)
      this.listLoading = false;
    })
  }*/
}
