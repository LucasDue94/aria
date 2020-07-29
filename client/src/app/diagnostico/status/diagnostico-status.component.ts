import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {EnumStatusCid} from '../../core/cid/enumStatusCid';
import {Diagnostico} from '../../core/diagnostico/diagnostico';

@Component({
  selector: 'diagnostico-status',
  templateUrl: './diagnostico-status.component.html',
  styleUrls: ['./diagnostico-status.component.scss']
})
export class DiagnosticoStatusComponent {

  /***EVENTS*/
  @Input() diagnostic: Diagnostico;
  @Output() status = new EventEmitter();

  /***ICONS*/
  faMinusCircle = faMinusCircle;

  /***LIST */
  diagnosticStatus = [
    {id: 1, desc: EnumStatusCid.SUSPEITA, class: 'active-status-suspicious'},
    {id: 2, desc: EnumStatusCid.CONFIRMADO, class: 'active-status-confirm'},
    {id: 3, desc: EnumStatusCid.DESCARTADO, class: 'active-status-descarded'}
  ];

  constructor() {
  }

  setStatus = (status) => this.diagnostic.status = status;

}
