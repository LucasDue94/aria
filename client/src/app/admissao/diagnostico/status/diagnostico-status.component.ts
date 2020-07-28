import { Component, OnInit } from '@angular/core';
import {Cid} from '../../../core/cid/cid';
import {faMinusCircle, faClipboardCheck, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-diagnostico-status',
  templateUrl: './diagnostico-status.component.html',
  styleUrls: ['./diagnostico-status.component.scss']
})
export class DiagnosticoStatusComponent implements OnInit {

  cidsSelected: Cid[] = [];
  faMinusCircle = faMinusCircle;
  faClipboardCheck = faClipboardCheck;
  diagnosticStatus = [
    {id: 1, status: 'Suspeita'},
    {id: 2, status: 'Confirmado'},
    {id: 3, status: 'Descartado'}
  ];

  constructor() { }

  ngOnInit() {
    console.log(this.diagnosticStatus);
  }

  setStatusCid(status?, cid?, targetStatus?) {
   /* let diagnostic = null;
    this.diagnosticStatus.forEach(situation => {
      if (status === situation.status) {
        const statusResult = this.diagnosticStatus.filter(cidStatus => cidStatus.status === status).reduce(item => item);
        diagnostic = Object.assign(statusResult, cid);
      }
    });
    this.setCidStatusColors(diagnostic, targetStatus);*/
  }


  removeCid(diagnostic: Cid) {
  /*  this.cidsSelected = this.cidsSelected.filter(c => c.id !== diagnostic.id);
    if (this.cidsSelected.length === 0) {
      this.currentStep = 0;
      this.fastSearchVisibility = true;
    }
    this.listAtendimentoCid = this.listAtendimentoCid.filter(atendimentoCid => atendimentoCid.cid !== diagnostic);
    this.diagnostic.emit(this.listAtendimentoCid);*/
  }
}
