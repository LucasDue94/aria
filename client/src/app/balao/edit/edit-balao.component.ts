import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";

import {Balao} from "../../core/balao/balao";
import {FormBuilder, Validators} from "@angular/forms";
import {TitleService} from "../../core/title/title.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BalaoService} from "../../core/balao/balao.service";

import {SpinnerService} from "../../core/spinner/spinner.service";
import {AlertService} from "../../core/alert/alert.service";
import {ErrorService} from "../../core/error/error.service";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";

@Component({
  selector: 'app-edit-balao',
  templateUrl: './edit-balao.component.html',
  styleUrls: ['./edit-balao.component.scss']
})
export class EditBalaoComponent implements OnInit {
  registroId;
  today = new Date();
  datePipe = new DatePipe('en-US');
  atendimento = {id: null};
  registro: RegistroAtendimento;
  balao: Balao;
  searchForm = this.fb.group({searchControl: ['']});
  form = this.fb.group({
    dataBalao: [this.datePipe.transform('', 'yyyy-MM-dd', '', 'en-US'), Validators.required],
    horaBalao: [this.datePipe.transform('', 'HH:mm', '', 'en-US'), Validators.required]
  });

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder, private route: ActivatedRoute,
    private balaoService: BalaoService,
    private atendimentoService: RegistroAtendimentoService,
    private router: Router, private spinner: SpinnerService,
    private alertService: AlertService, datePipe: DatePipe,
    private errorService: ErrorService) {
  }

  ngOnInit() {
    this.titleService.send('Balão - Formulário');
    this.registroId = this.route.snapshot.params.id;
    this.atendimentoService.get(this.registroId).subscribe(registro => {
      this.registro = registro;
      this.form = this.resetForm();
    });
  }

  resetForm() {
    return this.fb.group({
      dataBalao: [this.datePipe.transform(this.registro.balao.dataHoraBalao, 'yyyy-MM-dd', '', 'en-US'), Validators.required],
      horaBalao: [this.datePipe.transform(this.registro.balao.dataHoraBalao, 'HH:mm', '', 'en-US'), Validators.required],
    });
  }

  update() {
    const balao: Balao = new Balao(
      {
        id: this.registro.balao.id,
        dataHoraBalao: this.form.get('dataBalao').value + " " + this.form.get('horaBalao').value,
        atendimentoId: this.registroId
      });

    delete balao.atendimento;
    this.balaoService.save(balao).subscribe( res => {
      setTimeout( () => {
        this.alertService.send({message: 'Balão Alterado com sucesso!', type: 'success', icon: faCheck});
        this.router.navigate(['/balao', 'paciente-list'])
      }, 300)
    });
  }
}
