import {Component, OnInit, Renderer2} from '@angular/core';
import {SpinnerService} from "../../core/spinner/spinner.service";
import {SetorService} from "../../core/setor/setor.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Setor} from "../../core/setor/setor";
import {faCheck, faFrown} from "@fortawesome/free-solid-svg-icons";
import {AlertService} from "../../core/alert/alert.service";

@Component({
  selector: 'app-setor-edit',
  templateUrl: './setor-edit.component.html',
  styleUrls: ['../create/setor-create.component.scss']
})
export class SetorEditComponent implements OnInit {
  form = this.fb.group({
    codWpd: ['', Validators.required],
    descricao: ['', Validators.required],
    sigla: ['', Validators.required],
    tipo: ['', Validators.required]
  });

  selectItems = [
    {id: '', setor: 'SELECIONE'},
    {id: 'U', setor: 'UTI'},
    {id: 'I', setor: 'INTERNACAO'},
    {id: 'H', setor: 'HEMODINAMICA'},
    {id: 'E', setor: 'EMERGENCIA'},
  ];

  setor: Setor;

  constructor(private spinner: SpinnerService, private setorAriaService: SetorService,
              private render: Renderer2, private fb: FormBuilder,
              private location: Location, private router: Router,
              private route: ActivatedRoute, private alertService: AlertService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.setorAriaService.get(params['id']).subscribe(setor => {
        if (setor.hasOwnProperty('error')) {
          console.log('deu ruim!');
        } else {
          this.setor = setor;
          console.log(this.setor);
          this.setForm();
        }
      });
    });
  }

  setForm() {
    this.form.get('codWpd').setValue(this.setor.id);
    this.form.get('descricao').setValue(this.setor.descricao);
    this.form.get('sigla').setValue(this.setor.sigla);
    let setor = this.selectItems.find((el) => el.setor == this.setor.tipoSetor);
    this.form.get('tipo').setValue(setor['id']);
  }

  setValues() {
    this.setor.id = this.form.get('codWpd').value;
    this.setor.descricao = this.form.get('descricao').value;
    this.setor.sigla = this.form.get('sigla').value;
    this.setor.tipoSetor = this.form.get('tipo').value;
  }

  save() {
    this.setValues();
    if (this.form.valid) {
      this.setorAriaService.save(this.setor).subscribe(res => {
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
          this.alertService.send({message: 'Setor alterado!', type: 'success', icon: faCheck});
          setTimeout(() => {
            this.router.navigate(['/setor', 'list']);
          }, 300);
        }
      });
    } else {
      this.alertService.send({
        message: 'Preencha todos os campos',
        type: 'warning',
        icon: faFrown
      });
    }
  }
}
