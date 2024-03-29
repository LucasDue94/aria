import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Atendimento} from "../../core/atendimento/atendimento";
import {Ecg} from "../../core/ecg/ecg";
import {TitleService} from "../../core/title/title.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EcgService} from "../../core/ecg/ecg.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {AlertService} from "../../core/alert/alert.service";
import {ErrorService} from "../../core/error/error.service";
import {AtendimentoService} from "../../core/atendimento/atendimento.service";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-ecg-edit',
  templateUrl: './ecg-edit.component.html',
  styleUrls: ['./ecg-edit.component.scss']
})
export class EcgEditComponent implements OnInit {
  registroId;
  today = new Date();
  datePipe = new DatePipe('en-US');
  paciente = {id: null};
  atendimento: Atendimento = new Atendimento();
  ecg: Ecg;
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
    private atendimentoService: AtendimentoService) {

  }

  ngOnInit() {
    this.titleService.send('Ecg - Editar Ecg');
    this.registroId = this.route.snapshot.params['id'];
    this.atendimentoService.get(this.registroId).subscribe(atendimento => {
      this.atendimento = atendimento;
      this.form.get('dataPorta').setValue(this.datePipe.transform(atendimento[0].ecg.dataHoraPorta, 'yyyy-MM-dd', '', 'en-US'));
      this.form.get('horaPorta').setValue(this.datePipe.transform(atendimento[0].ecg.dataHoraPorta, 'HH:mm', '', 'en-US'));
    });
  }


  update() {
    const ecg: Ecg = new Ecg(
      {
        id: this.atendimento[0].ecg.id,
        dataHoraPorta: this.form.get('dataPorta').value + " " + this.form.get('horaPorta').value,
        dataHoraEcg: this.form.get('dataECG').value + " " + this.form.get('horaECG').value,
        registroAtendimentoId: this.registroId
      });
    delete ecg.atendimento;
    this.ecgService.save(ecg).subscribe(res => {
      setTimeout(() => {
        this.alertService.send({message: 'ECG Alterado com sucesso!', type: 'success', icon: faCheck});
        this.router.navigate(['pacientes'])
      }, 300)
    });
  }
}
