import {Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {MenuService} from "../core/menu/menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {

  @ViewChild('menuContainer', {static: false}) menuContainer;
  @Input() menuStatus: boolean;

  constructor(private render: Renderer2, private menuService: MenuService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.menuContainer != undefined) {
      if (this.menuStatus) {
        this.render.removeClass(this.menuContainer.nativeElement, 'hide');
        this.render.addClass(this.menuContainer.nativeElement, 'show');
        this.menuService.setStatus(true);
      } else {
        this.render.addClass(this.menuContainer.nativeElement, 'hide');
        this.render.removeClass(this.menuContainer.nativeElement, 'show');
        this.menuService.setStatus(false);
      }
    }
  }

}
