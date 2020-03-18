import {Component, OnInit, ViewChild} from '@angular/core';
import {faFrown, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Setor} from "../../../core/setor/setor";
import {ApacheService} from "../../../core/apache/apache.service";
import {SetorService} from "../../../core/setor/setor.service";
import {FormBuilder} from "@angular/forms";
import {TitleService} from "../../../core/title/title.service";
import {ErrorService} from "../../../core/error/error.service";
import * as moment from 'moment';
import {FilterService} from "../../../core/filter/filter.service";

@Component({
  selector: 'apache-paciente-list',
  templateUrl: './apache-paciente-list.component.html',
  styleUrls: ['./apache-paciente-list.component.scss']
})

export class ApachePacienteListComponent implements OnInit {

  @ViewChild('dataList', {static: false}) dataList;
  faFrown = faFrown;
  faSearch = faSearch;
  showListScrollSpinner = false;
  listLoading = false;
  admissoesPacSetor: any = [];
  arrayListSetor: Setor[] = [];
  setorId = null;
  offset = 0;
  max = 30;
  termo = '';

  constructor(private apacheService: ApacheService, private setorService: SetorService, private errorService: ErrorService,
              private titleService: TitleService, private fb: FormBuilder, private filterService: FilterService) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.filterService.receive().subscribe(this.search)
    this.listLoading = true;
    this.titleService.send('Apache II - Lista de Pacientes');
    this.setorService.list('U', '', '').subscribe(setores => {
      if (this.errorService.hasError(setores)) {
        this.listLoading = false;
        this.errorService.hasError(setores);
      } else {
        setores.forEach(setor => {
          this.arrayListSetor.push(setor);
        });
        this.apacheService.list(this.setorId, '', '', 30).subscribe(registros => {
          if (this.errorService.hasError(registros)) {
            this.listLoading = false;
            this.errorService.sendError(registros);
          } else {
            this.admissoesPacSetor = registros;
            this.listLoading = false;
          }
        });
      }
    });
  }

  search(params) {
    this.listLoading = true;
    this.offset = 0;
    this.admissoesPacSetor = [];
    if (params) {
      this.setorId = params.setor;
      this.termo = params.busca;
      this.apacheService.search(params.setor, params.busca, this.offset, this.max).subscribe(registros => {
        this.admissoesPacSetor = registros;
        this.listLoading = false;
      })
    }
  }

  scrollDown() {
    this.showListScrollSpinner = true;
    this.offset += 10;
    this.apacheService.list(this.setorId, this.termo, this.offset, this.max).subscribe(registros => {
      registros.forEach(registro => {
        this.admissoesPacSetor.push(registro);
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
}
