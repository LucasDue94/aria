import {AfterViewInit, Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {SpinnerService} from '../../core/spinner/spinner.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input('status') status: boolean;
  @Input('loading') loading: boolean = false;
  faHeart = faHeart;
  @Input('width') width: string;
  @Input('height') height: string;
  @ViewChild('spinnerContainer', {static: false}) spinnerContainer;

  constructor(private render: Renderer2,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.listen().subscribe(res => {
      this.status = res
    const content = document.getElementsByClassName('main-content')[0];
    this.render.setStyle(content, 'display', this.status ? 'none' : 'flex');
    });
    if (this.height != undefined) this.status = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit(): void {
    if (this.height != undefined) {
      this.render.setStyle(this.spinnerContainer.nativeElement, 'height', this.height);
      this.render.setStyle(this.spinnerContainer.nativeElement, 'bottom', '0');
      this.render.setStyle(this.spinnerContainer.nativeElement, 'top', 'auto');
    }
  }
}
