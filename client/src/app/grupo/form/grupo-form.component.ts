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
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {SpinnerService} from "../../core/spinner/spinner.service";

@Component({
  selector: 'grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss']
})
export class GrupoFormComponent implements OnInit {
  form = this.fb.group({
    nome: ['', Validators.required],
  });
  permissoes: Permissao[];
  permissoesSelecionadas = new Set();
  aliasesGrupo = new Set();

  constructor(private fb: FormBuilder, private titleService: TitleService,
              private persmissaoService: PermissaoService, private render: Renderer2,
              private grupoService: GrupoService, private errorService: ErrorService,
              private alertService: AlertService, private route: ActivatedRoute,
              private router: Router, private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Grupo - Novo Grupo');
    this.persmissaoService.list(10000, '').subscribe(res => {
      if (res.hasOwnProperty('error')) {
        //TODO trate o erro aqui
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
          //TODO trate o erro aqui

        } else {
          res.permissoes.forEach(permissao => this.permissoesSelecionadas.add(permissao.id));
          this.form.get('nome').setValue(res.name);
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
    const grupo = new Grupo({
      id: this.route.snapshot.params['id'],
      name: this.form.get('nome').value,
      permissoes: Array.from(this.permissoesSelecionadas)
    });
    console.log(grupo);
    this.grupoService.save(grupo).subscribe(res => {
      if (this.errorService.hasError(res)) {
        //TODO trate o erro aqui

      } else {
        this.alertService.send({message: 'Novo grupo criado!', icon: faCheck, type: 'success'});
        setTimeout(() => {
          this.router.navigate(['/grupo']);
        }, 300)
      }
    });
  }
}

