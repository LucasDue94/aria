import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'grupo-humpty-dumpty',
  templateUrl: './grupo-humpty-dumpty.component.html',
  styleUrls: ['./grupo-humpty-dumpty.component.scss']
})
export class GrupoHumptyDumptyComponent implements OnInit {

  @Input() ESCALA_HUMPTY_DUMPTY;

  constructor() { }

  ngOnInit() {
  }

}
