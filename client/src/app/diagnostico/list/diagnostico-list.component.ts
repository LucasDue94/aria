import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {faExclamationCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Cid} from '../../core/cid/cid';
import {CidService} from '../../core/cid/cid.service';
import {Diagnostico} from '../../core/diagnostico/diagnostico';
import {EnumStatusCid} from '../../core/cid/enumStatusCid';
import {AlertService} from '../../core/alert/alert.service';


@Component({
  selector: 'app-diagnostico-list',
  templateUrl: './diagnostico-list.component.html',
  styleUrls: ['./diagnostico-list.component.scss']
})
export class DiagnosticoListComponent implements OnInit {

  /*** events*/
  @Output() diagnostic: EventEmitter<any> = new EventEmitter();

  /*** icons*/
  faPlus = faPlus;

  /*** lists*/
  cidList: Cid[] = [];
  diagnosticSelectedList: Diagnostico[] = [];

  /*** flags*/
  cidsService;
  step = 0;
  fastSearchVisibility = true;

  constructor(private cidService: CidService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.cidsService = this.cidService;
    this.cidService.list().subscribe((cidList: Cid[]) => {
      this.cidList = cidList;
    });
  }

  getProfessional() {
    return window.localStorage.getItem('nome');
  }

  setDiagnostic(internationalCod: Cid) {
    const diagnostic = new Diagnostico({
      status: EnumStatusCid.SUSPEITA, cid: internationalCod, profissional: this.getProfessional()
    });
    if (!this.isExistDiagnostic(diagnostic)) {
      this.diagnosticSelectedList.push(diagnostic);
    } else {
      this.alertService.send({
        message: 'Cid já foi escolhido!',
        icon: faExclamationCircle,
        type: 'warning'
      });
    }
  }

  isExistDiagnostic = (diagnostic: Diagnostico) => this.diagnosticSelectedList.find(dig => dig.cid.id === diagnostic.cid.id) !== undefined;

  showListCid() {
    this.step = 0;
    this.fastSearchVisibility = true;
  }

  isEmptyListDiagnostic() {
    this.diagnosticSelectedList.length === 0  ? this.fastSearchVisibility = true : this.fastSearchVisibility = false;
  }

  removeDiagnostic(diagnostic) {
    const index = this.diagnosticSelectedList.indexOf(diagnostic);
    this.diagnosticSelectedList.splice(index, 1);
    this.isEmptyListDiagnostic();
  }

  getVisibilityFastSearch(fastSearchVisibility) {
    this.fastSearchVisibility = fastSearchVisibility;
  }
}
