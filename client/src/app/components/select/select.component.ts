import {
  AfterViewChecked, AfterViewInit,
  Component, DoCheck,
  EventEmitter, HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2, SimpleChanges,
  ViewChild
} from '@angular/core';
import {SelectService} from "../../core/select/select.service";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterViewChecked, OnChanges,DoCheck {
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

  @HostListener('document:click', ['$event.target']) clickOut(target) {
    if (this.containerOptions != undefined && target != this.containerOptions.nativeElement && target != this.select.nativeElement) {
      this.show = false;
    }
  }

  ngAfterViewChecked(): void {
  }

  ngDoCheck(): void {
    if (this.containerOptions != undefined) {
      this.buildContainerOptions()
    }
  }

  buildContainerOptions() {
    const labelIsTop = this.labelPosition == 'top';
    if (this.containerOptions != undefined) {
      this.render.setStyle(this.containerOptions.nativeElement, 'right', '0');
      if (this.hasOverflow()) {
        const containerOptionsHeight = this.containerOptions.nativeElement.getBoundingClientRect().height;
        this.render.setStyle(this.containerOptions.nativeElement, 'top',
          labelIsTop ? `-${-containerOptionsHeight - 25}px` : `-${containerOptionsHeight}px`);

      } else {
        this.render.setStyle(this.containerOptions.nativeElement, 'top', labelIsTop ? '60px' : '35px')
      }
      this.render.setStyle(this.containerOptions.nativeElement, 'visibility', 'visible');
    }
  }

  hasOverflow = () => this.containerOptions.nativeElement.getBoundingClientRect().height +
    this.containerOptions.nativeElement.getBoundingClientRect().top > window.innerHeight;


  showSelect() {
    this.show = !this.show;
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
    this.show = false;
    this.selected = 'selecione';
    this.itemSelected.emit('');
  }
}
