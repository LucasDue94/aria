import {Component, HostListener, OnInit} from '@angular/core';
import {SpinnerService} from "../../core/spinner/spinner.service";
import {AlertService} from "../../core/alert/alert.service";
import {TitleService} from "../../core/title/title.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ApacheService} from "../../core/apache/apache.service";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";

@Component({
  selector: 'apache-form',
  templateUrl: './apache-form.component.html',
  styleUrls: ['./apache-form.component.scss']
})
export class ApacheFormComponent implements OnInit {
  registroAtendimento: RegistroAtendimento;
  temperatura = ['> 41', '39 - 40.9', '38.5 - 38.9', '36 - 38.4', '34 - 35.9', '32 - 33.9', '30 - 31.9', '< 29.9'];
  kaSerico = ['> 7', '6 - 6.9', '5.5 - 5.9', '3.5 - 5.4', '3 - 3.4', '2.5 - 2.9', '< 2.5'];
  naSerico = ['> 180', '160 - 179', '155 - 159', '150 - 154', '130 - 149', '120 - 129', '111 - 119', '< 110'];
  leucocitos = ['> 40', '20 - 39.9', '15 - 19.9', '3 - 14.9', '1 - 2.9', '< 1'];
  arterialPh = ['< 7.7; > 52', '7.6 - 7.69; 41 - 51.9', '7.5 - 7.59; 32 - 40.9', '7.33 - 7.49; 32 - 40.9', '7.25 - 7.32; 18 - 22.9', '7.15 - 7.24; 15 - 17.9', '< 7.15; < 15'];
  gasglow = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  problemasCronicos = ['Nenhuma', 'Não - Cirúrgico', 'Cirurgia de Emergência', 'Cirurgia Eletiva'];
  frequenciaCardiaca = ['> 180', '140 - 179', '110 - 139', '70 - 109', '55 - 69', '40 - 54', '< 39'];
  frequenciaRespiratoria = ['> 50', '35 - 49', '25 - 34', '12 - 24', '10 - 11', '6 - 9', '< 5'];
  aapo = ['> 500', '350 - 499', '200 - 349', '< 200 ou PaO2 > 70', 'PaO2 61 - 70', 'PaO2 < 55'];
  hematocrito = ['> 60', '50 - 59.9', '46 - 49.9', '30 - 45.9', '20 - 29.9', '< 20'];
  creatinina = ['> 3.5', '> 3.5 in ARF', '2 - 3.4', '2 - 3.4 in ARF', '1.5 - 1.9', '1.5 - 1.9 in ARF', '0.6 - 1.4', '< 0.6'];
  pressaoMedia = {
    ps: 0,
    pd: 0,
    pm: 0
  };
  form = this.fb.group(
    {
      pressaoMedia: this.fb.group({
        ps: ['', Validators.required],
        pd: ['', Validators.required],
        pm: ['', Validators.required],
      }),
      temperatura: ['', Validators.required],
      arterialPh: ['', Validators.required],
      naSerico: ['', Validators.required],
      leucocitos: ['', Validators.required],
      gasglow: ['', Validators.required],
      problemasCronicos: ['', Validators.required],
      frequenciaCardiaca: ['', Validators.required],
      frequenciaRespiratoria: ['', Validators.required],
      kaSerico: ['', Validators.required],
      hematocrito: ['', Validators.required],
      aapo: ['', Validators.required],
      creatinina: ['', Validators.required],
    }
  );
  resetForm = false;

  constructor(private spinner: SpinnerService, private alert: AlertService,
              private title: TitleService, private fb: FormBuilder,
              private route: ActivatedRoute, private apacheService: ApacheService) {

  }


  ngOnInit() {
    this.title.send('Apache - Formulário');
    this.calculaPressaoMedia();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.apacheService.get(id).subscribe(res => {
        this.registroAtendimento = res;
      })
    });
  }

  getValue = (event, controlName) => {
    this.form.get(controlName).setValue(event);
  };

  getIdade(nasc) {
    let nascimento = new Date(nasc);
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
  }

  calculaPressaoMedia() {
    let pressaoMedia = this.form.get('pressaoMedia');
    pressaoMedia.get('ps').valueChanges.subscribe(res => {
      this.pressaoMedia.ps = res;
      this.pressaoMedia.pm = (this.pressaoMedia.ps + (this.pressaoMedia.pd * 2)) / 3;
      pressaoMedia.get('pm').setValue(this.pressaoMedia.pm);
    });
    pressaoMedia.get('pd').valueChanges.subscribe(res => {
      this.pressaoMedia.pd = res;
      this.pressaoMedia.pm = (this.pressaoMedia.ps + (this.pressaoMedia.pd * 2)) / 3;
      pressaoMedia.get('pm').setValue(this.pressaoMedia.pm);
    });
  }

  getControl(name) {
    if (name == 'ps' || name == 'pd' || name == 'pm')
      return this.form.get('pressaoMedia').get(name);

    return this.form.get(name);
  }

  clear() {
    this.resetForm = true;
    this.form.reset('');
    setTimeout(() => {
      this.resetForm = null;
    }, 1000);
  }
}
