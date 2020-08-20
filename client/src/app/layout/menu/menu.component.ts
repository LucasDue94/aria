import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {
  faBed,
  faDiagnoses,
  faEdit,
  faExclamation,
  faFolderOpen,
  faUserMd,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../core/auth/auth.service';
import {Menu} from '../../core/menu/menu';
import {EnumPermisson} from '../../core/permissao/enumPermisson';
import {MenuService} from '../../core/menu/menu.service';
import {faCommentMedical} from '@fortawesome/free-solid-svg-icons/faCommentMedical';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('menuContainer', {static: false}) menuContainer;
  @ViewChild('sidenavOverlay', {static: false}) sidenavOverlay;

  show = false;
  menuList: Menu[] = [
    new Menu({
      name: 'Perfil',
      permission: EnumPermisson.role_perfil_epidemiologico_index,
      faIcon: faDiagnoses,
      router: ['/perfil']
    }),
    new Menu({
      name: 'Setores',
      permission: EnumPermisson.role_setor_ver_menu,
      faIcon: faFolderOpen,
      router: ['/setor']
    }),
    new Menu({
      name: 'Usuarios',
      permission: EnumPermisson.role_usuario_index,
      faIcon: faUserMd,
      router: ['/usuario']
    }),
    new Menu({
      name: 'Grupos',
      permission: EnumPermisson.role_grupo_index,
      faIcon: faUsers,
      router: ['/grupo']
    }),
    new Menu({
      name: 'Riscos',
      permission: EnumPermisson.role_risco_index,
      faIcon: faExclamation,
      router: ['/risco']
    }),
    new Menu({
      name: 'Tipos de Incidentes',
      permission: EnumPermisson.role_tipo_incidente_index,
      faIcon: faEdit,
      router: ['/tipo-incidente']
    }),
    new Menu({
      name: 'Pacientes',
      permission: EnumPermisson.role_paciente_index,
      faIcon: faCommentMedical,
      router: ['/paciente']
    }),
    new Menu({
      name: 'Leitos',
      faIcon: faBed,
      router: ['/painel-leitos']
    })
  ];

  constructor(private authService: AuthService, private eRef: ElementRef, private menuService: MenuService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.menuService.getStatus().subscribe(status => {
      this.toggle();
    });
  }

  toggle() {
    const condition: boolean = this.menuContainer.nativeElement && this.menuContainer.nativeElement.classList.contains('menu-collapsed');
    this.renderer[condition ? 'removeClass' : 'addClass'](this.menuContainer.nativeElement, 'menu-collapsed');
    this.renderer[condition ? 'addClass' : 'removeClass'](this.sidenavOverlay.nativeElement, 'sidenav-overlay-show');
    this.show = condition;
  }

  hasPermission = (item) => this.authService.hasPermission(item.permission) || !item.permission;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.show && this.sidenavOverlay.nativeElement.contains(event.target)) {
      this.renderer.addClass(this.menuContainer.nativeElement, 'menu-collapsed');
      this.renderer.removeClass(this.sidenavOverlay.nativeElement, 'sidenav-overlay-show');
      this.show = false;
    }
  }
}
