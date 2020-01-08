import {Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {MenuService} from "../core/menu/menu.service";
import {
  faDiagnoses,
  faFolderOpen,
  faNotesMedical,
  faChartPie,
  faUsers,
  faUser,
  faUserMd
} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../core/auth/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {

  @ViewChild('menuContainer', {static: false}) menuContainer;
  @Input('menu-status') menuStatus: boolean = false;
  faChartPie = faChartPie;
  faFolderOpen = faFolderOpen;
  faNotesMedical = faNotesMedical;
  faDiagnoses = faDiagnoses;
  faUsers = faUsers;
  faUserMd = faUserMd;
  menuPermission: boolean = false;


  constructor(private render: Renderer2, private menuService: MenuService, private authService: AuthService) {
  }

  ngOnInit() {
    this.menuPermission = this.verifyPermission(window.localStorage.getItem('roles'));
  }

  verifyPermission(permission?: string) {
    return this.authService.hasPermission(permission);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.menuContainer != undefined) {
      if (this.menuStatus) {
        this.render.removeClass(this.menuContainer.nativeElement, 'hide');
        this.render.addClass(this.menuContainer.nativeElement, 'show');
        this.menuService.setStatus(true);
      } else {
        this.render.addClass(this.menuContainer.nativeElement, 'hide');
        this.render.removeClass(this.menuContainer.nativeElement, 'show');
        this.menuService.setStatus(false);
      }
    }
  }

}
