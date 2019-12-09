import {Component, DoCheck} from '@angular/core';
import {AuthService} from "./core/auth/auth.service";
import {AlertService} from "./core/alert/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  isLogged = false;
  alert;

  constructor(private auth: AuthService, private alertService: AlertService, private router: Router) {
  }

  ngOnInit() {
    this.isLogged = this.auth.isLogged();

  }

  ngDoCheck(): void {
    this.alertService.receive().subscribe(res => this.alert = res);
    this.isLogged = this.auth.isLogged();
  }

}
