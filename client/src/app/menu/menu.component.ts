import {Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {

  @ViewChild('menuContainer', {static: false}) menuContainer;
  @Input() menuStatus = true;

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.menuContainer != undefined) {
      if (this.menuStatus) {
        this.render.removeClass(this.menuContainer.nativeElement, 'hide');
        this.render.addClass(this.menuContainer.nativeElement, 'show');
      } else {
        this.render.addClass(this.menuContainer.nativeElement, 'hide');
        this.render.removeClass(this.menuContainer.nativeElement, 'show');
      }
    }
  }

}
