import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
  faSadTear = faSadTear
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cod = params['cod'];
      this.message = params['message'];
    })
  }
}
