import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'grupo-bradenq',
  templateUrl: './grupo-bradenq.component.html',
  styleUrls: ['./grupo-bradenq.component.scss']
})
export class GrupoBradenqComponent implements OnInit {

  @Input() BRADENQ
  constructor() { }

  ngOnInit() {
  }

}
