import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'grupo-escala-jh-frat',
  templateUrl: './grupo-escala-jh-frat.component.html',
  styleUrls: ['./grupo-escala-jh-frat.component.scss']
})
export class GrupoEscalaJhFratComponent implements OnInit {

  @Input() ESCALA_JH_FRAT;
  constructor() { }

  ngOnInit() {
  }

}
