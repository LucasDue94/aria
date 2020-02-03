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

@Component({
  selector: 'incidente-form',
  templateUrl: './incidente-form.component.html',
  styleUrls: ['./incidente-form.component.scss']
})
export class IncidenteFormComponent implements OnInit {
  form = this.fb.group({
    nome: ['', Validators.required],
  });
  incidente: Incidente;
  url = this.route.snapshot.url[0].path;

  constructor(private fb: FormBuilder, private titleService: TitleService,
              private render: Renderer2,
              private incidenteService: IncidenteService, private errorService: ErrorService,
              private alertService: AlertService, private route: ActivatedRoute,
              private router: Router, private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.url == 'create' ? this.titleService.send('Incidente - Novo Incidente') : this.titleService.send('Incidente - Editar Incidente');

    const id = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.incidenteService.get(id).subscribe(res => {
        if (res.hasOwnProperty('error')) {
          this.errorService.sendError(res)
        } else {
          this.incidente = res;
          this.form.get('nome').setValue(res.nome);
        }
      });
    }
    this.spinner.hide();
  }

  save() {
    let id = this.route.snapshot.params['id'];
    const incidente = new Incidente({
      id: id,
      nome: this.form.get('nome').value
    });

    this.incidenteService.save(incidente).subscribe((res) => {
      if (!res.hasOwnProperty('error')) {
        this.url == 'create' ?
          this.alertService.send(
            {message: 'Incidente Criado!', type: 'success', icon: faCheck}
          ) :  this.alertService.send(
          {message: 'Incidente Aterado!', type: 'success', icon: faCheck}
          ) ;

        setTimeout(() => {
          this.router.navigate(['/incidente']);
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
