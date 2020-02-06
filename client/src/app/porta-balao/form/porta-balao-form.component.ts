import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {FormBuilder, Validators} from "@angular/forms";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-porta-balao-form',
  templateUrl: './porta-balao-form.component.html',
  styleUrls: ['./porta-balao-form.component.scss']
})
export class PortaBalaoFormComponent implements OnInit {

  registro: RegistroAtendimento;
  registroId;
  form = this.fb.group({
    data: ['', Validators.required],
    hora: ['', Validators.required]
  });

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder, private route: ActivatedRoute,
    private registroAtendimentoService: RegistroAtendimentoService) {}

  ngOnInit() {
    this.titleService.send('Novo - Porta Balão');
    this.registroId = this.route.snapshot.params.id;
    this.registroAtendimentoService.get(this.registroId).subscribe(registro => {
      this.registro = registro;
    });
  }

}
