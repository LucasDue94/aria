import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TitleService} from "../../core/title/title.service";
import {PermissaoService} from "../../core/permissao/permissao.service";
import {Permissao} from "../../core/permissao/permissao";
import {GrupoService} from "../../core/grupo/grupo.service";
import {Grupo} from "../../core/grupo/grupo";
import {ErrorService} from "../../core/error/error.service";
import {AlertService} from "../../core/alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {UsuarioService} from "../../core/usuario/usuario.service";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss']
})
export class GrupoFormComponent implements OnInit {
  form = this.fb.group({
    nome: ['', Validators.required],
    habilitado: [false, Validators.required]
  });
  permissoes: Permissao[];
  permissoesSelecionadas = new Set();
  aliasesGrupo = new Set();
  url = this.route.snapshot.url[0].path;
  grupo = {
    usersCount: 0
  };

  constructor(private fb: FormBuilder, private titleService: TitleService,
              private persmissaoService: PermissaoService, private render: Renderer2,
              private grupoService: GrupoService, private errorService: ErrorService,
              private alertService: AlertService, private route: ActivatedRoute,
              private router: Router, private spinner: SpinnerService, private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.url == 'create' ? this.titleService.send('Grupo - Novo Grupo') : this.titleService.send('Grupo - Editar Grupo');
    this.persmissaoService.list(10000, '').subscribe(res => {
      if (res.hasOwnProperty('error')) {
        this.errorService.sendError(res);
      } else {
        this.permissoes = res;
        this.orderArray();
        this.filterGrupo();
      }
    });

    const id = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.grupoService.get(id).subscribe(res => {
        if (res.hasOwnProperty('error')) {
          this.errorService.sendError(res)
        } else {
          this.grupo = res;
          res.permissoes.forEach(permissao => this.permissoesSelecionadas.add(permissao.id));
          this.form.get('nome').setValue(res.name);
          this.form.get('habilitado').setValue(res.habilitado);
        }
      });
    }
    this.spinner.hide();
  }

  filterGrupo = () => this.permissoes.forEach(permissao => this.aliasesGrupo.add(permissao.alias));

  orderArray() {
    this.permissoes.sort(function (a, b) {
      if (a.nome > b.nome) return 1;
      else return -1;
    })
  }

  containsPermission(id) {
    const arraySelected = Array.from(this.permissoesSelecionadas);
    return arraySelected.find(element => element == id) != undefined;
  }

  setPermission(permissionId, row) {
    if (this.permissoesSelecionadas.has(permissionId) || this.containsPermission(permissionId)) {
      this.permissoesSelecionadas.delete(permissionId);
      this.render.removeClass(row, 'selected');
    } else {
      this.permissoesSelecionadas.add(permissionId);
      this.render.addClass(row, 'selected');
    }
  }

  save() {
    let id = this.route.snapshot.params['id'];

    const grupo = new Grupo({
      id: id,
      name: this.form.get('nome').value,
      habilitado: this.form.get('habilitado').value,
      permissoes: Array.from(this.permissoesSelecionadas)
    });

    id == undefined ? delete grupo.id && delete grupo.permissoes : grupo.id && grupo.permissoes;

    this.grupoService.save(grupo).subscribe(() => {
      this.url == 'create' ?
      this.alertService.send(
        {message: 'Grupo Criado!', type: 'success', icon: faCheck}
      ) :  this.alertService.send(
        {message: 'Grupo Alterado!', type: 'success', icon: faCheck}
        ) ;

      setTimeout(() => {
        this.router.navigate(['/grupo']);
      }, 300)
    });
  }
}
