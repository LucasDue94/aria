import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {FormBuilder, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Atendimento} from "../../core/atendimento/atendimento";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {AlertService} from "../../core/alert/alert.service";
import {ErrorService} from "../../core/error/error.service";
import {AtendimentoService} from "../../core/atendimento/atendimento.service";
import {Ecg} from "../../core/ecg/ecg";
import {EcgService} from "../../core/ecg/ecg.service";
import {Paciente} from "../../core/paciente/paciente";
import {PacienteService} from "../../core/paciente/paciente.service";
import {faCheck, faFrown} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-ecg-form',
  templateUrl: './ecg-form.component.html',
  styleUrls: ['./ecg-form.component.scss']
})
export class EcgFormComponent implements OnInit {
  today = new Date();
  datePipe = new DatePipe('en-US');
  paciente: Paciente;
  atendimento: Atendimento = new Atendimento();
  ecg: Ecg = new Ecg();
  searchForm = this.fb.group({searchControl: ['']});
  form = this.fb.group({
    dataPorta: ['', Validators.required],
    horaPorta: ['', Validators.required],
    dataECG: [this.datePipe.transform(this.today, 'yyyy-MM-dd', '', 'en-US'), Validators.required],
    horaECG: [this.datePipe.transform(this.today, 'HH:mm', '', 'en-US'), Validators.required]
  });
  registroId;


  constructor(
    private titleService: TitleService,
    private fb: FormBuilder, private route: ActivatedRoute,
    private ecgService: EcgService,
    private pacienteService: PacienteService,
    private router: Router, private spinner: SpinnerService,
    private alertService: AlertService, datePipe: DatePipe,
    private errorService: ErrorService,
    private atendimentoService: AtendimentoService) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.spinner.show();
    this.registroId = this.route.snapshot.params['id'];
    this.titleService.send('Ecg - Novo Ecg');
    this.atendimentoService.get(this.registroId).subscribe(atendimento => {
      this.atendimento = atendimento;
      this.f.dataPorta.setValue(this.datePipe.transform(atendimento.dataEntrada, 'yyyy-MM-dd'));
      this.f.horaPorta.setValue(this.datePipe.transform(atendimento.dataEntrada, 'HH:mm'));
      this.spinner.hide();
    });
  }

  save() {
    this.ecg.atendimento = this.registroId;
    this.ecg.dataHoraPorta = this.form.get('dataPorta').value + " " + this.form.get('horaPorta').value;
    this.ecg.dataHoraEcg = this.form.get('dataECG').value + " " + this.form.get('horaECG').value;
    if (this.form.get('dataECG').value == null || this.form.get('horaECG').value == null || this.form.get('dataPorta').value == null || this.form.get('horaPorta').value == null) {
      this.alertService.send({
        message: 'Ops... A data/hora deve ser preenchida!',
        type: 'warning',
        icon: faFrown
      })
    } else {
      this.ecgService.save(this.ecg).subscribe(res => {
        if (res.hasOwnProperty('error')) {
          setTimeout(() => {
            this.alertService.send({
              message: 'Ops... ECG já existe!',
              type: 'error',
              icon: faFrown
            });
          }, 500);
        } else {
          this.router.navigate(['pacientes']);
          setTimeout(() => {
            this.alertService.send({
              message: 'ECG cadastrado com sucesso!',
              type: 'success',
              icon: faCheck
            });
          }, 500)
        }
      });
    }
  }

}
