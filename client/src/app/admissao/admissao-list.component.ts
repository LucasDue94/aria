import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'aria-admissao',
  templateUrl: './admissao-list.component.html',
  styleUrls: ['admissao-list.scss']
})
export class AdmissaoListComponent {

  @Input() currentStep = 0;
  @Output() sizeListDiagnostic = new EventEmitter();
  @Output() diagnostic = new EventEmitter();
  @Output() planTherapeutic = new EventEmitter();

  constructor() {
  }

  getSizeListDiagnostic(size) {
    this.sizeListDiagnostic.emit(size);
  }

  getPlanTherapeutic(planTherapeutic) {
    this.planTherapeutic.emit(planTherapeutic);
  }

  getDiagnostic(diagnostic) {
    this.diagnostic.emit(diagnostic);
  }

}
