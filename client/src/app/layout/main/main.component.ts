import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService} from "../../core/alert/alert.service";
import {Alert} from "../../core/alert/alert";
import {MenuService} from "../../core/menu/menu.service";
import {faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {TitleService} from "../../core/title/title.service";
import {Location} from "@angular/common";
import {SpinnerComponent} from "../../components/spinner/spinner.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(SpinnerComponent, {static: false}) spinner;
  showMenu: boolean = false;
  moduleName = 'Home';
  alert: Alert;
  faArrowLeft = faChevronCircleLeft;

  constructor(private alertService: AlertService, private menuService: MenuService,
              private titleService: TitleService, private location: Location) {
  }

  goRoute() {
    this.location.back();
  }

  ngOnInit(): void {
    this.alertService.receive().subscribe(alert => this.alert = alert);
    this.menuService.getStatus().subscribe(status => this.showMenu = status);
    this.titleService.receive().subscribe(title => this.moduleName = title);
  }
}
