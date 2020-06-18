import {AfterViewChecked, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'aria-card',
  styleUrls: ['./card.component.scss'],
  template: `
    <main #container [ngStyle]="{'width':width, 'height':buildSize(height), 'flex-direction':direction}"
          class="card">
      <ng-content></ng-content>
    </main>
  `
})

export class CardComponent implements OnInit, AfterViewChecked {
  @Input() width;
  @Input() height;
  @Input() direction = 'row';
  @ViewChild('container', {static: false}) container: ElementRef;

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
  }

  buildSize = (size) => size ? `calc(${size} - 40px)` : '';

  ngAfterViewChecked(): void {
    let parent = this.render.parentNode(this.container.nativeElement);
    this.render.setStyle(parent, 'width', `calc(${this.width} - 20px)`);
  }

}
