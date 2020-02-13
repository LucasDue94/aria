import {Component, OnInit} from '@angular/core';
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-nas-form',
  templateUrl: './nas-form.component.html',
  styleUrls: ['./nas-form.component.scss']
})
export class NasFormComponent implements OnInit {
  registroAtendimento: RegistroAtendimento;

  constructor(private route: ActivatedRoute, private registroAtendimentoService: RegistroAtendimentoService) {

  }

  ngOnInit() {
    this.registroAtendimentoService.get(this.route.snapshot.params['id']).subscribe(registroAtendimento => {
        this.registroAtendimento = registroAtendimento;
      }
    )
  }

}
