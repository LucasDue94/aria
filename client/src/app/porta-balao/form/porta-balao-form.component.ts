import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../core/title/title.service";
import {FormBuilder, Validators} from "@angular/forms";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";

@Component({
  selector: 'app-porta-balao-form',
  templateUrl: './porta-balao-form.component.html',
  styleUrls: ['./porta-balao-form.component.scss']
})
export class PortaBalaoFormComponent implements OnInit {

  registros: RegistroAtendimento[];
  form = this.fb.group({
    data: ['', Validators.required],
    hora: ['', Validators.required]
  });

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder,
    private registroAtendimentoService: RegistroAtendimentoService) {}

  ngOnInit() {
    this.titleService.send('Novo - Porta Balão');
    this.registroAtendimentoService.list(1,'','').subscribe(registros => {
      this.registros = registros;
    });
  }

}
