import {AfterViewChecked, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
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
export class MenuComponent implements OnInit, AfterViewChecked {

  @ViewChild('menuContainer', {static: false}) menuContainer;
  @ViewChild('sidenavOverlay', {static: false}) sidenavOverlay;

  show = false;
  menuList: Menu[] = [
    {
      name: 'Perfil',
      status: false,
      permission: EnumPermisson.role_perfil_epidemiologico_index,
      faIcon: faDiagnoses,
      router: ['/perfil']
    },
    {
      name: 'Setores',
      status: false,
      permission: EnumPermisson.role_setor_index,
      faIcon: faFolderOpen,
      router: ['/setor']
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
    },
    {
      name: 'Riscos',
      status: false,
      permission: EnumPermisson.role_risco_index,
      faIcon: faExclamation,
      router: ['/risco']
    },
    {
      name: 'Tipos de Incidentes',
      status: false,
      permission: EnumPermisson.role_tipo_incidente_index,
      faIcon: faEdit,
      router: ['/tipo-incidente']
    },
    {
      name: 'Pacientes',
      status: false,
      permission: EnumPermisson.role_paciente_index,
      faIcon: faCommentMedical,
      router: ['/paciente']
    },
    {
      name: 'Leitos',
      status: false,
      permission: '',
      faIcon: faBed,
      router: ['/painel-leitos']
    }
  ];

  constructor(private authService: AuthService, private eRef: ElementRef, private menuService: MenuService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.menuService.getStatus().subscribe(status => {
      this.toggle();
    });
  }

  ngAfterViewChecked(): void {
    this.createMenu();
  }

  toggle() {
    const condition: boolean = this.menuContainer.nativeElement && this.menuContainer.nativeElement.classList.contains('menu-collapsed');
    this.renderer[condition ? 'removeClass' : 'addClass'](this.menuContainer.nativeElement, 'menu-collapsed');
    this.renderer[condition ? 'addClass' : 'removeClass'](this.sidenavOverlay.nativeElement, 'sidenav-overlay-show');
    this.show = condition;
  }

  createMenu(): Menu[] {
    this.menuList.forEach(item => {
      item.status = this.authService.hasPermission(item.permission);
    });
    return this.menuList;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.show && this.sidenavOverlay.nativeElement.contains(event.target)) {
      this.renderer.addClass(this.menuContainer.nativeElement, 'menu-collapsed');
      this.renderer.removeClass(this.sidenavOverlay.nativeElement, 'sidenav-overlay-show');
      this.show = false;
    }
  }
}
