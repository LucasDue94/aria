import {Component, DoCheck, ViewChild} from '@angular/core';
import {AlertService} from "../core/alert/alert.service";
import {Alert} from "../core/alert/alert";
import {SpinnerComponent} from "../spinner/spinner.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements DoCheck {
  @ViewChild(SpinnerComponent, {static: false}) spinner;
  moduleName = 'Perfil Epidemiológico';
  alert: Alert;
  menuStatus;

  constructor(private alertService: AlertService) {
  }

  ngDoCheck(): void {
    this.alertService.receive().subscribe(alert => this.alert = alert);
  }

  getStatusMenu(event) {
    this.menuStatus = event;
  }

}
