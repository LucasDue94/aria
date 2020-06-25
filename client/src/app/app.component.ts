import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./core/auth/auth.service";
import {AlertService} from "./core/alert/alert.service";
import {Alert} from "./core/alert/alert";
import {MenuService} from "./core/menu/menu.service";
import {TitleService} from "./core/title/title.service";
import {Location} from "@angular/common";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  isLogged = false;
  alert: Alert;
  showMenu: boolean = false;
  moduleName = 'Home';
  faArrowLeft = faChevronCircleLeft;

  @ViewChild(SpinnerComponent, {static: false}) spinner;

  constructor(private auth: AuthService, private alertService: AlertService, private menuService: MenuService,
              private titleService: TitleService, private location: Location) {
  }

  ngOnInit() {
    this.alertService.receive().subscribe(res => this.alert = res);
    this.alertService.receive().subscribe(alert => this.alert = alert);
    this.menuService.getStatus().subscribe(status => this.showMenu = status);
    this.titleService.receive().subscribe(title => this.moduleName = title);
  }

  ngDoCheck(): void {
    this.isLogged = this.auth.isLogged();
  }

  goRoute() {
    this.location.back();
  }
}
