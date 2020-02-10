import {Component, OnInit} from '@angular/core';
import {Paciente} from "../../core/paciente/paciente";
import {PacienteService} from "../../core/paciente/paciente.service";
import {ActivatedRoute} from "@angular/router";
import {TitleService} from "../../core/title/title.service";
import {faSmile, faPlus} from '@fortawesome/free-solid-svg-icons';
import {SpinnerService} from "../../core/spinner/spinner.service";

@Component({
  selector: 'app-paciente-details',
  templateUrl: './paciente-details.component.html',
  styleUrls: ['./paciente-details.component.scss']
})
export class PacienteDetailsComponent implements OnInit {

  private paciente: Paciente = new Paciente();
  private faSmile = faSmile;
  private faPlus = faPlus;

  constructor(private pacienteService: PacienteService,
              private route: ActivatedRoute,
              private title: TitleService,
              private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.title.send('Incidente - Detalhes de Paciente');
    this.pacienteService.get(this.route.snapshot.paramMap.get('id')).subscribe( paciente => {
      this.paciente = paciente;
      this.spinnerService.hide();
    });
  }
}
