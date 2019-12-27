import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TitleService} from "../../core/title/title.service";
import {PermissaoService} from "../../core/permissao/permissao.service";
import {Permissao} from "../../core/permissao/permissao";

@Component({
  selector: 'app-grupo-create',
  templateUrl: './grupo-create.component.html',
  styleUrls: ['./grupo-create.component.scss']
})
export class GrupoCreateComponent implements OnInit {
  form = this.fb.group({
    nome: ['', Validators.required],
    permissoes: ['', Validators.required],
  });
  permissoes: Permissao[];
  permissoesSelecionadas = new Set();

  constructor(private fb: FormBuilder, private titleService: TitleService,
              private persmissaoService: PermissaoService) {
  }

  ngOnInit() {
    this.titleService.send('Grupo - Novo Grupo');
    this.persmissaoService.list(10000, '').subscribe(res => {
      this.permissoes = res;
      console.log(this.permissoes);
      this.orderArray();
    });
  }

  orderArray() {
    this.permissoes.sort(function (a, b) {
      if (a.nome > b.nome) return 1;
      else return -1;
    })
  }

  setPermission(permissionId) {
    if (this.permissoesSelecionadas.has(permissionId)){
      this.permissoesSelecionadas.delete(permissionId);
      //TODO CHANGE COLOR
    }
    else{
      this.permissoesSelecionadas.add(permissionId);
      //TODO CHANGE COLOR
    }
  }

  save() {
    //TODO save method
  }

  isGroup = (group, authority) => authority.includes(group);
}
