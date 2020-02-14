import {Component, OnInit} from '@angular/core';
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {ActivatedRoute} from "@angular/router";
import {Alternative} from "../../core/nas/form/alternative";
import {Question} from "../../core/nas/form/question";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'nas-form',
  templateUrl: './nas-form.component.html',
  styleUrls: ['./nas-form.component.scss']
})
export class NasFormComponent implements OnInit {
  registroAtendimento: RegistroAtendimento;
  question1 = new Question({
    number: '1',
    title: '',
    alternatives: [
      new Alternative({
        option: 'a',
        value: '1a',
        description: 'Sinais vitais horários, calculo e registro regular do balanço hídrico.'
      }), new Alternative({
        questionNumber: '1',
        option: 'b',
        value: '1b',
        description: 'Presença à beira do leito e observação ou atividade contínua por duas horas' +
          'ou mais em algum plantão por razões de segurança, gravidade ou terapia, tais como: ventilação mecânica' +
          ' não invasiva, desmame, agitação, confusão mental, posição prona, procedimentos de doação de órgão, preparo' +
          ' e administração de fluidos ou medicação, auxílio em procedimentos específicos'
      }), new Alternative({
        questionNumber: '1',
        option: 'c',
        value: '1c',
        description: ' Presença à beira do leito e observação ou atividade contínua por 4 horas ou mais em algum plantão' +
          ' por razões de segurança, gravidade ou terapia, tais como os exemplos acima.'
      })
    ]
  });

  question2 = new Question({
    number:'2',
    title:'Investigações Laboratoriais: Bioquímicas e microbiológicas'
  });
  question3 = new Question({
    number:'3',
    title:'Medicação, exceto droga vasoativa'
  });

  answers={
    question1:'',
    question2:'',
    question3:'',
    question4:'',
  };

  constructor(private route: ActivatedRoute, private registroAtendimentoService: RegistroAtendimentoService,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.registroAtendimentoService.get(this.route.snapshot.params['id']).subscribe(registroAtendimento => {
        this.registroAtendimento = registroAtendimento;
      }
    )
  }

  save() {
    console.log(this.answers);
  }
}
