import {Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MenuService} from "../core/menu/menu.service";
import {
  faChartPie,
  faDiagnoses,
  faFolderOpen,
  faNotesMedical,
  faUserMd,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../core/auth/auth.service";
import {Menu} from "../core/menu/menu";
import {EnumPermisson} from "../core/permissao/enumPermisson";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('menuContainer', {static: false}) menuContainer;
  @Input('menu-status') menuStatus: boolean = true;

  menuList: Menu[] = [
    {
      name: 'perfil',
      status: false,
      permission: EnumPermisson.role_perfil_epidemiologico_index,
      faIcon: faDiagnoses,
      router: ['/perfil']
    },
    {
      name: 'apache',
      status: false,
      permission: EnumPermisson.role_apache_report,
      faIcon: faNotesMedical,
      router: ['/apache']
    },
    {
      name: 'setores',
      status: false,
      permission: EnumPermisson.role_setor_index,
      faIcon: faFolderOpen,
      router: ['/setor']
    },
    {
      name: 'relatorio',
      status: false,
      permission: '',
      faIcon: faChartPie,
      router: ['/relatorio']
    },
    {
      name: 'usuarios',
      status: false,
      permission: EnumPermisson.role_usuario_index,
      faIcon: faUserMd,
      router: ['/usuario']
    },
    {
      name: 'grupo',
      status: false,
      permission: EnumPermisson.role_grupo_index,
      faIcon: faUsers,
      router: ['/grupo']
    }
  ];

  constructor(private render: Renderer2, private menuService: MenuService, private authService: AuthService) {
  }

  ngOnInit() {
    this.createMenu();
    if (!this.authService.hasPermission(EnumPermisson.role_apache_report)) {
      this.menuList.forEach(item => {
        item.name == 'relatorio' ? item.status = false : '';
      })
    }
  }

  createMenu(): Menu[] {
    this.menuList.forEach(item => {
      this.authService.hasPermission(item.permission) ? item.status = true : item.status = false;
    });
    return this.menuList;
  }

}
