import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {Ecg} from "../../core/ecg/ecg";
import {TitleService} from "../../core/title/title.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EcgService} from "../../core/ecg/ecg.service";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {AlertService} from "../../core/alert/alert.service";
import {ErrorService} from "../../core/error/error.service";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
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
  registroAtendimento = {id: null};
  registro: RegistroAtendimento = new RegistroAtendimento();
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
    private registroAtendimentoService: RegistroAtendimentoService) {

  }

  ngOnInit() {
    this.titleService.send('Ecg - Editar Ecg');
    this.registroId = this.route.snapshot.params.id;
    this.registroAtendimentoService.get(this.registroId).subscribe(registro => {
      this.registro = registro;
      this.form = this.resetForm();
    });
  }

  resetForm() {
    return this.fb.group({
      dataPorta: [this.datePipe.transform(this.registro.ecg.dataHoraPorta, 'yyyy-MM-dd', '', 'en-US'), Validators.required],
      horaPorta: [this.datePipe.transform(this.registro.ecg.dataHoraPorta, 'HH:mm', '', 'en-US'), Validators.required],
      dataECG: [this.datePipe.transform(this.today, 'yyyy-MM-dd', '', 'en-US'), Validators.required],
      horaECG: [this.datePipe.transform(this.today, 'HH:mm', '', 'en-US'), Validators.required]
    });
  }

  update() {
    const ecg: Ecg = new Ecg (
      {
        id: this.registro.ecg.id,
        dataHoraPorta: this.form.get('dataPorta').value + " " + this.form.get('horaPorta').value,
        dataHoraEcg: this.form.get('dataECG').value + " " + this.form.get('horaECG').value,
        registroAtendimentoId: this.registroId
      });

    delete ecg.registroAtendimento;
    this.ecgService.save(ecg).subscribe( res => {
      setTimeout( () => {
        this.alertService.send({message: 'ECG Alterado com sucesso!', type: 'success', icon: faCheck});
        this.router.navigate(['pacientes'])
      }, 300)
    });
  }

}
