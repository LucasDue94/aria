import {Component, DoCheck, HostListener, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './core/auth/auth.service';
import {AlertService} from './core/alert/alert.service';
import {Alert} from './core/alert/alert';
import {MenuService} from './core/menu/menu.service';
import {TitleService} from './core/title/title.service';
import {Location} from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {Modal} from './core/modal/entities/modal';
import {ModalSize} from './core/modal/entities/enumerators/modalSize.enum';
import {ModalService} from './core/modal/modal.service';
import {ModalType} from './core/modal/entities/enumerators/modalType.enum';
import {ModalTheme} from './core/modal/entities/enumerators/modalTheme.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  isLogged = false;
  alert: Alert;
  showMenu = false;
  moduleName = '';
  faArrowLeft = faChevronCircleLeft;
  modal: Modal;
  @ViewChild(SpinnerComponent, {static: false}) spinner;

  constructor(private modalService: ModalService, private auth: AuthService, private alertService: AlertService,
              private menuService: MenuService, private titleService: TitleService, private location: Location) {
  }

  ngOnInit() {
    this.alertService.receive().subscribe(alert => this.alert = alert);
    this.menuService.getStatus().subscribe(status => this.showMenu = status);
    this.titleService.receive().subscribe(title => {
      this.moduleName = title;
    });
    this.modalService.listen().subscribe(modal => {
      this.modal = modal;
    });
  }

  ngDoCheck(): void {
    this.isLogged = this.auth.isLogged();
  }

  goRoute() {
    this.location.back();
  }

  @HostListener('document:keydown', ['$event']) handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'F5') {
      e.preventDefault();
      this.modalService.open(new Modal({
        title: 'Atenção',
        message: 'Há dados que podem ser perdidos. Deseja atualizar a página?',
        type: ModalType.CONFIRM,
        theme: ModalTheme.WARNING,
        size: ModalSize.SMALL
      })).subscribe((answer) => {
        if (answer) {
          window.location.reload();
        }
      });
    }
  }
}
