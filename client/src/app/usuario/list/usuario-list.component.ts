import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {faFrown, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Usuario} from "../../core/usuario/usuario";
import {FormBuilder} from "@angular/forms";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {UsuarioService} from "../../core/usuario/usuario.service";
import {AlertService} from "../../core/alert/alert.service";

@Component({
  selector: 'app-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  constructor(private titleService: TitleService, private fb: FormBuilder, private spinner: SpinnerService,
              private usuarioService: UsuarioService, private alertService: AlertService) { }

  faFrown = faFrown;
  faSearch = faSearch;
  usuarios: Usuario[];
  data: Usuario[];

  searchForm = this.fb.group({
    searchControl: ['']
  });

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Usuários');
    this.usuarioService.list('',10000).subscribe(usuarios => {
      if (usuarios.hasOwnProperty('error')) {
        this.alertService.send({message: 'Desculpe...ocorreu um erro.', type: 'error', icon: faFrown});
      } else {
        this.data = usuarios;
        // this.sortSetor();
        this.usuarios = this.data;
        this.spinner.hide();
      }
    });
  }

  search() {
    let timeout = null;
    let _this = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      _this.executeSearch()
    }, 500);
  }

  executeSearch() {
    this.searchForm.get('searchControl').valueChanges.subscribe(res => {
      this.usuarios = this.data.filter(function (obj) {
        return `${obj.id}`.includes(res.toUpperCase()) || obj.nome.toUpperCase().includes(res.toUpperCase());
      });
    });
  }

}
