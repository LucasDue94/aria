import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faBars, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {MenuService} from "../core/menu/menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuStatus: EventEmitter<any> = new EventEmitter();
  systemName;
  usuarioLogado;
  faBars = faBars;
  faSingOut = faSignOutAlt;
  showMenu = true;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.systemName = 'hamb';
    this.usuarioLogado = localStorage;
    if (window.innerWidth <= 1200) this.showMenu = false;
    this.menuService.setStatus(this.showMenu);
  }

  logout() {
  }


  changeStatus() {
    this.showMenu = !this.showMenu;
    this.menuService.setStatus(this.showMenu);
    this.menuStatus.emit(this.showMenu)
  }
}
