import {AfterViewInit, Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {SpinnerService} from "../../core/spinner/spinner.service";

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, AfterViewInit {
  status: boolean;
  faHeart = faHeart;
  @Input('width') width: string;
  @Input('height') height: string;
  @ViewChild('spinnerContainer', {static: false}) spinnerContainer;

  constructor(private render: Renderer2,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.listen().subscribe(res => this.status = res);
    if (this.height != undefined) this.status = true;
  }

  ngAfterViewInit(): void {
    if (this.height != undefined) {
      this.render.setStyle(this.spinnerContainer.nativeElement, 'height', this.height);
      this.render.setStyle(this.spinnerContainer.nativeElement, 'bottom', '0');
      this.render.setStyle(this.spinnerContainer.nativeElement, 'top', 'auto');
    }
  }
}
