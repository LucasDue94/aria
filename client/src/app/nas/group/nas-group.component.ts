import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'nas-group',
  templateUrl: './nas-group.component.html',
  styleUrls: ['./nas-group.component.scss']
})
export class NasGroupComponent implements OnInit {
  @Input() groupLabel;

  constructor() {
  }

  ngOnInit() {
  }

}
