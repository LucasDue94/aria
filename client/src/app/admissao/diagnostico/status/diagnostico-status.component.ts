import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {EnumStatusCid} from '../../../core/cid/enumStatusCid';

@Component({
  selector: 'app-diagnostico-status',
  templateUrl: './diagnostico-status.component.html',
  styleUrls: ['./diagnostico-status.component.scss']
})
export class DiagnosticoStatusComponent implements OnInit, AfterViewInit {

  faMinusCircle = faMinusCircle;
  diagnosticStatus = [
    {id: 1, status: 'Suspeita'},
    {id: 2, status: 'Confirmado'},
    {id: 3, status: 'Descartado'}
  ];

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  setStatusColors(event) {
    const buttonStatus = event.target;
    switch (buttonStatus.innerText) {
      case EnumStatusCid.SUSPEITA:
        this.render.addClass(buttonStatus, 'active-status-suspicious');
        break;
      case EnumStatusCid.CONFIRMADO:
        this.render.addClass(buttonStatus, 'active-status-confirm');
        break;
      case EnumStatusCid.DESCARTADO:
        this.render.addClass(buttonStatus, 'active-status-descarded');
    }
  }
}
