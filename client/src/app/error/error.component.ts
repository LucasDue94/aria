import {Component, Input, OnInit} from '@angular/core';
import {faSadTear} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() message;
  @Input() cod;
  messageDefault = 'Desculpe o transtorno, ocorreu um erro.';
  codDefault = '123';
  faSadTear = faSadTear;

  constructor() {
  }

  ngOnInit() {
    this.cod = history.state.cod;
    this.message = history.state.message;
  }
}
