import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Atendimento} from "../../core/atendimento/atendimento";
import {AtendimentoService} from "../../core/atendimento/atendimento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Balao} from "../../core/balao/balao";
import {BalaoService} from "../../core/balao/balao.service";
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

  atendimentoId;
  today = new Date();
  datePipe = new DatePipe('en-US');
  registroAtendimento = {id: null};
  atendimento: Atendimento;
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
    private atendimentoService: AtendimentoService,
    private router: Router, private spinner: SpinnerService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Balão - Formulário');
    this.atendimentoId = this.route.snapshot.params.id;
    this.atendimentoService.get(this.atendimentoId).subscribe(atendimento => {
      this.atendimento = atendimento;
      this.spinner.hide();
    });
  }

  save() {
    this.balao.atendimento = this.atendimentoId;
    this.balao.dataHoraBalao = this.form.get('dataBalao').value + " " + this.form.get('horaBalao').value;
    if (this.form.get('dataBalao').value == '' || this.form.get('horaBalao').value == '') {
      this.alertService.send({
        message: 'Ops... A data/hora deve ser preenchida!',
        type: 'warning',
        icon: faFrown
      })
    } else {
      this.balaoService.save(this.balao).subscribe(res => {
        if (res.hasOwnProperty('error')) {
          this.router.navigate(['pacientes'], {state: {tab: 'ECG'}});
          setTimeout(() => {
            this.alertService.send({
              message: 'Ops... O Ecg precisa ser preenchido!',
              type: 'warning',
              icon: faFrown
            })
          }, 500)
        } else {
          this.router.navigate(['pacientes']);
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


