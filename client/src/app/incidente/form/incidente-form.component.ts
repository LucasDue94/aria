import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TitleService} from "../../core/title/title.service";
import {IncidenteService} from "../../core/incidente/incidente.service";
import {Incidente} from "../../core/incidente/incidente";
import {ErrorService} from "../../core/error/error.service";
import {AlertService} from "../../core/alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {faCheck, faFrown} from "@fortawesome/free-solid-svg-icons";
import {Paciente} from "../../core/paciente/paciente";
import {PacienteService} from "../../core/paciente/paciente.service";
import {TipoIncidenteService} from "../../core/tipoIncidente/tipoIncidente.service";
import {TipoIncidente} from "../../core/tipoIncidente/tipoIncidente";

@Component({
  selector: 'incidente-form',
  templateUrl: './incidente-form.component.html',
  styleUrls: ['./incidente-form.component.scss']
})
export class IncidenteFormComponent implements OnInit {
  form = this.fb.group({
    data: ['', Validators.required],
    hora: ['', Validators.required],
    tipoIncidente: ['', Validators.required],
    obs: [''],
  });

  private incidente: Incidente;
  private paciente: Paciente;
  private tiposIncidente = [];
  url = this.route.snapshot.url[0].path;

  constructor(private fb: FormBuilder, private titleService: TitleService,
              private render: Renderer2,
              private incidenteService: IncidenteService, private errorService: ErrorService,
              private alertService: AlertService, private route: ActivatedRoute,
              private router: Router, private spinner: SpinnerService, private pacienteService: PacienteService,
              private tipoIncidenteService: TipoIncidenteService) {
  }

  ngOnInit() {
    this.url == 'create' ? this.titleService.send('Incidente - Novo Incidente') : this.titleService.send('Incidente - Editar Incidente');

    const pacienteId = this.route.snapshot.queryParams['paciente'];
    if (pacienteId != undefined) {
      this.spinner.show();
      this.pacienteService.get(pacienteId).subscribe(res => {
        if (res.hasOwnProperty('error')) {
          this.errorService.sendError(res)
        } else {
          this.paciente = res;
        }
        this.spinner.hide();
      });
    }

    this.tipoIncidenteService.list().subscribe(res => {
      if (res.hasOwnProperty('error')) {
        this.errorService.sendError(res)
      } else {
        this.tiposIncidente = res;
      }
    });

    const id = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.spinner.show();
      this.incidenteService.get(id).subscribe(res => {
        if (res.hasOwnProperty('error')) {
          this.errorService.sendError(res)
        } else {
          this.incidente = res;
        }
        this.spinner.hide();
      });
    }
  }

  save() {
    let id = this.route.snapshot.params['id'];
    const incidente = new Object({
      id: id,
      dataHora: this.form.get('data').value + ' ' + this.form.get('hora').value,
      obs: this.form.get('obs').value,
      tipoIncidente: new Object({id: this.form.get('tipoIncidente').value}),
      paciente: new Object({id: this.paciente.id})
    });

    this.incidenteService.save(incidente).subscribe((res) => {
      if (!res.hasOwnProperty('error')) {
        this.url == 'create' ?
          this.alertService.send(
            {message: 'Incidente criado.', type: 'success', icon: faCheck}
          ) :  this.alertService.send(
          {message: 'Incidente alterado', type: 'success', icon: faCheck}
          ) ;

        setTimeout(() => {
          this.router.navigate(['/incidente/paciente-details', this.paciente.id]);
        }, 300);
      } else {
        this.alertService.send({
          message: res.error.error.message,
          type: 'error',
          icon: faFrown
        });
      }
    });
  }

  get f() { return this.form.controls; }
}
