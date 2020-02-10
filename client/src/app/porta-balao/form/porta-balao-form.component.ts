import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {FormBuilder, Validators} from "@angular/forms";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PortaBalao} from "../../core/portaBalao/portaBalao";
import {PortaBalaoService} from "../../core/portaBalao/portaBalao.service";
import {ErrorService} from "../../core/error/error.service";
import {AlertService} from "../../core/alert/alert.service";
import {DatePipe} from "@angular/common";
import {faFrown} from "@fortawesome/free-solid-svg-icons";
import {SpinnerService} from "../../core/spinner/spinner.service";

@Component({
  selector: 'app-porta-balao-form',
  templateUrl: './porta-balao-form.component.html',
  styleUrls: ['./porta-balao-form.component.scss']
})
export class PortaBalaoFormComponent implements OnInit {

  registroId;
  today = new Date();
  datePipe = new DatePipe('en-US');
  registro: RegistroAtendimento;
  portaBalao: PortaBalao = new PortaBalao();
  searchForm = this.fb.group({searchControl: ['']});
  form = this.fb.group({
    dataBalao: [this.datePipe.transform(this.today, 'yyyy-MM-dd', '', 'en-US'), Validators.required],
    horaBalao: [this.datePipe.transform(this.today, 'HH:mm', '', 'en-US'), Validators.required]
  });

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder, private route: ActivatedRoute,
    private portaBalaoService: PortaBalaoService,
    private router: Router, private spinner: SpinnerService,
    private alertService: AlertService,  datePipe: DatePipe,
    private errorService: ErrorService,
    private registroAtendimentoService: RegistroAtendimentoService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Porta Balão');
    this.registroId = this.route.snapshot.params.id;
    this.registroAtendimentoService.get(this.registroId).subscribe(registro => {
      this.registro = registro;
      this.spinner.hide();
    });
  }

  save() {
    this.portaBalao.registroAtendimento = new RegistroAtendimento({id: this.registroId});
    this.portaBalao.dataHoraBalao = this.form.get('dataBalao').value + " " + this.form.get('horaBalao').value;
    this.portaBalaoService.save(this.portaBalao).subscribe(res => {
      if (res.hasOwnProperty('error')) {

      } else {
        this.router.navigate(['portaBalao']);
        setTimeout(() => {
          this.alertService.send({
            message: 'Porta balão cadastrado',
            type: 'success',
            icon: faFrown
          });
        }, 500)
      }
    });
  }
}


