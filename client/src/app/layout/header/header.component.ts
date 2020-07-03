import {Component} from '@angular/core';
import {faBars, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {MenuService} from "../../core/menu/menu.service";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faBars = faBars;
  faSingOut = faSignOutAlt;
  showMenu = true;


  constructor(private menuService: MenuService, private authService: AuthService) {
  }

  logout() {
    this.authService.logout(JSON.parse(localStorage.getItem('aria')).token);
  }

  changeStatusMenu() {
    this.showMenu = !this.showMenu;
    this.menuService.setStatus(this.showMenu);
  }
}
