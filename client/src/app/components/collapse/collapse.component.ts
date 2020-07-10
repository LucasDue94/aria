import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent implements OnInit {

  @Input() items;
  @Input() isVisible = false;
  @Input() prop;
  @Output() open = new EventEmitter();
  @Output() close = new EventEmitter();
  params = {id: null};
  faMin = faMinus;
  faPlus = faPlus;
  collapse = {collapseId: null, visible: false};

  constructor() {
  }

  ngOnInit() {

  }

  toggle(id?: number) {
    if (!this.collapse.visible) {
      this.collapse.collapseId = id;
      this.collapse.visible = true;
      this.open.emit(this.collapse);
    } else {
      this.collapse.collapseId = id;
      this.collapse.visible = false;
      this.close.emit({id: id, visible: false});
    }
  }

}
