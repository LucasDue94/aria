import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {EnumStatusCid} from '../../core/cid/enumStatusCid';
import {Diagnostico} from '../../core/diagnostico/diagnostico';

@Component({
  selector: 'diagnostico-status',
  templateUrl: './diagnostico-status.component.html',
  styleUrls: ['./diagnostico-status.component.scss']
})
export class DiagnosticoStatusComponent {

  faMinusCircle = faMinusCircle;
  diagnosticStatus = [
    {id: 1, desc: EnumStatusCid.SUSPEITA, class: 'active-status-suspicious'},
    {id: 2, desc: EnumStatusCid.CONFIRMADO, class: 'active-status-confirm'},
    {id: 3, desc: EnumStatusCid.DESCARTADO, class: 'active-status-descarded'}
  ];

  // TODO trocar pelo @Input()
  diagnostico = new Diagnostico({
    cid: {id: 111, diagnostico: 'COVID'},
    status: EnumStatusCid.SUSPEITA,
    profissional: {name: 'Patrícia Caldas', crm: '3547'}
  });

  constructor() {
  }

  setStatus = (status) => this.diagnostico.status = status;

}
