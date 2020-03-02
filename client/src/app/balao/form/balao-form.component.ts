import {Component, OnInit, ViewChild} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {FormBuilder, Validators} from "@angular/forms";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Balao} from "../../core/balao/balao";
import {BalaoService} from "../../core/balao/balao.service";
import {ErrorService} from "../../core/error/error.service";
import {AlertService} from "../../core/alert/alert.service";
import {DatePipe} from "@angular/common";
import {faCheck, faFrown} from "@fortawesome/free-solid-svg-icons";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {Paciente} from "../../core/paciente/paciente";

@Component({
  selector: 'app-porta-balao-form',
  templateUrl: './balao-form.component.html',
  styleUrls: ['./balao-form.component.scss']
})
export class BalaoFormComponent implements OnInit {

  registroId;
  today = new Date();
  datePipe = new DatePipe('en-US');
  registroAtendimento = {id: null};
  registro: RegistroAtendimento;
  balao: Balao = new Balao();
  searchForm = this.fb.group({searchControl: ['']});
  form = this.fb.group({
    dataBalao: [this.datePipe.transform(this.today, 'yyyy-MM-dd', '', 'en-US'), Validators.required],
    horaBalao: [this.datePipe.transform(this.today, 'HH:mm', '', 'en-US'), Validators.required],
    status: true
  });

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder, private route: ActivatedRoute,
    private balaoService: BalaoService,
    private registroAtendimentoService: RegistroAtendimentoService,
    private router: Router, private spinner: SpinnerService,
    private alertService: AlertService, datePipe: DatePipe,
    private errorService: ErrorService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Balão - Formulário');
    this.registroId = this.route.snapshot.params.id;
    this.registroAtendimentoService.get(this.registroId).subscribe(registro => {
      this.registro = registro;
      this.spinner.hide();
    });
  }

  save() {
    this.balao.registroAtendimento = this.registroAtendimento.id = this.registroId;
    this.balao.dataHoraBalao = this.form.get('dataBalao').value + " " + this.form.get('horaBalao').value;
    this.balao.paciente = new Paciente({id: this.registro.paciente.id});
    if (this.form.get('dataBalao').value == '' || this.form.get('horaBalao').value == '') {
      this.alertService.send({
        message: 'Ops... A data/hora deve ser preenchida!',
        type: 'warning',
        icon: faFrown
      })
    } else {
      this.balaoService.save(this.balao).subscribe(res => {
        if (res.hasOwnProperty('error')) {
          this.router.navigate(['balao']);
          setTimeout(() => {
            this.alertService.send({
              message: 'Ops... O Ecg precisa ser preenchido!',
              type: 'warning',
              icon: faFrown
            })
          }, 500)
        } else {
          this.router.navigate(['balao']);
          setTimeout(() => {
            this.alertService.send({
              message: 'Balão cadastrado',
              type: 'success',
              icon: faCheck
            });
          }, 500)
        }
      });
    }
  }
}


