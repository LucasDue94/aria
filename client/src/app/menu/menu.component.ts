import {Component, Input, OnInit} from '@angular/core';
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


  menuList: Menu[] = [
    {
      name: 'Perfil',
      status: false,
      permission: EnumPermisson.role_perfil_epidemiologico_index,
      faIcon: faDiagnoses,
      router: ['/perfil']
    },
    {
      name: 'Apache II',
      status: false,
      permission: EnumPermisson.role_apache_report,
      faIcon: faNotesMedical,
      router: ['/apache']
    },
    {
      name: 'Setores',
      status: false,
      permission: EnumPermisson.role_setor_index,
      faIcon: faFolderOpen,
      router: ['/setor']
    },
    {
      name: 'Relatorios',
      status: false,
      permission: '',
      faIcon: faChartPie,
      router: ['/relatorio']
    },
    {
      name: 'Usuarios',
      status: false,
      permission: EnumPermisson.role_usuario_index,
      faIcon: faUserMd,
      router: ['/usuario']
    },
    {
      name: 'Grupos',
      status: false,
      permission: EnumPermisson.role_grupo_index,
      faIcon: faUsers,
      router: ['/grupo']
    }
  ];

  constructor(private authService: AuthService) {
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
