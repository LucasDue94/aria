import {
  AfterViewChecked,
  Component, DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2, SimpleChanges,
  ViewChild
} from '@angular/core';
import {SelectService} from "../core/select/select.service";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterViewChecked, OnChanges {
  @Input() items = [];
  @Input() keyPropery = '';
  @Input() width = '';
  @Input() labelName = '';
  @Input() labelPosition = 'left';
  @Input() isInsideScroll = true;
  /*valores: left ou top
  * O Default é top*/
  @Output() itemSelected: EventEmitter<any> = new EventEmitter();
  @ViewChild('containerOptions', {static: false}) containerOptions;
  @ViewChild('select', {static: false}) select;
  @Input() reset;
  @Input() selected = 'Selecione';
  show = false;
  widthOptions = '';

  constructor(private render: Renderer2, private selectService: SelectService) {
  }

  ngOnInit() {
    if (window.innerWidth < 500) {
      this.labelPosition = 'top';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reset && changes.reset.currentValue) this.clear();
  }

  ngAfterViewChecked(): void {
    if (this.containerOptions != undefined) {
      this.render.setStyle(this.containerOptions.nativeElement, 'right', '0');
      const ultrapassou = this.containerOptions.nativeElement.getBoundingClientRect().height +
        this.containerOptions.nativeElement.getBoundingClientRect().top > window.innerHeight - 50;
      if (ultrapassou && !this.isInsideScroll) {
        if (this.labelPosition == 'top') {
          this.render.setStyle(this.containerOptions.nativeElement,
            'top', `-${this.containerOptions.nativeElement.getBoundingClientRect().height - 25}px`);
        } else {
          this.render.setStyle(this.containerOptions.nativeElement,
            'top', `-${this.containerOptions.nativeElement.getBoundingClientRect().height}px`);
        }
      } else {
        if (this.labelPosition == 'top') {
          this.render.setStyle(this.containerOptions.nativeElement, 'top', '60px');
        } else {
          this.render.setStyle(this.containerOptions.nativeElement, 'top', '35px');
        }
      }
    }
  }

  showSelect() {
    this.show = !this.show;
    if (this.show)
      this.selectService.emit(this);

    this.widthOptions = `calc(${this.width} + 15px`;
  }

  getType = (item) => typeof item;

  setOption(item) {
    if (item.hasOwnProperty('empty')) {
      this.clear();
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

  clear() {
    this.selectService.emit(null);
    this.show = false;
    this.selected = 'selecione';
    this.itemSelected.emit('');
  }
}
