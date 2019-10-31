import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons/faTimesCircle";

@Component({
  selector: 'multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss']
})
export class MultipleSelectComponent implements OnInit, AfterViewChecked {
  @Input() items = [];
  @Input() keyPropery = 'descricao';
  @Input() width = '200px';
  @Output() itemsSelected: EventEmitter<any> = new EventEmitter();
  @ViewChild('containerOptions', {static: false}) containerOptions;
  @ViewChild('containerSelectedItems', {static: false}) containerSelectedItems;
  @ViewChild('select', {static: false}) select;
  faTimesCircle = faTimesCircle;
  selected = '';
  selectedItems = [];
  show = false;

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
    this.selected = 'Selecione';
  }

  ngAfterViewChecked(): void {
    this.render.setStyle(this.select.nativeElement, 'width', this.width);
  }

  showSelect() {
    this.show = !this.show;
    if (this.containerOptions != undefined) {
      this.render.setStyle(this.containerOptions.nativeElement, 'width', this.width);
      this.render.setStyle(this.containerSelectedItems.nativeElement, 'width', `calc(${this.width} + 14px`);
    }
  }

  isSelected = (item) => this.selectedItems.find((value) => value == item) != undefined;

  removeSelectedOfDom(event) {
    let parent = this.render.parentNode(event.target);
    let childNode = event.target;
    while (parent.classList != 'container-selected-items' && childNode.classList != 'item') {
      parent = this.render.parentNode(parent);
      childNode = this.render.parentNode(childNode);
    }
    this.render.removeChild(parent, childNode);
    this.removeItem(childNode.childNodes[1].innerHTML);
  }

  getType = (item) => typeof item;

  findItem(key) {
    return this.items.find((obj) => {
      if (typeof obj == 'string') {
        return obj == key;
      }
      return obj[this.keyPropery] == key;
    })
  }

  emitItems = () => this.itemsSelected.emit(this.selectedItems);

  removeItem(item) {
    this.selectedItems = this.selectedItems.filter((obj) => {
      if (typeof obj == 'string') {
        return item != obj;
      }
      return item != obj[this.keyPropery]
    });
    this.emitItems();
  }

  setOption(event) {
    let item = this.findItem(event.target.innerHTML);
    if (event.target.className == 'option') {
      this.selectedItems.push(item);
      this.render.addClass(event.target, 'selected');
    } else if (event.target.className.includes('selected')) {
      if (typeof item == 'string') this.removeItem(item);
      else this.removeItem(item[this.keyPropery]);
      this.render.removeClass(event.target, 'selected');
    }
    this.emitItems();
  }
}
