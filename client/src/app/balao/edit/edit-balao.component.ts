import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';

import {Balao} from '../../core/balao/balao';
import {FormBuilder, Validators} from '@angular/forms';
import {TitleService} from '../../core/title/title.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BalaoService} from '../../core/balao/balao.service';

import {SpinnerService} from '../../core/spinner/spinner.service';
import {AlertService} from '../../core/alert/alert.service';
import {faCheck, faFrown} from '@fortawesome/free-solid-svg-icons';
import {Atendimento} from '../../core/atendimento/atendimento';
import {AtendimentoService} from '../../core/atendimento/atendimento.service';

@Component({
  selector: 'app-edit-balao',
  templateUrl: './edit-balao.component.html',
  styleUrls: ['./edit-balao.component.scss']
})
export class EditBalaoComponent implements OnInit {
  atendimentoId;
  datePipe = new DatePipe('en-US');
  atendimento: Atendimento = new Atendimento();
  balao: Balao;
  searchForm = this.fb.group({searchControl: ['']});
  form = this.fb.group({
    dataBalao: ['', Validators.required],
    horaBalao: ['', Validators.required]
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
    this.titleService.send('Balão - Formulário');
    this.atendimentoId = this.route.snapshot.params.id;
    this.atendimentoService.get(this.atendimentoId).subscribe(atendimento => {
      this.atendimento = atendimento;
      this.form.get('dataBalao').setValue(this.datePipe.transform(atendimento[0].balao.dataHoraBalao, 'yyyy-MM-dd', '', 'en-US'));
      this.form.get('horaBalao').setValue(this.datePipe.transform(atendimento[0].balao.dataHoraBalao, 'HH:mm', '', 'en-US'));
    });
  }

  update() {
    const balao: Balao = new Balao(
      {
        id: this.atendimento[0].balao.id,
        dataHoraBalao: this.form.get('dataBalao').value + ' ' + this.form.get('horaBalao').value,
      });

    if (this.form.get('dataBalao').value == "" || this.form.get('horaBalao').value == "") {
      this.alertService.send({
        message: 'Ops... A data/hora deve ser preenchida!',
        type: 'warning',
        icon: faFrown
      })
    } else {
      this.balaoService.save(balao).subscribe(() => {
        setTimeout(() => {
          this.alertService.send({message: 'Balão Alterado com sucesso!', type: 'success', icon: faCheck});
          this.router.navigate(['/pacientes']);
        }, 300);
      });
    }

  }
}
