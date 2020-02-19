import {Component, Input, OnInit} from '@angular/core';
import {Alternative} from "../../core/nas/form/alternative";
import {Question} from "../../core/nas/form/question";

@Component({
  selector: 'nas-question',
  templateUrl: './nas-question.component.html',
  styleUrls: ['./nas-question.component.scss']
})
export class NasQuestionComponent implements OnInit {
  @Input() answer;
  @Input() isBoolQuestion = false;
  @Input() question: Question;
  boolQuestion = [new Alternative({
    option: 'Sim',
    value: 'true'
  }), new Alternative({
    option: 'Não',
    value: 'false'
  })];

  constructor() {
  }

  ngOnInit() {
    // console.log(this.question);
  }

}
