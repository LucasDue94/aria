import {Component, OnInit, Renderer2} from '@angular/core';
import {SpinnerService} from "../../core/spinner/spinner.service";
import {SetorService} from "../../core/setor/setor.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Setor} from "../../core/setor/setor";
import {faCheck, faExclamationCircle, faFrown} from "@fortawesome/free-solid-svg-icons";
import {AlertService} from "../../core/alert/alert.service";
import {TitleService} from "../../core/title/title.service";
import {ErrorService} from "../../core/error/error.service";

@Component({
  selector: 'app-setor-edit',
  templateUrl: './setor-edit.component.html',
  styleUrls: ['../create/setor-create.component.scss']
})
export class SetorEditComponent implements OnInit {
  form = this.fb.group({
    id: ['', Validators.required],
    descricao: ['', Validators.required],
    sigla: ['', Validators.required],
    tipo: ['', Validators.required],
    prazoApache: ['', Validators.required],
    habilitado: ['', Validators.required]
  });

  selectItems = [
    {id: 'U', tipoSetor: 'UTI'},
    {id: 'I', tipoSetor: 'INTERNACAO'},
    {id: 'H', tipoSetor: 'HEMODINAMICA'},
    {id: 'E', tipoSetor: 'EMERGENCIA'},
    {id: 'A', tipoSetor: 'AMBULATORIO'},
  ];

  setor: Setor;

  constructor(private spinner: SpinnerService, private setorAriaService: SetorService,
              private render: Renderer2, private fb: FormBuilder,
              private location: Location, private router: Router,
              private route: ActivatedRoute,
              private errorService: ErrorService,
              private alertService: AlertService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.send('Setor - Editar');
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.setorAriaService.get(params['id']).subscribe(setor => {
        if (this.errorService.hasError(setor)) {
          this.spinner.hide();
          this.errorService.sendError(setor);
        } else {
          this.setor = setor;
          this.setForm();
          this.spinner.hide();
        }
      });
    });
  }

  setForm() {
    this.form.get('id').setValue(this.setor.id);
    this.form.get('descricao').setValue(this.setor.descricao);
    this.form.get('sigla').setValue(this.setor.sigla);
    const tipoSetor = this.selectItems.find((el) => el.tipoSetor == this.setor.tipoSetor);
    this.form.get('tipo').setValue((tipoSetor || {})['id']);
    this.form.get('prazoApache').setValue(this.setor.prazoApache);
    this.form.get('habilitado').setValue(this.setor.habilitado);
  }

  setValues() {
    this.setor.descricao =    this.form.get('descricao').value;
    this.setor.sigla =        this.form.get('sigla').value;
    this.setor.tipoSetor =    this.form.get('tipo').value;
    this.setor.prazoApache =  this.form.get('prazoApache').value;
    this.setor.habilitado =   this.form.get('habilitado').value;
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
        icon: faExclamationCircle
      });
    }
  }
}
