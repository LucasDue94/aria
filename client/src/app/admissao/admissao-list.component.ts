import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'aria-admissao',
  templateUrl: './admissao-list.component.html',
  styleUrls: ['admissao-list.scss']
})
export class AdmissaoListComponent implements OnInit {

  @Input() currentStep = 0;
  @Output() sizeListDiagnostic = new EventEmitter();
  @Output() diagnostic = new EventEmitter();
  @Output() planTherapeutic = new EventEmitter();
  @Output() statePlan = new EventEmitter();
  @Input() paciente;

  constructor() {
  }

  ngOnInit(): void {

  }

  getSizeListDiagnostic(size) {
    this.sizeListDiagnostic.emit(size);
  }

  getPlanTherapeutic(planTherapeutic) {
    this.planTherapeutic.emit(planTherapeutic);
  }

  getStatePlanTherapeutic(statePlanTherapeutic) {
    this.statePlan.emit(statePlanTherapeutic);
  }

  getDiagnostic(diagnostic) {
    this.diagnostic.emit(diagnostic);
  }

}
