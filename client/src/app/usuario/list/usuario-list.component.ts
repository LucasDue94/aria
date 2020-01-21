import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {faFrown, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Usuario} from "../../core/usuario/usuario";
import {FormBuilder} from "@angular/forms";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {UsuarioService} from "../../core/usuario/usuario.service";
import {ErrorService} from "../../core/error/error.service";
import {EnumPermisson} from "../../core/permissao/enumPermisson";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  constructor(private titleService: TitleService, private fb: FormBuilder, private spinner: SpinnerService,
              private usuarioService: UsuarioService, private errorService: ErrorService, private authService: AuthService, private router: Router) { }

  faFrown = faFrown;
  faSearch = faSearch;
  usuarios: Usuario[];
  data: Usuario[];

  searchForm = this.fb.group({
    searchControl: ['']
  });

  ngOnInit() {
    this.spinner.show();
    this.titleService.send('Lista de Usuários');
    if (!this.authService.hasPermission(EnumPermisson.role_usuario_index)) {
      this.router.navigate(['/error']);
    }
    this.usuarioService.list('',10000).subscribe(usuarios => {
      if (this.errorService.hasError(usuarios)) {
        this.spinner.hide();
        this.errorService.sendError(usuarios);
      } else {
        this.data = usuarios;
        this.sortUsuario();
        this.usuarios = this.data;
        this.spinner.hide();
      }
    });
  }

  sortUsuario() {
    this.data.sort( (a, b) => (a.nome > b.nome) ? 1 : -1)
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
