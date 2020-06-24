import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/auth/auth.service";
import {AlertService} from "./core/alert/alert.service";
import {Alert} from "./core/alert/alert";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged = false;
  alert: Alert;

  constructor(private auth: AuthService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.isLogged = this.auth.isLogged();
    this.alertService.receive().subscribe(res => this.alert = res);
    this.isLogged = this.auth.isLogged();
  }
}
