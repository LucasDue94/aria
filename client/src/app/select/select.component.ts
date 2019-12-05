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
  selected = 'Selecione';
  show = false;
  widthOptions = '';

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
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
