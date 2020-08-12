import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {PacienteService} from '../../core/paciente/paciente.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-plano-terapeutico',
  templateUrl: './plano-terapeutico-form.component.html',
  styleUrls: ['./plano-terapeutico-form.component.scss']
})
export class PlanoTerapeuticoFormComponent implements OnInit {

  @Output() planTherapeutic = new EventEmitter();
  @Output() statePlan = new EventEmitter();
  paciente;
  pacienteId;

  form = this.formBuilder.group({
    problemaAtivo: new FormControl('', Validators.required),
    resultadoEsperado: new FormControl('', Validators.required),
    conduta: new FormControl('', Validators.required),
    prazo: new FormControl('', Validators.required),
    atendimento: new FormControl('', Validators.required)
  });

  constructor(private formBuilder: FormBuilder, private pacienteService: PacienteService, private route: ActivatedRoute) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.pacienteId = this.route.snapshot.params.id;
    this.pacienteService.get(this.pacienteId).subscribe(paciente => {
      this.paciente = paciente;
      this.form.get('atendimento').setValue(this.paciente.getUltimoRegistro().id);
    });

    this.form.valueChanges.subscribe(plan => {
      this.planTherapeutic.emit(plan);
    });

    this.form.statusChanges.subscribe(state => {
      this.statePlan.emit(state);
    });
  }
}
