import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'aria-admissao',
  templateUrl: './admissao-list.component.html',
  styleUrls: ['admissao-list.scss']
})
export class AdmissaoListComponent {

  @Input() currentStep = 0;
  @Output() sizeListDiagnostic = new EventEmitter();

  constructor() {
  }

  getSizeListDiagnostic(size) {
    this.sizeListDiagnostic.emit(size);
  }

  getPlanTherapeutic(planTerapeutico) {
    console.log(planTerapeutico);
  }

}
