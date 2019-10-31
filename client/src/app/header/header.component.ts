import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faBars, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

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

  constructor() {
  }

  ngOnInit() {
    this.systemName = 'hamb';
    this.usuarioLogado = localStorage;
  }

  logout() {
  }


  changeStatus() {
    this.showMenu = !this.showMenu;
    this.menuStatus.emit(this.showMenu)
  }
}
