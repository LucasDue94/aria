import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterViewChecked {
  @Input() items = [];
  @Input() keyPropery = '';
  @Input() width = '';
  @Input() labelName = '';
  @Input() labelPosition = 'top';
  /*valores: left ou top
  * O Default é top*/
  @Output() itemSelected: EventEmitter<any> = new EventEmitter();
  @ViewChild('containerOptions', {static: false}) containerOptions;
  @ViewChild('select', {static: false}) select;
  selected = 'Selecione';
  show = false;
  widthOptions = '';

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    if (this.containerOptions != undefined) {
      this.render.setStyle(this.containerOptions.nativeElement, 'right', '0');
      if (this.containerOptions.nativeElement.getBoundingClientRect().height +
        this.containerOptions.nativeElement.getBoundingClientRect().top > window.innerHeight - 50) {
        this.render.setStyle(this.containerOptions.nativeElement, 'top', `-${this.containerOptions.nativeElement.getBoundingClientRect().height}px`);
      } else {
        this.render.setStyle(this.containerOptions.nativeElement, 'top', '35px');
      }
    }
  }

  showSelect() {
    this.show = !this.show;
    this.widthOptions = `calc(${this.width} + 15px`;
  }

  getType = (item) => typeof item;

  setOption(item) {
    if (item.hasOwnProperty('empty')) {
      this.selected = 'selecione';
      this.itemSelected.emit('');
    } else {
      if (this.keyPropery == '') {
        this.itemSelected.emit(item);
        this.selected = item;
      } else {
        this.itemSelected.emit(item);
        this.selected = item[this.keyPropery];
      }
    }
    this.show = false;
  }
}
