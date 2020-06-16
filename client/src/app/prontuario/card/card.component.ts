import {AfterViewChecked, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'aria-card',
  styleUrls: ['./card.component.scss'],
  template: `
    <main #container [ngStyle]="{'width': width, 'height':height}" class="card">
      <ng-content></ng-content>
    </main>
  `
})

export class CardComponent implements OnInit, AfterViewChecked {
  @Input() width;
  @Input() height;
  @ViewChild('container', {static: false}) container: ElementRef;

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    let parent = this.render.parentNode(this.container.nativeElement);
    this.render.setStyle(parent, 'width', `calc(${this.width} - 20px)`);

  }

}
