import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {FormBuilder, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {AlertService} from "../../core/alert/alert.service";
import {ErrorService} from "../../core/error/error.service";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {faCheck, faFrown} from "@fortawesome/free-solid-svg-icons";
import {Ecg} from "../../core/ecg/ecg";
import {EcgService} from "../../core/ecg/ecg.service";
import {Paciente} from "../../core/paciente/paciente";

@Component({
  selector: 'app-ecg-form',
  templateUrl: './ecg-form.component.html',
  styleUrls: ['./ecg-form.component.scss']
})
export class EcgFormComponent implements OnInit {

  registroId;
  today = new Date();
  datePipe = new DatePipe('en-US');
  paciente = {id: null};
  registroAtendimento = {id: null};
  registro: RegistroAtendimento;
  ecg: Ecg = new Ecg();
  searchForm = this.fb.group({searchControl: ['']});
  form = this.fb.group({
    dataPorta: ['', Validators.required],
    horaPorta: ['', Validators.required],
    dataECG: [this.datePipe.transform(this.today, 'yyyy-MM-dd', '', 'en-US'), Validators.required],
    horaECG: [this.datePipe.transform(this.today, 'HH:mm', '', 'en-US'), Validators.required]
  });

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder, private route: ActivatedRoute,
    private ecgService: EcgService,
    private router: Router, private spinner: SpinnerService,
    private alertService: AlertService, datePipe: DatePipe,
    private errorService: ErrorService,
    private registroAtendimentoService: RegistroAtendimentoService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('ECG - FORMULÁRIO');
    this.registroId = this.route.snapshot.params.id;
    this.registroAtendimentoService.get(this.registroId).subscribe(registro => {
      this.registro = registro;
      this.spinner.hide();
    });
  }

  save() {
    this.ecg.registroAtendimento = this.registroId;
    this.ecg.dataHoraPorta = this.form.get('dataPorta').value + " " + this.form.get('horaPorta').value;
    this.ecg.dataHoraEcg = this.form.get('dataECG').value + " " + this.form.get('horaECG').value;
    this.ecg.paciente  = new Paciente({id: this.registro.paciente.id});

    if (this.form.get('dataECG').value == '' || this.form.get('horaECG').value == '' || this.form.get('dataPorta').value == '' || this.form.get('horaPorta').value == '') {
      this.alertService.send({
        message: 'Ops... A data/hora deve ser preenchida!',
        type: 'warning',
        icon: faFrown
      })
    } else {
      this.ecgService.save(this.ecg).subscribe(res => {
        console.log(res);
        if (res.hasOwnProperty('HttpErrorResponse')) {
          this.alertService.send({
            message: 'ECG já cadastrado!',
            type: 'warning',
            icon: faFrown
          });
        } else {
          this.router.navigate(['ecg']);
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
