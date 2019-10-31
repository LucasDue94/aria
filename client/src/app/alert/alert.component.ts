import {Component, Input, OnChanges, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {AlertService} from "../core/alert/alert.service";
import {Alert} from "../core/alert/alert";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnChanges {
  @Input() alert: Alert;
  @ViewChild('container', {static: false}) containerAlert;

  constructor(private alertService: AlertService, private render: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.containerAlert != undefined) {
      this.clear();
      this.render.removeClass(this.containerAlert.nativeElement, 'hidden');
      this.render.addClass(this.containerAlert.nativeElement, this.alert.type);
      this.render.addClass(this.containerAlert.nativeElement, 'show');
      setTimeout(() => {
        this.render.addClass(this.containerAlert.nativeElement, 'hidden');
        this.clear();
      }, 2500);
    }
  }

  clear(){
    this.render.removeClass(this.containerAlert.nativeElement, 'success');
    this.render.removeClass(this.containerAlert.nativeElement, 'error');
    this.render.removeClass(this.containerAlert.nativeElement, 'warning');
  }
}
