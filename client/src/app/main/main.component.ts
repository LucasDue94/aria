import {Component, DoCheck, Renderer2, ViewChild} from '@angular/core';
import {AlertService} from "../core/alert/alert.service";
import {Alert} from "../core/alert/alert";
import {SpinnerComponent} from "../spinner/spinner.component";
import {MenuService} from "../core/menu/menu.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements DoCheck {
  @ViewChild(SpinnerComponent, {static: false}) spinner;
  @ViewChild('main-container', {static: false}) mainContainer;
  moduleName = 'Perfil Epidemiológico';
  alert: Alert;
  menuStatus: boolean;

  constructor(private alertService: AlertService, private menuService: MenuService,
              private render: Renderer2) {
  }

  ngDoCheck(): void {
    this.alertService.receive().subscribe(alert => this.alert = alert);
    this.menuService.getStatus().subscribe(status => this.menuStatus = status);
  }
}
