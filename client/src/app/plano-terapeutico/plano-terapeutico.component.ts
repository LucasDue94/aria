import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-plano-terapeutico',
  templateUrl: './plano-terapeutico.component.html',
  styleUrls: ['./plano-terapeutico.component.scss']
})
export class PlanoTerapeuticoComponent implements OnInit {

  @Output() planTherapeutic = new EventEmitter();

  form = this.formBuilder.group({
    problemaAtivo: new FormControl('', Validators.required),
    resultadoEsperado: new FormControl('', Validators.required),
    conduta: new FormControl('', Validators.required),
    prazo: new FormControl('', Validators.required)
  });

  constructor(private formBuilder: FormBuilder) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(plan => {
      this.planTherapeutic.emit(plan);
    });
  }

}
