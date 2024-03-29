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
import {DatePipe, Location} from "@angular/common";

@Component({
  selector: 'incidente-form',
  templateUrl: './incidente-form.component.html',
  styleUrls: ['./incidente-form.component.scss']
})
export class IncidenteFormComponent implements OnInit {

  incidente: Incidente = new Incidente();
  paciente: Paciente;
  tiposIncidente = [];
  url = this.route.snapshot.url[0].path;

  form = this.fb.group({
    data: ['', Validators.required],
    hora: ['', Validators.required],
    tipoIncidente: ['', Validators.required],
    obs: [''],
  });


  constructor(private fb: FormBuilder, private titleService: TitleService,
              private render: Renderer2,
              private incidenteService: IncidenteService, private errorService: ErrorService,
              private alertService: AlertService, private route: ActivatedRoute,
              private router: Router, private spinner: SpinnerService, private pacienteService: PacienteService,
              private tipoIncidenteService: TipoIncidenteService,
              private datePipe: DatePipe,
              private location: Location) {
  }

  ngOnInit() {
    this.setForm();
    const pacienteId = this.route.snapshot.queryParams['paciente'];
    if (pacienteId != undefined) {
      this.spinner.show();
      this.pacienteService.get(pacienteId).subscribe(res => {
        if (res.hasOwnProperty('error')) {
          this.errorService.sendError(res);
          this.location.back();
        } else {
          this.paciente = res;
          this.tipoIncidenteService.list().subscribe(res => {
            if (res.hasOwnProperty('error')) {
              this.errorService.sendError(res);
            } else {
              this.tiposIncidente = res;
              this.spinner.hide();
            }
          });
        }
      });
    } else {
      this.location.back();
    }
    if (this.url == 'create') {
      this.titleService.send('Incidente - Novo Incidente');
    } else {
      const incidenteId = this.route.snapshot.params['id'];
      if (incidenteId != undefined) {
        this.titleService.send('Incidente - Editar Incidente');
        this.spinner.show();
        this.incidenteService.get(incidenteId).subscribe(res => {
          if (res.hasOwnProperty('error')) {
            this.errorService.sendError(res)
          } else {
            this.incidente = res;
            this.setForm();
          }
          this.spinner.hide();
        });
      }
    }
  }

  setForm() {
    if (this.incidente.id == undefined) {
      const lastDateTime = new Date();
      this.f.data.setValue(this.datePipe.transform(lastDateTime, 'yyyy-MM-dd'));
      this.f.hora.setValue(this.datePipe.transform(lastDateTime, 'HH:mm'));
    } else {
      this.f.data.setValue(this.datePipe.transform(this.incidente.dataHora, 'yyyy-MM-dd'));
      this.f.hora.setValue(this.datePipe.transform(this.incidente.dataHora, 'HH:mm'));
      this.f.tipoIncidente.setValue(this.incidente.tipoIncidente.id);
      this.f.obs.setValue(this.incidente.obs);
    }
  }

  save() {
    let id = this.route.snapshot.params['id'];
    const incidente = new Object({
      id: id,
      dataHora: this.form.get('data').value + ' ' + this.form.get('hora').value,
      obs: this.form.get('obs').value,
      tipoIncidente: new Object({id: this.form.get('tipoIncidente').value}),
      pacienteId: this.paciente.id
    });

    this.incidenteService.save(incidente).subscribe((res) => {
      if (!res.hasOwnProperty('error')) {
        this.url == 'create' ?
          this.alertService.send(
            {message: 'Incidente criado.', type: 'success', icon: faCheck}
          ) : this.alertService.send(
          {message: 'Incidente alterado', type: 'success', icon: faCheck}
          );

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

  get f() {
    return this.form.controls;
  }
}
