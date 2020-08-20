import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Paciente} from '../../core/paciente/paciente';

@Component({
  selector: 'app-plano-terapeutico',
  templateUrl: './plano-terapeutico-form.component.html',
  styleUrls: ['./plano-terapeutico-form.component.scss']
})
export class PlanoTerapeuticoFormComponent implements OnInit {

  @Output() planTherapeutic = new EventEmitter();
  @Output() statePlan = new EventEmitter();
  @Input() paciente: Paciente;

  form = this.formBuilder.group({
    problemaAtivo: new FormControl('', Validators.required),
    resultadoEsperado: new FormControl('', Validators.required),
    conduta: new FormControl('', Validators.required),
    prazo: new FormControl('', Validators.required),
    atendimento: new FormControl('', Validators.required)
  });

  constructor(private formBuilder: FormBuilder) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    setTimeout(() => {
      this.form.get('atendimento').setValue(this.paciente.getUltimoRegistro().id);
    }, 1000);

    this.form.valueChanges.subscribe(plan => {
      this.planTherapeutic.emit(plan);
    });

    this.form.statusChanges.subscribe(state => {
      this.statePlan.emit(state);
    });
  }
}
