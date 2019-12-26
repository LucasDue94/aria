import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../core/spinner/spinner.service";
import {AlertService} from "../../core/alert/alert.service";
import {TitleService} from "../../core/title/title.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApacheService} from "../../core/apache/apache.service";
import {faCheck, faExclamationCircle, faFrown, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {Apache} from "../../core/apache/apache";
import {RegistroAtendimentoLeito} from "../../core/registroAtendimentoLeitos/registroAtendimentoLeito";
import {Leito} from "../../core/leito/leito";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";

@Component({
  selector: 'apache-form',
  templateUrl: './apache-form.component.html',
  styleUrls: ['./apache-form.component.scss']
})
export class ApacheFormComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  newApache: Apache;
  registroAtendimento: RegistroAtendimento;
  registroAtendimentoLeito: RegistroAtendimentoLeito = new RegistroAtendimentoLeito();
  temperatura = ['> 41', '39 - 40.9', '38.5 - 38.9', '36 - 38.4', '34 - 35.9', '32 - 33.9', '30 - 31.9', '< 29.9'];
  kSerico = ['> 7', '6 - 6.9', '5.5 - 5.9', '3.5 - 5.4', '3 - 3.4', '2.5 - 2.9', '< 2.5'];
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
        pm: ['', [Validators.required, Validators.min(21), Validators.max(299)]],
      }),
      outrasMedidas: this.fb.group({
        temperatura: ['', Validators.required],
        arterialPh: ['', Validators.required],
        naSerico: ['', Validators.required],
        leucocitos: ['', Validators.required],
        gasglow: ['', Validators.required],
        problemasCronicos: ['', Validators.required],
        frequenciaCardiaca: ['', Validators.required],
        frequenciaRespiratoria: ['', Validators.required],
        kSerico: ['', Validators.required],
        hematocrito: ['', Validators.required],
        aapo: ['', Validators.required],
        creatinina: ['', Validators.required],
      }),
    }
  );
  resetForm = false;
  showProblemas = false;
  messageError = "Este campo não pode ser vazio.";
  messagePressao = "Este campo não pode ser vazio.";
  labelPosition = 'left';

  constructor(private spinner: SpinnerService, private alert: AlertService,
              private title: TitleService, private fb: FormBuilder,
              private route: ActivatedRoute, private apacheService: ApacheService,
              private alertService: AlertService, private router: Router) {

  }

  ngOnInit() {
    if (window.innerWidth < 1024) this.labelPosition = 'top';
    this.spinner.show();

    this.title.send('Apache - Formulário');
    this.calculaPressaoMedia();
    const id = this.route.snapshot.queryParamMap.get('registro');
    this.apacheService.get(id).subscribe(res => {
      let messageError = '';
      if (res.hasOwnProperty('error')) {
        if (res.error.error.hasOwnProperty('_embedded')) {
          res.error.error._embedded.errors.forEach(error => {
            messageError += error.message + '. \n';
          });
        } else {
          messageError = res.error.error.message;
        }
        this.alertService.send({
          message: messageError,
          type: 'error',
          icon: faFrown
        });
      } else {
        this.registroAtendimento = res;
      }
      this.spinner.hide();
    });
    this.registroAtendimentoLeito.dataEntrada = this.route.snapshot.queryParamMap.get('dataEntrada');
    const leitoId = this.route.snapshot.queryParamMap.get('leito');
    this.registroAtendimentoLeito.leito = new Leito({id: leitoId});
  }

  getValue(event, controlName) {
    this.getControl(controlName).setValue(event);
  };

  getIdade(nasc) {
    let nascimento = new Date(nasc);
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
  }

  calculaPressaoMedia() {
    let pressaoMedia = this.form.get('pressaoMedia');
    pressaoMedia.get('ps').valueChanges.subscribe(res => {
      this.pressaoMedia.ps = res;
      this.pressaoMedia.pm = ((this.getControl('ps').value * 2) + (this.getControl('pd').value * 2)) / 3;
      pressaoMedia.get('pm').setValue(this.pressaoMedia.pm);
      this.checkErrorPressao();
    });
    pressaoMedia.get('pd').valueChanges.subscribe(res => {
      this.pressaoMedia.pd = res;
      this.pressaoMedia.pm = ((this.getControl('ps').value * 2) + (this.getControl('pd').value * 2)) / 3;
      pressaoMedia.get('pm').setValue(this.pressaoMedia.pm);
      this.checkErrorPressao();
    });
  }

  checkErrorPressao() {
    let ps = this.getControl('ps').value;
    let pd = this.getControl('pd').value;
    let pm = this.getControl('pm').value;

    if (ps == '' || pd == '' || pm == '') {
      this.messagePressao = 'Este campo não pode ser vazio';
    } else {
      if (ps < pd) {
        this.messagePressao = 'A pressao sistólica é menor que a diastólica';
      } else if (pm < 300 || pm > 20) {
        this.messagePressao = 'A pressao média deve estar entre o intervalo 20 > PM >300';
      }
    }
    this.getGroup('pressaoMedia').markAsTouched();
    this.getGroup('pressaoMedia').markAsDirty({onlySelf: true});
  }

  getControl(name) {
    if (name == 'ps' || name == 'pd' || name == 'pm')
      return this.form.get('pressaoMedia').get(name);

    return this.form.get('outrasMedidas').get(name);
  }

  getGroup = (name): any => this.form.get(name);

  clear() {
    this.resetForm = true;
    this.form.reset('');
    setTimeout(() => {
      this.resetForm = null;
    }, 1000);
    this.form.markAsUntouched();
  }

  setValues() {
    this.newApache = new Apache();
    this.newApache.temperatura = this.getControl('temperatura').value;
    this.newApache.pas = this.getControl('ps').value;
    this.newApache.pad = this.getControl('pd').value;
    this.newApache.frequenciaCardiaca = this.getControl('frequenciaCardiaca').value;
    this.newApache.frequenciaRespiratoria = this.getControl('frequenciaRespiratoria').value;
    this.newApache.aapo = this.getControl('aapo').value;
    this.newApache.arterialPh = this.getControl('arterialPh').value;
    this.newApache.naSerico = this.getControl('naSerico').value;
    this.newApache.kSerico = this.getControl('kSerico').value;
    this.newApache.creatininaSerica = this.getControl('creatinina').value;
    this.newApache.hematocrito = this.getControl('hematocrito').value;
    this.newApache.leucocitos = this.getControl('leucocitos').value;
    this.newApache.glasgow = this.getControl('gasglow').value;
    this.newApache.problemasCronicos = this.getControl('problemasCronicos').value;
    this.registroAtendimentoLeito.registroAtendimento = new RegistroAtendimento({id: this.registroAtendimento.id});
    this.newApache.registroAtendimentoLeito = this.registroAtendimentoLeito;
  }

  save() {
    this.getGroup('outrasMedidas').markAsDirty({onlySelf: true});
    this.getGroup('outrasMedidas').markAsTouched();
    this.checkErrorPressao();
    if (this.form.valid) {
      this.setValues();
      this.apacheService.save(this.newApache).subscribe(res => {
        let messageError = '';
        if (res.hasOwnProperty('error')) {
          if (res.error.error.hasOwnProperty('_embedded')) {
            res.error.error._embedded.errors.forEach(error => {
              messageError += error.message + '. \n';
            });
          } else {
            messageError = res.error.error.message;
          }
          this.alertService.send({
            message: messageError,
            type: 'error',
            icon: faFrown
          });
        } else {
          this.alertService.send({message: 'Apache salvo!', type: 'success', icon: faCheck});
          setTimeout(() => {
            this.router.navigate(['/apache', 'list']);
          }, 300);
        }
      });
    } else {
      this.alertService.send({
        message: 'Preencha todos os campos',
        type: 'warning',
        icon: faExclamationCircle
      });
    }
  }
}
