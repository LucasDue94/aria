import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../core/spinner/spinner.service";
import {SetorService} from "../../core/setor/setor.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../core/alert/alert.service";
import {TitleService} from "../../core/title/title.service";
import {faCheck, faExclamationCircle, faFrown} from "@fortawesome/free-solid-svg-icons";
import {UsuarioService} from "../../core/usuario/usuario.service";
import {Usuario} from "../../core/usuario/usuario";
import {Setor} from "../../core/setor/setor";
import {GrupoService} from "../../core/grupo/grupo.service";
import {Grupo} from "../../core/grupo/grupo";

@Component({
  selector: 'app-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario;
  setoresItems = [];
  grupos: Grupo[] = [];
  grupoId;

  form = this.fb.group({
    cod: ['', Validators.required],
    grupoId: ['', Validators.required],
    grupoDesc: ['', Validators.required]
  });

  constructor(private spinner: SpinnerService, private setorAriaService: SetorService, private usuarioService: UsuarioService,
              private fb: FormBuilder, private router: Router,
              private grupoService: GrupoService,
              private route: ActivatedRoute, private alertService: AlertService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.send('Usuário - Editar');
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.usuarioService.get(params['id']).subscribe(usuario => {
        if (usuario.hasOwnProperty('error')) {
          this.alertService.send({message: 'Desculpe...ocorreu um erro.', type: 'error', icon: faFrown});
        } else {
          this.usuario = usuario;
          this.titleService.send('Editar Usuário - ' + usuario.nome);
          this.setorAriaService.list('', '', 100).subscribe(setores => {
            this.setoresItems = setores;
            this.setForm();
          });
          this.spinner.hide();
        }
      });
    });


    this.grupoService.list('', '').subscribe(grupo => {
      this.grupos = grupo;
    });
  }

  setForm() {
    this.form.get('cod').setValue(this.usuario.id);
    this.form.get('grupoId').setValue(this.usuario.grupo.id);
    this.form.get('grupoDesc').setValue(this.usuario.grupo.name);
  }

  setValues() {
    this.usuario.id = this.form.get('cod').value;
  }

  save() {
    this.setValues();
    if (this.form.valid) {
      this.usuario.setores = this.usuario.setores.map((e) => {
        return new Setor({id: e.id})
      });

      this.usuario.grupo.id = this.form.get('grupoId').value;
      let usuarioId = this.form.get('cod').value;
      delete this.usuario.grupo.permissoes;
      this.usuarioService.update(usuarioId, this.usuario);

      this.usuarioService.save(this.usuario).subscribe(res => {
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
          this.alertService.send({message: 'Usuário Alterado!', type: 'success', icon: faCheck});
          setTimeout(() => {
            this.router.navigate(['/usuario', 'list']);
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

  getItemsSelected(event) {
    this.usuario.setores = event;
  }

}
