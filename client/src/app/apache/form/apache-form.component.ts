import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../core/spinner/spinner.service";
import {AlertService} from "../../core/alert/alert.service";
import {TitleService} from "../../core/title/title.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApacheService} from "../../core/apache/apache.service";
import {faCheck, faExclamationCircle, faFrown, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {Apache} from "../../core/apache/apache";

@Component({
  selector: 'apache-form',
  templateUrl: './apache-form.component.html',
  styleUrls: ['./apache-form.component.scss']
})
export class ApacheFormComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  apache: Apache = new Apache();
  registroAtendimento: RegistroAtendimento;
  registroAtendimentoLeito: any;
  temperatura = ['> 41', '39 - 40.9', '38.5 - 38.9', '36 - 38.4', '34 - 35.9', '32 - 33.9', '30 - 31.9', '< 29.9'];
  kSerico = ['> 7', '6 - 6.9', '5.5 - 5.9', '3.5 - 5.4', '3 - 3.4', '2.5 - 2.9', '< 2.5'];
  naSerico = ['> 180', '160 - 179', '155 - 159', '150 - 154', '130 - 149', '120 - 129', '111 - 119', '< 110'];
  leucocitos = ['> 40', '20 - 39.9', '15 - 19.9', '3 - 14.9', '1 - 2.9', '< 1'];
  arterialPh = ['< 7.7; > 52', '7.6 - 7.69; 41 - 51.9', '7.5 - 7.59; 32 - 40.9', '7.33 - 7.49; 32 - 40.9', '7.25 - 7.32; 18 - 22.9', '7.15 - 7.24; 15 - 17.9', '< 7.15; < 15'];
  glasgow = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  problemasCronicos = ['Nenhum', 'Não - Cirúrgico', 'Cirurgia de Emergência', 'Cirurgia Eletiva'];
  frequenciaCardiaca = ['> 180', '140 - 179', '110 - 139', '70 - 109', '55 - 69', '40 - 54', '< 39'];
  frequenciaRespiratoria = ['> 50', '35 - 49', '25 - 34', '12 - 24', '10 - 11', '6 - 9', '< 5'];
  aapo = ['> 500', '350 - 499', '200 - 349', '< 200 ou PaO2 > 70', 'PaO2 61 - 70', 'PaO2 < 55'];
  hematocrito = ['> 60', '50 - 59.9', '46 - 49.9', '30 - 45.9', '20 - 29.9', '< 20'];
  creatinina = ['> 3.5', '> 3.5 in ARF', '2 - 3.4', '2 - 3.4 in ARF', '1.5 - 1.9', '1.5 - 1.9 in ARF', '0.6 - 1.4', '< 0.6'];
  pressaoMedia = 0;
  showProblemas = false;
  messageError = "Este campo não pode ser vazio.";
  messagePressao = "";
  labelPosition = 'left';
  send = false;

  constructor(private spinner: SpinnerService, private alert: AlertService,
              private title: TitleService, private fb: FormBuilder,
              private route: ActivatedRoute, private apacheService: ApacheService,
              private registroAtendimentoService: RegistroAtendimentoService,
              private alertService: AlertService, private router: Router) {

  }

  ngOnInit() {
    if (window.innerWidth < 1024) this.labelPosition = 'top';
    this.spinner.show();

    this.title.send('Apache II - Formulário');
    const id = this.route.snapshot.queryParamMap.get('registro');
    this.registroAtendimentoService.get(id).subscribe(res => {
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
        this.registroAtendimentoLeito = {
          dataEntrada: this.route.snapshot.queryParamMap.get('dataEntrada'),
          leito: {
            id: this.route.snapshot.queryParamMap.get('leito')
          },
          registroAtendimento: {
            id: this.registroAtendimento.id
          },
        dataAlta: this.route.snapshot.queryParamMap.get('dataAlta')}
      }

      const apacheId = this.route.snapshot.queryParamMap.get('apacheId');
      if (apacheId) {
        this.apacheService.get(apacheId).subscribe(res => {
          if (res.hasOwnProperty('error')) {
            messageError = res.error.error.message;
            this.alertService.send({
              message: messageError,
              type: 'error',
              icon: faFrown
            });
          } else {
            this.apache = res;
            this.calculaPressaoMedia()
          }
          this.spinner.hide();
        });
      } else {
        this.spinner.hide();
      }
    });
  }

  calculaPressaoMedia() {
    if (this.apache.hasOwnProperty('pas') && this.apache.hasOwnProperty('pad')) {
      this.pressaoMedia = ((this.apache.pas) + (this.apache.pad * 2)) / 3;
      this.checkPressao();
    }
  }

  checkPressao() {
    if ((this.pressaoMedia > 300 || this.pressaoMedia < 20) || (this.apache.pas < this.apache.pad)) {
      this.messagePressao = 'A pressao média deve estar entre o intervalo 20 > PM > 300.' +
        ' Além disso a pressão sistólica precisa ser maior que a diastólica.';
      return true
    }

    this.messagePressao = '';
    return false
  }

  clear() {
    this.apache = new Apache();
    this.pressaoMedia = 0;
    this.messagePressao = '';
    this.send = false;
  }

  checkFieldError = (field) => field == undefined && this.send;

  hasErrors() {
    if (this.isEmpty(this.apache)) {
      this.messagePressao = 'Informe a pressão sistólica e diastólica.';
      return true;
    }
    for (const key in this.apache) {
      if (this.apache.hasOwnProperty(key) && this.apache[key] != undefined && this.apache[key] != ''
        && key != 'escore' && key != 'id' && this.checkPressao()) {
        return true
      }
    }
    return false
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true
  }


  save() {
    this.apache.registroAtendimentoLeito = this.registroAtendimentoLeito;
    this.send = true;
    if (!this.hasErrors()) {
      this.apacheService.save(this.apache).subscribe(res => {
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
          this.alertService.send({message: 'Apache II salvo com sucesso!', type: 'success', icon: faCheck});
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
